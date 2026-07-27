import { MdInfoOutline, MdPerson } from "react-icons/md";
import Badge from "../../components/Badge";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import LogoutButton from "../../components/LogoutButton";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const { usuario } = useAuth();

    return (
        <div className="rs-admin-page">
            <PageHeader
                title="Administrador"
                description="Panel principal del área administrativa."
            />

            <div className="rs-admin-dashboard">
                <Card
                    title="Sesión actual"
                    subtitle="Cuenta activa en el sistema."
                >
                    <div className="rs-admin-account">
                        <span className="rs-admin-account__icon" aria-hidden="true">
                            <MdPerson />
                        </span>
                        <div className="rs-admin-account__details">
                            <strong>{usuario?.username}</strong>
                            <Badge variant="info">{usuario?.rol}</Badge>
                        </div>
                    </div>
                    <div className="rs-admin-form__actions">
                        <LogoutButton variant="secondary" />
                    </div>
                </Card>

                <Card
                    title="Resumen administrativo"
                    subtitle="Información disponible en el módulo actual."
                    className="rs-admin-empty-card"
                >
                    <EmptyState
                        icon={<MdInfoOutline />}
                        title="Sin indicadores disponibles"
                        message="Este panel no cuenta actualmente con métricas administrativas."
                    />
                </Card>
            </div>
        </div>
    );
}

export default Dashboard;
