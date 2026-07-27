import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useAuth } from "../../context/AuthContext";
function Dashboard() {
    const { usuario } = useAuth();
    return (
        <div>
            <h1>Caja</h1>
            <p>Bienvenido: <strong>{usuario?.username}</strong></p>
            <p>Rol: {usuario?.rol}</p>
            <hr />
            <h2>Opciones</h2>
            <Link to="/caja/menu">
                <button>📋 Menú del Día</button>
            </Link>
            <br />
            <br />
            <Link to="/caja/pedido">
                <button>🛒 Nuevo Pedido</button>
            </Link>
            <br />
            <br />
            <Link to="/caja/combos">
    <button> Combos</button>
</Link>

<br />
<br />
            <LogoutButton />
        </div>
    );
}
export default Dashboard;