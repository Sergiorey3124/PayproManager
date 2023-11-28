import React, { useState, useEffect } from "react";
import AddPagos from "./AddPagos";
import EditPagos from "./EditPagos";
import PagosTable from "./PagosTable";
import axios from 'axios';

const Crud2 = () => {

  useEffect(() => {
    fetchTutores();
  }, []);

  const fetchTutores = async () => {
    const response = await fetch('https://paypromanager2.000webhostapp.com/php/pagos.php');
    const jsonData = await response.json();
    setUsers(jsonData);
  };

  //state
  const [users, setUsers] = useState([])


  //Eliminar usuarios
  const deleteUser = (pago_id) => { //Cuando es solo un parametro podemos omitir los parentesis
    const formData = new FormData();
        formData.append("pago_id", pago_id);
        axios.post('https://paypromanager2.000webhostapp.com/php/deletePago.php', formData)
        .then(response => {
            console.log(response);
            fetchTutores();
        })
        .catch(error => {
            console.log(error);
        });
  }

  //Editar usuarios

  const [editing, setEditing] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    pago_id: "", RFC:"", monto: "", fecha_aviso: "", metodo_pago: "", estado: ""
  })

  const editRow = (user) =>{
    setEditing(true)
    setCurrentUser({
      pago_id: user.pago_id, RFC: user.RFC, monto: user.monto, fecha_aviso: user.fecha_aviso, metodo_pago: user.metodo_pago, estado: user.estado
  })
  }

  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-large mb-5">
          {
            editing ? (
              <div>
                <EditPagos currentUser={currentUser} fetchTutores={fetchTutores} setEditing={setEditing}/>
              </div>
            ) : (
              <div>
                <AddPagos fetchTutores={fetchTutores}/>
              </div>
            )
          }
        </div>
        <div className="flex-large">
          <h2>Lista de pagos</h2>
          <PagosTable users={users} deleteUser={deleteUser} editRow={editRow}/>
        </div>
      </div>
    </div>
  )
}

export default Crud2;