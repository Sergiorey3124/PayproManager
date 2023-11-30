import axios from "axios";
import React, { useState } from "react";
import { useForm } from 'react-hook-form'


const BuscarPagos = () => {


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

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data, e) => {
        const formData = new FormData();
        formData.append("RFC", data.RFC);
        formData.append("contraseña", data.contraseña);
        axios.post('https://paypromanager2.000webhostapp.com/php/buscarPagos.php', formData)
            .then(response => {
                const { mensaje, pagos } = response.data;
                console.log(mensaje);
                if (mensaje === 'Autenticación exitosa') {
                    // Actualiza el estado con los pagos obtenidos
                    setUsers(pagos);
                    console.log(pagos);
                }
                //e.target.reset();
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div className="container mt-4">
            <h1>Buscar Pago</h1>

            <div className="container mb-4">
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p>RFC</p>
                            <input
                                name="RFC"
                                placeholder="REAL102032"
                                className="form-control my-2"
                                {...register('RFC', {
                                    required: { value: true, message: "RFC requerido" },
                                    pattern: {
                                        value: /^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/,
                                        message: "El RFC no es valido, este debe tener: consiste en cuatro letras, seis dígitos y tres caracteres adicionales (homoclave)"
                                    }
                                })}
                            ></input>
                            {errors.RFC &&
                                <span className="text-danger text-small d-block mb-2">{errors.RFC.message}</span>}
                            <p>Contraseña</p>
                            <input
                                name="contraseña"
                                placeholder="Contrasena123"
                                className="form-control my-2"
                                {...register('contraseña', {
                                    required: { value: true, message: "Contraseña requerida" },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~/-]).{8,}$/,
                                        message: "La contraseña debe tener al menos 8 caracteres, una mayuscula, un numero y un caracter especial."
                                    }
                                })}
                            ></input>
                            {errors.contraseña &&
                                <span className="text-danger text-small d-block mb-2">{errors.contraseña.message}</span>}

                            <button className="btn btn-primary btn-purple">Buscar</button>
                        </form>
                    </div>
                </div>
            </div>

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
                        users.length > 0 ?
                            users.map(user => (
                                <tr key={user.pago_id}>
                                    <td>{user.pago_id}</td>
                                    <td>{user.RFC}</td>
                                    <td>{user.monto}</td>
                                    <td>{user.fecha}</td>
                                    <td>{user.fecha_aviso}</td>
                                    <td>{user.metodo_pago}</td>
                                    <td>{
                                        user.estado === 0 ? "Pendiente" : "Pagado"
                                    }</td>
                                    <td>
                                        <button className="btn btn-primary btn-purple" onClick={() => { deleteUser(user.pago_id) }}>Generar Factura</button>
                                        {/* Hacemos en el onClick una funcion de flecha para evitar que se ejecute desde que se abre la pagina */}
                                    </td>
                                </tr>
                            )) :
                            (
                                <tr>
                                    <td colSpan={3}> No hay pagos </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default BuscarPagos;