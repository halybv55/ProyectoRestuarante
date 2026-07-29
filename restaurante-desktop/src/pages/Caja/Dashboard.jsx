import { Link } from "react-router-dom";
import {
    MdPerson,
    MdPointOfSale,
    MdRestaurantMenu,
    MdViewModule
} from "react-icons/md";
import Card from "../../components/Card";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthContext";
import CajaLayout from "../../layouts/CajaLayout";

function Dashboard() {
    const { usuario } = useAuth();

    return (
        <CajaLayout>
            <div className="rs-caja-page">
                <PageHeader
                    title="Caja"
                    description="Acceso rápido a la operación diaria de pedidos y menú."
                    breadcrumb="Operación / Inicio"
                />

                <div className="rs-caja-dashboard">
                    <Card
                        title="Sesión activa"
                        subtitle="Identidad del operador actual"
                    >
                        <div className="rs-caja-account">
                            <span
                                className="rs-caja-account__icon"
                                aria-hidden="true"
                            >
                                <MdPerson />
                            </span>
                            <div className="rs-caja-account__copy">
                                <strong>{usuario?.username}</strong>
                                <span>{usuario?.rol}</span>
                            </div>
                        </div>
                    </Card>

                    <Card
                        title="Operaciones"
                        subtitle="Selecciona una tarea para continuar"
                    >
                        <nav
                            className="rs-caja-dashboard__actions"
                            aria-label="Operaciones de Caja"
                        >
                            <Link
                                to="/caja/menu"
                                className="rs-caja-action-link"
                            >
                                <MdRestaurantMenu aria-hidden="true" />
                                <span>Menú del día</span>
                            </Link>
                            <Link
                                to="/caja/pedido"
                                className="rs-caja-action-link"
                            >
                                <MdPointOfSale aria-hidden="true" />
                                <span>Nuevo pedido</span>
                            </Link>
                            <Link
                                to="/caja/combos"
                                className="rs-caja-action-link"
                            >
                                <MdViewModule aria-hidden="true" />
                                <span>Combos</span>
                            </Link>
                        </nav>
                    </Card>
                </div>
            </div>
        </CajaLayout>
    );
}

export default Dashboard;
