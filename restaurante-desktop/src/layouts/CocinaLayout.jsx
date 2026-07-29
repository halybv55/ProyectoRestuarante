import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    MdChevronRight,
    MdKitchen,
    MdMenu,
    MdReceiptLong
} from "react-icons/md";
import Button from "../components/Button";
import LogoutButton from "../components/LogoutButton";
import Sidebar from "../components/Sidebar";
import "../styles/operacion.css";
import "../styles/cocina.css";

function CocinaLayout({ children }) {
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

    const brand = (
        <div className="rs-kitchen-brand">
            <span className="rs-kitchen-brand__mark" aria-hidden="true">
                <MdKitchen />
            </span>
            <span className="rs-kitchen-brand__copy">
                <strong>Restaurante POS</strong>
                <small>Monitor de Cocina</small>
            </span>
        </div>
    );

    return (
        <div className="rs-kitchen-shell">
            <Sidebar
                mobile={isCompact}
                open={!isCompact || drawerOpen}
                onClose={closeDrawer}
                header={brand}
                footer={<LogoutButton fullWidth />}
                className="rs-kitchen-sidebar"
                aria-label="Navegación de Cocina"
            >
                <NavLink
                    to="/cocina"
                    end
                    onClick={isCompact ? closeDrawer : undefined}
                    className={({ isActive }) => [
                        "rs-kitchen-nav__link",
                        isActive ? "rs-kitchen-nav__link--active" : ""
                    ].filter(Boolean).join(" ")}
                >
                    <MdReceiptLong
                        className="rs-kitchen-nav__icon"
                        aria-hidden="true"
                    />
                    <span>Pedidos</span>
                    <MdChevronRight
                        className="rs-kitchen-nav__chevron"
                        aria-hidden="true"
                    />
                </NavLink>
            </Sidebar>

            <div className="rs-kitchen-workspace">
                <header className="rs-kitchen-topbar">
                    <Button
                        type="button"
                        variant="ghost"
                        icon={<MdMenu />}
                        className="rs-kitchen-topbar__menu"
                        aria-label="Abrir navegación de Cocina"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <span className="rs-sr-only">Abrir navegación</span>
                    </Button>
                    <div className="rs-kitchen-topbar__title">
                        <span>Operación</span>
                        <strong>Cocina</strong>
                    </div>
                </header>

                <main className="rs-kitchen-content">
                    <div className="rs-kitchen-content__inner">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CocinaLayout;
