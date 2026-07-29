import { MdPointOfSale } from "react-icons/md";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";

function Ventas() {
    return (
        <div className="rs-admin-page">
            <PageHeader
                title="Ventas"
                description="Área administrativa de ventas."
            />

            <Card className="rs-admin-empty-card">
                <EmptyState
                    icon={<MdPointOfSale />}
                    title="Interfaz de ventas no disponible"
                    message="Esta pantalla todavía no contiene datos ni acciones implementadas."
                />
            </Card>
        </div>
    );
}

export default Ventas;
