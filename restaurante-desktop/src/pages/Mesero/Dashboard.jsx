import LogoutButton from "../../components/LogoutButton";
import { useAuth } from "../../context/AuthContext";
function Dashboard(){
    const { usuario } = useAuth();
    return(
        <div>
            <h1>Mesero</h1>
            <p>{usuario?.username}</p>
            <p>{usuario?.rol}</p>
            <LogoutButton/>
        </div>
    )
}
export default Dashboard;