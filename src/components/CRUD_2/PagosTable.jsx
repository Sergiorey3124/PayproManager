import React from "react";
import '../styles.css';

const PagosTable = (props) => {
    console.log(props)
    return ( 
       <div className="container mt-4">
        <table className="table table-striped table-bordered">
    <thead>
      <tr>
        <th>ID</th>
        <th>RFC</th>
        <th>Monto</th>
        <th>Fecha</th>
        <th>Aviso</th>
        <th>Metodo pago</th>
        <th>estado</th>
      </tr>
    </thead>
    <tbody>
        {
            props.users.length > 0 ?
            props.users.map(user =>(
                <tr key={user.pago_id}>
                <td>{user.pago_id}</td>
                <td>{user.RFC}</td>
                <td>{user.monto}</td>
                <td>{user.fecha}</td>
                <td>{user.fecha_aviso}</td>
                <td>{user.metodo_pago}</td>
                <td>{user.estado}</td>
                <td>
                  <button className="btn btn-primary btn-purple mr-4" onClick={() => {props.editRow(user)}}>Editar</button>
                  <button className="btn btn-primary btn-purple" onClick={() => {props.deleteUser(user.pago_id)}}>Eliminar</button> 
                  {/* Hacemos en el onClick una funcion de flecha para evitar que se ejecute desde que se abre la pagina */}
                </td>
              </tr>
            )) :
            (
                <tr>
                    <td  colSpan={3}> No hay pagos </td>
                </tr>
            )
        }
    </tbody>
  </table>
  </div>
     );
}
 
export default PagosTable;