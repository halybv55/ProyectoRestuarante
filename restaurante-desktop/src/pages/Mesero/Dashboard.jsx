import { MdPerson } from "react-icons/md";
import Card from "../../components/Card";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthContext";
import MeseroLayout from "../../layouts/MeseroLayout";

function Dashboard(){
    const { usuario } = useAuth();

    return(
        <MeseroLayout>
            <div className="rs-waiter-page">
                <PageHeader
                    title="Mesero"
                    description="Operación móvil de entrega de pedidos."
                    breadcrumb="Mesero / Inicio"
                />
                <Card
                    title="Sesión activa"
                    subtitle="Identidad del operador actual"
                >
                    <div className="rs-waiter-account">
                        <span
                            className="rs-waiter-account__icon"
                            aria-hidden="true"
                        >
                            <MdPerson />
                        </span>
                        <div className="rs-waiter-account__copy">
                            <strong>{usuario?.username}</strong>
                            <span>{usuario?.rol}</span>
                        </div>
                    </div>
                </Card>
            </div>
        </MeseroLayout>
    );
}

export default Dashboard;
