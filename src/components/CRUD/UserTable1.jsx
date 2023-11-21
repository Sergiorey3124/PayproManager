import React from "react";
import '../styles.css';

const UserTable1 = (props) => {
    console.log(props)
    return ( 
       <div className="container mt-4">
        <table className="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Correo</th>
        <th>RFC</th>
      </tr>
    </thead>
    <tbody>
        {
            props.users.length > 0 ?
            props.users.map(user =>(
                <tr key={user.RFC}>
                <td>{user.nombre}</td>
                <td>{user.correo_electronico}</td>
                <td>{user.RFC}</td>
                <td>
                  <button className="btn btn-primary btn-purple mr-4" onClick={() => {props.editRow(user)}}>Editar</button>
                  <button className="btn btn-primary btn-purple" onClick={() => {props.deleteUser(user.RFC)}}>Eliminar</button> 
                  {/* Hacemos en el onClick una funcion de flecha para evitar que se ejecute desde que se abre la pagina */}
                </td>
              </tr>
            )) :
            (
                <tr>
                    <td  colSpan={3}> No users </td>
                </tr>
            )
        }
    </tbody>
  </table>
  </div>
     );
}
 
export default UserTable1;