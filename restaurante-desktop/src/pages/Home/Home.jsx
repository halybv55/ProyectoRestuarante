import { useNavigate } from "react-router-dom";
function Home(){

    const navigate = useNavigate();
    return(
        <div>
            <h1>Restaurante ERP</h1>
            <button onClick={()=>navigate("/login/Administrador")}>
                Administrador
            </button>
            <br/><br/>
            <button onClick={()=>navigate("/login/Cajera")}>
                Cajera
            </button>
            <br/><br/>
            <button onClick={()=>navigate("/login/Cocinera")}>
                Cocinera
            </button>
            <br/><br/>
            <button onClick={()=>navigate("/login/Mesero")}>
                Mesero
            </button>
        </div>
    )
}
export default Home;