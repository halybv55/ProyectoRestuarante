import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LogoutButton(){
    const navigate = useNavigate();
    const { cerrarSesion } = useAuth();
    const salir = ()=>{
        cerrarSesion();
        navigate("/");
    }
    return(
        <button onClick={salir}>
            Cerrar sesión
        </button>
    )
}
export default LogoutButton;