import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { rol } = useParams();

    // Renombramos para no chocar con la función local
    const { iniciarSesion: guardarSesion } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const iniciarSesion = async () => {
        try {
            const respuesta = await login(username, password);
            console.log(respuesta.data);
            const usuario = respuesta.data.usuario;
            const token = respuesta.data.token;
            console.log("Rol backend:", usuario.rol);
            console.log("Rol seleccionado:", rol);
            // Verificamos que el rolcorresponda
            if (usuario.rol !== rol) {
                alert("Este usuario no pertenece a esta área.");
                return;
            }
            // Guardamos la sesión
            guardarSesion(usuario, token);

            // Redirigimos según el rol
            switch (usuario.rol) {
                case "Administrador":
                    navigate("/admin");
                    break;
                case "Cajera":
                    navigate("/caja");
                    break;
                case "Cocinera":
                    navigate("/cocina");
                    break;
                case "Mesero":
                    navigate("/mesero");
                    break;
                default:
                    alert("Rol no válido.");
                    break;
            }
        } catch (error) {
    console.error(error.response?.data || error);
    alert(error.response?.data?.message || "Usuario o contraseña incorrectos.");
}
    };
    return (
        <div>
            <h1>Ingreso - {rol}</h1>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <br />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button onClick={iniciarSesion}>
                Iniciar sesión
            </button>
        </div>
    );
}
export default Login;