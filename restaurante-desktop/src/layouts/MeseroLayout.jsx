import { MdRestaurant } from "react-icons/md";
import LogoutButton from "../components/LogoutButton";
import "../styles/operacion.css";
import "../styles/mesero.css";

function MeseroLayout({ children }) {
    return (
        <div className="rs-waiter-shell">
            <header className="rs-waiter-header">
                <div className="rs-waiter-brand">
                    <span className="rs-waiter-brand__mark" aria-hidden="true">
                        <MdRestaurant />
                    </span>
                    <span className="rs-waiter-brand__copy">
                        <strong>Mesero</strong>
                        <small>Pedidos listos</small>
                    </span>
                </div>
                <LogoutButton
                    variant="ghost"
                    className="rs-waiter-header__logout"
                />
            </header>

            <main className="rs-waiter-content">
                <div className="rs-waiter-content__inner">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default MeseroLayout;
