import { useNavigate } from "react-router-dom";
import {
    MdArrowForward,
    MdOutlineAdminPanelSettings,
    MdOutlineRestaurant,
    MdPointOfSale,
    MdRestaurantMenu,
    MdRoomService,
} from "react-icons/md";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="rs-public-shell">
            <header className="rs-public-brand">
                <span className="rs-public-brand__mark" aria-hidden="true">
                    <MdRestaurantMenu />
                </span>
                <span className="rs-public-brand__name">Restaurante ERP</span>
            </header>

            <main className="rs-role-selection" aria-labelledby="role-selection-title">
                <div className="rs-role-selection__intro">
                    <span className="rs-role-selection__eyebrow">
                        Acceso al sistema
                    </span>
                    <h1 id="role-selection-title">Selecciona tu área de trabajo</h1>
                    <p>
                        Ingresa al espacio correspondiente a tus tareas de operación.
                    </p>
                </div>

                <div className="rs-role-grid">
                    <button
                        type="button"
                        className="rs-role-card rs-role-card--admin"
                        onClick={() => navigate("/login/Administrador")}
                    >
                        <span className="rs-role-card__icon" aria-hidden="true">
                            <MdOutlineAdminPanelSettings />
                        </span>
                        <span className="rs-role-card__content">
                            <strong>Administrador</strong>
                            <small>Configuración y control general</small>
                        </span>
                        <MdArrowForward
                            className="rs-role-card__arrow"
                            aria-hidden="true"
                        />
                    </button>

                    <button
                        type="button"
                        className="rs-role-card rs-role-card--cashier"
                        onClick={() => navigate("/login/Cajero")}
                    >
                        <span className="rs-role-card__icon" aria-hidden="true">
                            <MdPointOfSale />
                        </span>
                        <span className="rs-role-card__content">
                            <strong>Cajero</strong>
                            <small>Pedidos, cobros y ventas</small>
                        </span>
                        <MdArrowForward
                            className="rs-role-card__arrow"
                            aria-hidden="true"
                        />
                    </button>

                    <button
                        type="button"
                        className="rs-role-card rs-role-card--kitchen"
                        onClick={() => navigate("/login/Cocinero")}
                    >
                        <span className="rs-role-card__icon" aria-hidden="true">
                            <MdOutlineRestaurant />
                        </span>
                        <span className="rs-role-card__content">
                            <strong>Cocinero</strong>
                            <small>Preparación y estado de comandas</small>
                        </span>
                        <MdArrowForward
                            className="rs-role-card__arrow"
                            aria-hidden="true"
                        />
                    </button>

                    <button
                        type="button"
                        className="rs-role-card rs-role-card--service"
                        onClick={() => navigate("/login/Mesero")}
                    >
                        <span className="rs-role-card__icon" aria-hidden="true">
                            <MdRoomService />
                        </span>
                        <span className="rs-role-card__content">
                            <strong>Mesero</strong>
                            <small>Atención de mesas y entregas</small>
                        </span>
                        <MdArrowForward
                            className="rs-role-card__arrow"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </main>

            <footer className="rs-public-footer">
                <small>Gestión centralizada para la operación del restaurante</small>
            </footer>
        </div>
    );
}

export default Home;
