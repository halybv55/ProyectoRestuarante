import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./styles/tokens.css";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/utilities.css";
import "./styles/responsive.css";
import "./styles/public.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>
);
