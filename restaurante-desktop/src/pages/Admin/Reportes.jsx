import { useCallback, useEffect, useMemo, useState } from "react";
import {
    MdAssessment,
    MdDownload,
    MdPictureAsPdf,
    MdRefresh,
    MdShowChart,
    MdShoppingCart,
} from "react-icons/md";
import api from "../../api/axios";
import AdminMetricGrid from "../../components/admin/AdminMetricGrid";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Input from "../../components/Input";
import LoadingState from "../../components/LoadingState";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import Table from "../../components/Table";
import { downloadReportPdf } from "../../utils/pdfReport";

const REPORTS = {
    dailySales: {
        label: "Ventas diarias",
        description: "Cantidad de ventas e ingresos agrupados por fecha.",
        endpoint: "/reportes/ventas-diarias",
        excelEndpoint: "/reportes/ventas-diarias/excel",
        filename: "ventas_diarias",
        columns: [
            { label: "Fecha", key: "fecha", type: "date" },
            { label: "Ventas", key: "cantidad_ventas", type: "number" },
            { label: "Total", key: "total", type: "currency" },
        ],
    },
    weeklySales: {
        label: "Ventas semanales",
        description: "Operaciones e ingresos consolidados por semana.",
        endpoint: "/reportes/ventas-semanales",
        excelEndpoint: "/reportes/ventas-semanales/excel",
        filename: "ventas_semanales",
        columns: [
            { label: "Semana", key: "semana", type: "date" },
            { label: "Ventas", key: "ventas", type: "number" },
            { label: "Total", key: "total", type: "currency" },
        ],
    },
    weeklyProfit: {
        label: "Ganancia semanal",
        description: "Diferencia semanal entre ventas y compras registradas.",
        endpoint: "/reportes/ganancia-semanal",
        excelEndpoint: "/reportes/ganancia-semanal/excel",
        filename: "ganancia_semanal",
        columns: [
            { label: "Semana", key: "semana", type: "date" },
            { label: "Ganancia", key: "ganancia", type: "currency" },
        ],
    },
    topDishes: {
        label: "Platos más vendidos",
        description: "Clasificación de platos según las unidades vendidas.",
        endpoint: "/reportes/platos-mas-vendidos",
        excelEndpoint: "/reportes/platos-mas-vendidos/excel",
        filename: "platos_mas_vendidos",
        columns: [
            { label: "Plato", key: "nombre", type: "text" },
            { label: "Unidades vendidas", key: "vendidos", type: "number" },
        ],
    },
    weeklyPurchases: {
        label: "Compras semanales",
        description: "Importe de compras registrado por semana.",
        endpoint: "/reportes/compras-semanales",
        excelEndpoint: "/reportes/compras-semanales/excel",
        filename: "compras_semanales",
        columns: [
            { label: "Semana", key: "semana", type: "date" },
            { label: "Total", key: "total", type: "currency" },
        ],
    },
};

const currencyFormatter = new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "BOB",
    minimumFractionDigits: 2,
});
const numberFormatter = new Intl.NumberFormat("es-BO");
const dateFormatter = new Intl.DateTimeFormat("es-BO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
});

function getDateKey(value) {
    if (!value) return "";

    return String(value).slice(0, 10);
}

function formatValue(value, type) {
    if (type === "currency") {
        return currencyFormatter.format(Number(value) || 0);
    }

    if (type === "number") {
        return numberFormatter.format(Number(value) || 0);
    }

    if (type === "date") {
        const dateKey = getDateKey(value);

        return dateKey
            ? dateFormatter.format(new Date(`${dateKey}T00:00:00Z`))
            : "Sin fecha";
    }

    return String(value ?? "—");
}

function sumBy(rows, key) {
    return rows.reduce((sum, item) => sum + (Number(item?.[key]) || 0), 0);
}

