import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Admin/Dashboard";
import Categorias from "../pages/Admin/Categorias";
import Platos from "../pages/Admin/Platos";
import Bebidas from "../pages/Admin/Bebidas";
import Combos from "../pages/Admin/Combos";
import Reportes from "../pages/Admin/Reportes";
import Mesas from "../pages/Admin/Mesas";

import CajaDashboard from "../pages/Caja/Dashboard";
import MenuDia from "../pages/Caja/MenuDia";
import Pedido from "../pages/Caja/Pedido";
import CombosCaja from "../pages/Caja/Combos";

import Cocina from "../pages/Cocina/Cocina";

import Mesero from "../pages/Mesero/Mesero";

function AppRouter() {
    return (
        <HashRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login/:rol" element={<Login />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="categorias" element={<Categorias />} />
                    <Route path="platos" element={<Platos />} />
                    <Route path="bebidas" element={<Bebidas />} />
                    <Route path="combos" element={<Combos />} />
                    <Route path="reportes" element={<Reportes />} />
                    <Route path="mesas" element={<Mesas />} />
                </Route>

                {/* Caja */}
                <Route path="/caja" element={<CajaDashboard />} />
                <Route path="/caja/menu" element={<MenuDia />} />
                <Route path="/caja/pedido" element={<Pedido />} />

                {/* Cocina */}
                <Route path="/cocina" element={<Cocina />} />

                {/* Mesero */}
                <Route path="/mesero" element={<Mesero />} />
<Route path="/caja/combos" element={<CombosCaja />} />

            </Routes>
        </HashRouter>
    );
}

export default AppRouter;
