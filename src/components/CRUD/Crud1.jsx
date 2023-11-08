import React, { useState, useEffect } from "react";
import AddUser1 from "./AddUser1";
import EditUser1 from "./EditUser1";
import UserTable1 from "./UserTable1";
import axios from 'axios';

const Crud1 = () => {

  useEffect(() => {
    fetchTutores();
  }, []);

  const fetchTutores = async () => {
    const response = await fetch('https://paypromanager2.000webhostapp.com/listaUsuarios.php');
    const jsonData = await response.json();
    setUsers(jsonData);
  };

  //state
  const [users, setUsers] = useState([])


  //Eliminar usuarios
  const deleteUser = RFC => { //Cuando es solo un parametro podemos omitir los parentesis
    const formData = new FormData();
        formData.append("RFC", RFC);
        axios.post('https://paypromanager2.000webhostapp.com/deleteUsuario.php', formData)
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
    RFC: "", nombre:"", correo_electronico: ""
  })

  const editRow = (user) =>{
    setEditing(true)
    setCurrentUser({
      RFC: user.RFC, nombre: user.nombre, correo_electronico: user.correo_electronico
  })
  }

  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-large mb-5">
          {
            editing ? (
              <div>
                <EditUser1 currentUser={currentUser} fetchTutores={fetchTutores}/>
              </div>
            ) : (
              <div>
                <AddUser1 fetchTutores={fetchTutores}/>
              </div>
            )
          }
        </div>
        <div className="flex-large">
          <h2>Lista de Tutores</h2>
          <UserTable1 users={users} deleteUser={deleteUser} editRow={editRow}/>
        </div>
      </div>
    </div>
  )
}

export default Crud1;