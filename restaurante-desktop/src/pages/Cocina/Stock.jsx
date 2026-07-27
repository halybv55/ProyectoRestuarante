import { MdInventory2 } from "react-icons/md";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import CocinaLayout from "../../layouts/CocinaLayout";

function Stock() {
    return (
        <CocinaLayout>
            <div className="rs-kitchen-page">
                <PageHeader
                    title="Stock"
                    description="Consulta operativa de existencias de Cocina."
                    breadcrumb="Cocina / Stock"
                />
                <Card className="rs-kitchen-empty-card">
                    <EmptyState
                        icon={<MdInventory2 />}
                        title="Interfaz de stock no implementada"
                        message="Esta pantalla todavía no contiene existencias, movimientos ni acciones disponibles."
                    />
                </Card>
            </div>
        </CocinaLayout>
    );
}

export default Stock;
