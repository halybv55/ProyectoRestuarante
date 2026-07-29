import { MdReceiptLong } from "react-icons/md";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import CajaLayout from "../../layouts/CajaLayout";

function Ventas() {
    return (
        <CajaLayout>
            <div className="rs-caja-page">
                <PageHeader
                    title="Ventas"
                    description="Consulta y gestión de las ventas registradas."
                    breadcrumb="Operación / Ventas"
                />
                <Card className="rs-caja-empty-card">
                    <EmptyState
                        icon={<MdReceiptLong />}
                        title="Interfaz de ventas no implementada"
                        message="Esta pantalla todavía no contiene registros, filtros ni acciones disponibles."
                    />
                </Card>
            </div>
        </CajaLayout>
    );
}

export default Ventas;