function getSummary(reportKey, rows) {
    if (reportKey === "dailySales") {
        return [
            { label: "Ingresos", value: currencyFormatter.format(sumBy(rows, "total")), meta: "Total del periodo" },
            { label: "Ventas", value: numberFormatter.format(sumBy(rows, "cantidad_ventas")), meta: "Operaciones registradas" },
            { label: "Días", value: numberFormatter.format(rows.length), meta: "Fechas con movimiento" },
        ];
    }

    if (reportKey === "weeklySales") {
        return [
            { label: "Ingresos", value: currencyFormatter.format(sumBy(rows, "total")), meta: "Total acumulado" },
            { label: "Ventas", value: numberFormatter.format(sumBy(rows, "ventas")), meta: "Operaciones registradas" },
            { label: "Semanas", value: numberFormatter.format(rows.length), meta: "Periodos disponibles" },
        ];
    }

    if (reportKey === "weeklyProfit") {
        return [
            { label: "Ganancia", value: currencyFormatter.format(sumBy(rows, "ganancia")), meta: "Resultado acumulado" },
            { label: "Semanas", value: numberFormatter.format(rows.length), meta: "Periodos calculados" },
            { label: "Promedio", value: currencyFormatter.format(rows.length ? sumBy(rows, "ganancia") / rows.length : 0), meta: "Ganancia semanal" },
        ];
    }

    if (reportKey === "topDishes") {
        return [
            { label: "Unidades", value: numberFormatter.format(sumBy(rows, "vendidos")), meta: "Platos vendidos" },
            { label: "Productos", value: numberFormatter.format(rows.length), meta: "Platos con ventas" },
            { label: "Más vendido", value: rows[0]?.nombre ?? "Sin datos", meta: rows[0] ? `${formatValue(rows[0].vendidos, "number")} unidades` : "Sin movimiento" },
        ];
    }

    return [
        { label: "Compras", value: currencyFormatter.format(sumBy(rows, "total")), meta: "Total acumulado" },
        { label: "Semanas", value: numberFormatter.format(rows.length), meta: "Periodos disponibles" },
        { label: "Promedio", value: currencyFormatter.format(rows.length ? sumBy(rows, "total") / rows.length : 0), meta: "Compra semanal" },
    ];
}

