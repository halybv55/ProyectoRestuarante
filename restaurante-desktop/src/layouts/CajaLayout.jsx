import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    MdChevronRight,
    MdDashboard,
    MdMenu,
    MdPointOfSale,
    MdRestaurantMenu,
    MdViewModule
} from "react-icons/md";
import Button from "../components/Button";
import LogoutButton from "../components/LogoutButton";
import Sidebar from "../components/Sidebar";
import "../styles/caja.css";

const cajaNavigation = [
    {
        to: "/caja",
        label: "Inicio",
        icon: MdDashboard,
        end: true
    },
    {
        to: "/caja/menu",
        label: "Menú del día",
        icon: MdRestaurantMenu
    },
    {
        to: "/caja/pedido",
        label: "Nuevo pedido",
        icon: MdPointOfSale
    },
    {
        to: "/caja/combos",
        label: "Combos",
        icon: MdViewModule
    }
];

function CajaLayout({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isCompact, setIsCompact] = useState(() => (
        typeof window !== "undefined"
            ? window.matchMedia("(max-width: 63.999rem)").matches
            : false
    ));

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 63.999rem)");
        const handleChange = (event) => {
            setIsCompact(event.matches);

            if (!event.matches) {
                setDrawerOpen(false);
            }
        };

        handleChange(mediaQuery);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    const closeDrawer = () => setDrawerOpen(false);

    const navigation = (
        <>
            {cajaNavigation.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={isCompact ? closeDrawer : undefined}
                    className={({ isActive }) => [
                        "rs-caja-nav__link",
                        isActive ? "rs-caja-nav__link--active" : ""
                    ].filter(Boolean).join(" ")}
                >
                    <Icon className="rs-caja-nav__icon" aria-hidden="true" />
                    <span>{label}</span>
                    <MdChevronRight
                        className="rs-caja-nav__chevron"
                        aria-hidden="true"
                    />
                </NavLink>
            ))}
        </>
    );

    const brand = (
        <div className="rs-caja-brand">
            <span className="rs-caja-brand__mark" aria-hidden="true">
                <MdPointOfSale />
            </span>
            <span className="rs-caja-brand__copy">
                <strong>Restaurante POS</strong>
                <small>Módulo de Caja</small>
            </span>
        </div>
    );

    return (
        <div className="rs-caja-shell">
            <Sidebar
                mobile={isCompact}
                open={!isCompact || drawerOpen}
                onClose={closeDrawer}
                header={brand}
                footer={(
                    <LogoutButton
                        fullWidth
                        className="rs-caja-sidebar__logout"
                    />
                )}
                className="rs-caja-sidebar"
                aria-label="Navegación de Caja"
            >
                {navigation}
            </Sidebar>

            <div className="rs-caja-workspace">
                <header className="rs-caja-topbar">
                    <Button
                        variant="ghost"
                        icon={<MdMenu />}
                        className="rs-caja-topbar__menu"
                        aria-label="Abrir navegación de Caja"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <span className="rs-sr-only">Abrir navegación</span>
                    </Button>
                    <div className="rs-caja-topbar__title">
                        <span>Operación</span>
                        <strong>Caja</strong>
                    </div>
                </header>

                <main className="rs-caja-content">
                    <div className="rs-caja-content__inner">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CajaLayout;
