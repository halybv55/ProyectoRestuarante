import { Link, Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function AdminLayout() {
    return (
        <div>
            <h1>Administrador</h1>
            <hr />
            <Link to="/admin">Dashboard</Link>
            <br />
            <Link to="/admin/categorias">
                Categorías
            </Link>
            <br />
            <Link to="/admin/platos">
                Platos
            </Link>
            <br />
            <Link to="/admin/bebidas">
                Bebidas
            </Link>
            <br />
            <Link to="/admin/combos">
                Combos
            </Link>
            <Link to="/admin/mesas">
                Mesas
            </Link>
            <br />
            
            <br />
            <Link to="/admin/reportes">
                Reportes
            </Link>
            <br />
            <br />
            <LogoutButton />
            <hr />
            <Outlet />
        </div>
    );
}
export default AdminLayout;