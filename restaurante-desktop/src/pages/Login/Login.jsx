import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    MdArrowBack,
    MdLockOutline,
    MdPersonOutline,
    MdRestaurantMenu,
} from "react-icons/md";
import { login } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Input from "../../components/Input";

function Login() {
    const navigate = useNavigate();
    const { rol } = useParams();

    const { iniciarSesion: guardarSesion } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const iniciarSesion = async () => {
        setErrorMessage("");

        try {
            const respuesta = await login(username, password);
            console.log(respuesta.data);
            const usuario = respuesta.data.usuario;
            const token = respuesta.data.token;
            console.log("Rol backend:", usuario.rol);
            console.log("Rol seleccionado:", rol);

            if (usuario.rol !== rol) {
                setErrorMessage("Este usuario no pertenece a esta área.");
                alert("Este usuario no pertenece a esta área.");
                return;
            }

            guardarSesion(usuario, token);

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
                    setErrorMessage("Rol no válido.");
                    alert("Rol no válido.");
                    break;
            }
        } catch (error) {
            console.error(error.response?.data || error);
            setErrorMessage(
                error.response?.data?.message ||
                    "Usuario o contraseña incorrectos.",
            );
            alert(
                error.response?.data?.message ||
                    "Usuario o contraseña incorrectos.",
            );
        }
    };

    return (
        <div className="rs-login-page">
            <main className="rs-login-panel">
                <Link className="rs-login-back" to="/">
                    <MdArrowBack aria-hidden="true" />
                    <span>Volver a perfiles</span>
                </Link>

                <div className="rs-login-heading">
                    <span className="rs-login-heading__mark" aria-hidden="true">
                        <MdRestaurantMenu />
                    </span>
                    <div>
                        <span className="rs-login-heading__brand">
                            Restaurante ERP
                        </span>
                        <h1>Iniciar sesión</h1>
                    </div>
                </div>

                <div className="rs-login-role" aria-label={`Área seleccionada: ${rol}`}>
                    <span>Área seleccionada</span>
                    <strong>{rol}</strong>
                </div>

                {errorMessage && (
                    <Alert variant="danger" title="No fue posible ingresar">
                        {errorMessage}
                    </Alert>
                )}

                <form
                    className="rs-login-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        iniciarSesion();
                    }}
                >
                    <Input
                        id="username"
                        type="text"
                        label="Usuario"
                        placeholder="Ingresa tu usuario"
                        autoComplete="username"
                        autoCapitalize="none"
                        spellCheck="false"
                        icon={<MdPersonOutline />}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        id="password"
                        type="password"
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                        icon={<MdLockOutline />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit" size="lg" fullWidth>
                        Iniciar sesión
                    </Button>
                </form>

                <p className="rs-login-help">
                    Utiliza las credenciales asignadas a tu área.
                </p>
            </main>
        </div>
    );
}

export default Login;
