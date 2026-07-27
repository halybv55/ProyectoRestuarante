import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        const tokenGuardado = localStorage.getItem("token");
        if(usuarioGuardado && tokenGuardado){
            setUsuario(JSON.parse(usuarioGuardado));
            setToken(tokenGuardado);
        }
    }, []);
    const iniciarSesion = (usuario, token) =>{
        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("token", token);
        setUsuario(usuario);
        setToken(token);
    }
    const cerrarSesion = ()=>{
        localStorage.clear();
        setUsuario(null);
        setToken(null);
    }
    return(
        <AuthContext.Provider value={{
            usuario,
            token,
            iniciarSesion,
            cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=> useContext(AuthContext);