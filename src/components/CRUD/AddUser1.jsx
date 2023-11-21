import React, { Fragment, useState } from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import '../styles.css';


const AddUser1 = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [Entradas, setEntradas] = useState([])

    const onSubmit = (data, e) => {
        const formData = new FormData();
        formData.append("nombre", data.nombre);
        formData.append("RFC", data.RFC);
        formData.append("correo_electronico", data.correo_electronico);
        formData.append("contraseña", data.contraseña);
        // formData.append("direccion", data.direccion);
        // formData.append("NSS", data.NSS);
        axios.post('https://paypromanager2.000webhostapp.com/php/addUsuario.php', formData)
            .then(response => {
                console.log(response);
                setEntradas([
                    ...Entradas, data
                ]);
                e.target.reset();
                props.fetchTutores();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <Fragment>
            <h1>Nuevo Usuario</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p>Nombre</p>
                            <input
                                name="nombre"
                                placeholder="Juan Pérez"
                                className="form-control my-2"
                                {...register('nombre', { required: { value: true, message: "Nombre requerido" } })}
                            ></input>
                            {errors.nombre &&
                                <span className="text-danger text-small d-block mb-2">{errors.nombre.message}</span>}
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
                            <p>Correo</p>
                            <input
                                name="correo_electronico"
                                placeholder="correo1@gmail.com"
                                className="form-control my-2"
                                {...register('correo_electronico', {
                                    required: { value: true, message: "Correo requerido" },
                                    pattern: {
                                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                        message: "El Correo no es valido, prueba de nuevo."
                                    }
                                })}
                            ></input>
                            {errors.correo_electronico &&
                                <span className="text-danger text-small d-block mb-2">{errors.correo_electronico.message}</span>}

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

                            <button className="btn btn-primary btn-purple">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default AddUser1;