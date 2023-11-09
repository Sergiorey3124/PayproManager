import React, { Fragment, useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import './styles.css';


const EditUser1 = (props) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: props.currentUser
    }
    );

    const [Entradas, setEntradas] = useState([])

    useEffect(() => {
        setValue("RFC", props.currentUser.RFC);
        setValue("nombre", props.currentUser.nombre);
        setValue("correo_electronico", props.currentUser.correo_electronico);
    }, [props.currentUser, setValue]);

    const onSubmit = (data, e) => {
        const formData = new FormData();
        formData.append("nombre", data.RFC);
        formData.append("nombre", data.nombre);
        formData.append("correo_electronico", data.correo_electronico);
        axios.post('https://paypromanager2.000webhostapp.com/editUsuario.php', formData)
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
            <h1>Editar Cliente</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p>Nombre</p>
                            <input
                                name="nombre"
                                placeholder="Juan Pérez"
                                className="form-control my-2"
                                {...register('nombre', {
                                    required: { value: true, message: "Nombre requerido" }
                                })}
                            ></input>
                            {errors.nombre &&
                                <span className="text-danger text-small d-block mb-2">{errors.nombre.message}</span>}
                            <p>CURP</p>
                            <input
                                name="RFC"
                                placeholder="REAL102032"
                                className="form-control my-2"
                                {...register('RFC', {
                                    required: { value: true, message: "RFC requerido" },
                                    pattern: {
                                        value: /^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/,
                                        message: "El RFC no es valido, este debe tener: consiste en cuatro letras, seis dígitos y dos caracteres adicionales (homoclave)"
                                    }
                                })}
                            ></input>
                            {errors.RFC &&
                                <span className="text-danger text-small d-block mb-2">{errors.RFC.message}</span>}
                            <p>Telefono</p>
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
                            <button className="btn btn-primary btn-purple">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditUser1;