function Reportes() {
    const [reportKey, setReportKey] = useState("dailySales");
    const [rows, setRows] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [downloadingExcel, setDownloadingExcel] = useState(false);
    const report = REPORTS[reportKey];

    const loadReport = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get(REPORTS[reportKey].endpoint);
            const data = Array.isArray(response.data?.data)
                ? response.data.data
                : [];

            setRows(data);
        } catch (requestError) {
            console.error(requestError);
            setRows([]);
            setError(
                requestError.response?.data?.message ||
                    "No fue posible consultar el reporte.",
            );
        } finally {
            setLoading(false);
        }
    }, [reportKey]);

    useEffect(() => {
        // La consulta inicial sincroniza la vista con el reporte seleccionado.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadReport();
    }, [loadReport]);

    const visibleRows = useMemo(() => {
        if (reportKey !== "dailySales" || !selectedDate) return rows;

        return rows.filter((item) => getDateKey(item.fecha) === selectedDate);
    }, [reportKey, rows, selectedDate]);
    const summary = useMemo(
        () => getSummary(reportKey, visibleRows),
        [reportKey, visibleRows],
    );

    const changeReport = (nextReport) => {
        setReportKey(nextReport);
        setSelectedDate("");
    };

    const downloadPdf = () => {
        const generatedAt = new Intl.DateTimeFormat("es-BO", {
            dateStyle: "long",
            timeStyle: "short",
        }).format(new Date());
        const period =
            reportKey === "dailySales" && selectedDate
                ? `Fecha seleccionada: ${formatValue(selectedDate, "date")}`
                : "Todos los periodos disponibles";

        downloadReportPdf({
            filename: `${report.filename}.pdf`,
            title: report.label,
            subtitle: `${period} | Generado: ${generatedAt}`,
            headers: report.columns.map((column) => column.label),
            rows: visibleRows.map((item) =>
                report.columns.map((column) =>
                    formatValue(item[column.key], column.type),
                ),
            ),
            summary,
        });
    };

    const downloadExcel = async () => {
        setDownloadingExcel(true);
        setError("");

        try {
            const response = await api.get(report.excelEndpoint, {
                responseType: "blob",
            });
            const url = URL.createObjectURL(response.data);
            const link = document.createElement("a");

            link.href = url;
            link.download = `${report.filename}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (requestError) {
            console.error(requestError);
            setError("No fue posible descargar el archivo Excel.");
        } finally {
            setDownloadingExcel(false);
        }
    };

    return (
        <div className="rs-admin-page rs-report-page">
            <PageHeader
                title="Reportes"
                description="Consulta los resultados operativos y descarga la información disponible."
                actions={
                    <div className="rs-report-actions">
                        <Button
                            type="button"
                            variant="secondary"
                            icon={<MdRefresh />}
                            onClick={loadReport}
                            disabled={loading}
                        >
                            Actualizar
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            icon={<MdDownload />}
                            onClick={downloadExcel}
                            loading={downloadingExcel}
                            disabled={visibleRows.length === 0}
                        >
                            Excel
                        </Button>
                        <Button
                            type="button"
                            icon={<MdPictureAsPdf />}
                            onClick={downloadPdf}
                            disabled={visibleRows.length === 0}
                        >
                            Descargar PDF
                        </Button>
                    </div>
                }
            />

            <nav className="rs-report-tabs" aria-label="Tipos de reporte">
                {Object.entries(REPORTS).map(([key, option]) => (
                    <button
                        key={key}
                        type="button"
                        className={`rs-report-tab${reportKey === key ? " is-active" : ""}`}
                        aria-current={reportKey === key ? "page" : undefined}
                        onClick={() => changeReport(key)}
                    >
                        {option.label}
                    </button>
                ))}
            </nav>

            {error && (
                <Alert variant="danger" title="Reporte no disponible">
                    {error}
                </Alert>
            )}

            <AdminMetricGrid aria-label={`Resumen de ${report.label}`}>
                {summary.map((item, index) => (
                    <StatCard
                        key={item.label}
                        label={item.label}
                        value={item.value}
                        meta={item.meta}
                        icon={
                            index === 0
                                ? <MdShowChart />
                                : index === 1
                                    ? <MdShoppingCart />
                                    : <MdAssessment />
                        }
                    />
                ))}
            </AdminMetricGrid>

            <Card title={report.label} subtitle={report.description}>
                {reportKey === "dailySales" && (
                    <div className="rs-report-filters">
                        <Input
                            id="report-date"
                            type="date"
                            label="Filtrar por fecha"
                            helperText="Deja el campo vacío para mostrar todos los días."
                            value={selectedDate}
                            onChange={(event) => setSelectedDate(event.target.value)}
                        />
                        {selectedDate && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setSelectedDate("")}
                            >
                                Mostrar todas
                            </Button>
                        )}
                    </div>
                )}

                {loading ? (
                    <LoadingState message="Consultando reporte..." />
                ) : visibleRows.length === 0 ? (
                    <EmptyState
                        icon={<MdAssessment />}
                        title="Sin información para mostrar"
                        message="No existen registros para el reporte o periodo seleccionado."
                    />
                ) : (
                    <Table className="rs-report-table">
                        <thead>
                            <tr>
                                {report.columns.map((column) => (
                                    <th key={column.key} scope="col">
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {visibleRows.map((item, index) => (
                                <tr key={`${reportKey}-${item.fecha ?? item.semana ?? item.nombre ?? index}`}>
                                    {report.columns.map((column) => (
                                        <td
                                            key={column.key}
                                            data-label={column.label}
                                            className={
                                                column.type === "currency" ||
                                                column.type === "number"
                                                    ? "rs-report-table__number"
                                                    : undefined
                                            }
                                        >
                                            {formatValue(
                                                item[column.key],
                                                column.type,
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card>
        </div>
    );
}

export default Reportes;
