import { useEffect,useState } from "react";
import {
    getPendientes,
    cambiarEstado
} from "../../api/cocina.api";
function Cocina(){
    const [pedidos,setPedidos]=useState([]);
    useEffect(()=>{
        cargarPedidos();
    },[]);
    const cargarPedidos = async()=>{
        try{
            const response = await getPendientes();
            setPedidos(response.data);
        }catch(error){
            console.log(error);
        }
    };
    const preparar = async(idDetalle)=>{
        try{
            await cambiarEstado(
                idDetalle,
                2
            );
            cargarPedidos();
        }catch(error){
            console.log(error);
        }
    };
    const listo = async(idDetalle)=>{
        try{
            await cambiarEstado(
                idDetalle,
                3
            );
            cargarPedidos();
        }catch(error){
            console.log(error);
        }
    };
        return (
        <div>
            <h2>Cocina</h2>
            <hr/>
            <h3>Pedidos Pendientes</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Mesa</th>
                        <th>Plato</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pedidos.map((pedido)=>(
                            <tr key={pedido.iddetalle}>
                                <td>
                                    {pedido.codigo_pedido}
                                </td>
                                <td>
                                    {pedido.mesa}
                                </td>
                                <td>
                                    {pedido.plato}
                                </td>
                                <td>
                                    {pedido.cantidad}
                                </td>
                                <td>
                                    {pedido.estado}
                                </td>
                                <td>
                                    {
                                        pedido.estado==="PENDIENTE"
                                        ?
                                        <button
                                            onClick={()=>
                                                preparar(
                                                    pedido.iddetalle
                                                )
                                            }
                                        >
                                            Preparando
                                        </button>
                                        :
                                        <button
                                            onClick={()=>
                                                listo(
                                                    pedido.iddetalle
                                                )
                                            }
                                        >
                                            Listo
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Cocina;