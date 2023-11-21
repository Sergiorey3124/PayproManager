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
    const response = await fetch('https://paypromanager2.000webhostapp.com/php/listaUsuarios.php');
    const jsonData = await response.json();
    setUsers(jsonData);
  };

  //state
  const [users, setUsers] = useState([])


  //Eliminar usuarios
  const deleteUser = (RFC) => { //Cuando es solo un parametro podemos omitir los parentesis
    const formData = new FormData();
        formData.append("RFC", RFC);
        axios.post('https://paypromanager2.000webhostapp.com/php/deleteUsuario.php', formData)
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
    RFC: "", nombre:"", correo_electronico: "", contraseña: "", direccion: "", NSS: ""
  })

  const editRow = (user) =>{
    setEditing(true)
    setCurrentUser({
      RFC: user.RFC, nombre: user.nombre, correo_electronico: user.correo_electronico, contraseña: user.contraseña, direccion: user.direccion, NSS: user.NSS
  })
  }

  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-large mb-5">
          {
            editing ? (
              <div>
                <EditUser1 currentUser={currentUser} fetchTutores={fetchTutores} setEditing={setEditing}/>
              </div>
            ) : (
              <div>
                <AddUser1 fetchTutores={fetchTutores}/>
              </div>
            )
          }
        </div>
        <div className="flex-large">
          <h2>Lista de Clientes</h2>
          <UserTable1 users={users} deleteUser={deleteUser} editRow={editRow}/>
        </div>
      </div>
    </div>
  )
}

export default Crud1;