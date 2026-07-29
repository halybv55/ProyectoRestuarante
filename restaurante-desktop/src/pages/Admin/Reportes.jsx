import { MdAssessment } from "react-icons/md";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";

function Reportes() {
    return (
        <div className="rs-admin-page">
            <PageHeader
                title="Reportes"
                description="Consulta las opciones disponibles para el área administrativa."
            />

            <Card className="rs-admin-empty-card">
                <EmptyState
                    icon={<MdAssessment />}
                    title="Interfaz de reportes no disponible"
                    message="Esta pantalla todavía no contiene filtros, datos ni acciones implementadas."
                />
            </Card>
        </div>
    );
}

export default Reportes;
