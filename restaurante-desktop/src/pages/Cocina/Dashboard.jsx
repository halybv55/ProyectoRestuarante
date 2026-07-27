import { MdPerson } from "react-icons/md";
import Card from "../../components/Card";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthContext";
import CocinaLayout from "../../layouts/CocinaLayout";

function Dashboard(){
    const { usuario } = useAuth();

    return(
        <CocinaLayout>
            <div className="rs-kitchen-page">
                <PageHeader
                    title="Cocina"
                    description="Monitor operativo de preparación de pedidos."
                    breadcrumb="Cocina / Inicio"
                />
                <Card
                    title="Sesión activa"
                    subtitle="Identidad del operador actual"
                >
                    <div className="rs-kitchen-account">
                        <span
                            className="rs-kitchen-account__icon"
                            aria-hidden="true"
                        >
                            <MdPerson />
                        </span>
                        <div className="rs-kitchen-account__copy">
                            <strong>{usuario?.username}</strong>
                            <span>{usuario?.rol}</span>
                        </div>
                    </div>
                </Card>
            </div>
        </CocinaLayout>
    );
}

export default Dashboard;
