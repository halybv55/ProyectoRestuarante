import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    MdAdminPanelSettings,
    MdAssessment,
    MdCategory,
    MdChevronRight,
    MdDashboard,
    MdLocalDrink,
    MdMenu,
    MdRestaurantMenu,
    MdTableRestaurant,
    MdViewModule,
} from "react-icons/md";
import Button from "../components/Button";
import LogoutButton from "../components/LogoutButton";
import Sidebar from "../components/Sidebar";
import "../styles/admin.css";

const adminNavigation = [
    { to: "/admin", label: "Dashboard", icon: MdDashboard, end: true },
    { to: "/admin/categorias", label: "Categorías", icon: MdCategory },
    { to: "/admin/platos", label: "Platos", icon: MdRestaurantMenu },
    { to: "/admin/bebidas", label: "Bebidas", icon: MdLocalDrink },
    { to: "/admin/combos", label: "Combos", icon: MdViewModule },
    { to: "/admin/mesas", label: "Mesas", icon: MdTableRestaurant },
    { to: "/admin/reportes", label: "Reportes", icon: MdAssessment },
];

function AdminLayout() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isCompact, setIsCompact] = useState(() =>
        typeof window === "undefined"
            ? false
            : window.matchMedia("(max-width: 63.999rem)").matches,
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 63.999rem)");
        const handleChange = (event) => {
            setIsCompact(event.matches);
            if (!event.matches) setDrawerOpen(false);
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    const closeNavigation = () => {
        if (isCompact) setDrawerOpen(false);
    };

    const navigation = (
        <>
            {adminNavigation.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                        `rs-admin-nav__link${isActive ? " rs-admin-nav__link--active" : ""}`
                    }
                    onClick={closeNavigation}
                >
                    <Icon className="rs-admin-nav__icon" aria-hidden="true" />
                    <span>{label}</span>
                    <MdChevronRight
                        className="rs-admin-nav__chevron"
                        aria-hidden="true"
                    />
                </NavLink>
            ))}
        </>
    );

    return (
        <div className="rs-admin-shell">
            <Sidebar
                className="rs-admin-sidebar"
                mobile={isCompact}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                aria-label="Navegación administrativa"
                header={
                    <div className="rs-admin-brand">
                        <span className="rs-admin-brand__mark" aria-hidden="true">
                            <MdAdminPanelSettings />
                        </span>
                        <span className="rs-admin-brand__copy">
                            <strong>Restaurante ERP</strong>
                            <small>Administración</small>
                        </span>
                    </div>
                }
                footer={<LogoutButton fullWidth />}
            >
                {navigation}
            </Sidebar>

            <div className="rs-admin-workspace">
                <header className="rs-admin-topbar">
                    <Button
                        variant="ghost"
                        icon={<MdMenu />}
                        className="rs-admin-topbar__menu"
                        aria-label="Abrir navegación"
                        onClick={() => setDrawerOpen(true)}
                    />
                    <div className="rs-admin-topbar__title">
                        <span>Área de trabajo</span>
                        <strong>Administración</strong>
                    </div>
                </header>

                <main className="rs-admin-content">
                    <div className="rs-admin-content__inner">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
