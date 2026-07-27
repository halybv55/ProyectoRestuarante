import { useEffect, useState } from "react";

import {

    getListos,

    entregarPedido

} from "../../api/mesero.api";

function Mesero() {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {

        cargarPedidos();

    }, []);

    const cargarPedidos = async () => {

        try {

            const response = await getListos();

            setPedidos(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const entregar = async (idDetalle) => {

        try {

            await entregarPedido(idDetalle);

            cargarPedidos();

        } catch (error) {

            console.log(error);

        }

    };
        return (

        <div>

            <h2>Mesero</h2>

            <hr />

            <h3>Pedidos Listos</h3>

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

                        pedidos.map((pedido) => (

                            <tr key={pedido.iddetalle}>

                                <td>{pedido.codigo_pedido}</td>

                                <td>{pedido.mesa}</td>

                                <td>{pedido.plato}</td>

                                <td>{pedido.cantidad}</td>

                                <td>{pedido.estado}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            entregar(
                                                pedido.iddetalle
                                            )
                                        }
                                    >
                                        Entregar
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Mesero;