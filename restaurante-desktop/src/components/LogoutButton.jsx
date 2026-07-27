import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

function LogoutButton({
    className = "",
    fullWidth = false,
    variant = "ghost",
    ...props
}) {
    const navigate = useNavigate();
    const { cerrarSesion } = useAuth();

    const salir = () => {
        cerrarSesion();
        navigate("/");
    };

    return (
        <Button
            {...props}
            type="button"
            variant={variant}
            icon={<MdLogout />}
            fullWidth={fullWidth}
            className={className}
            onClick={salir}
        >
            Cerrar sesión
        </Button>
    );
}

export default LogoutButton;
