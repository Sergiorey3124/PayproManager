import React, { Fragment, useState } from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import './styles.css';


const AddUser1 = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [Entradas, setEntradas] = useState([])

    const onSubmit = (data, e) => {
        const formData = new FormData();
        formData.append("nombre", data.nombre);
        formData.append("RFC", data.RFC);
        formData.append("correo_electronico", data.correo_electronico);
        axios.post('https://paypromanager2.000webhostapp.com/addUsuario.php', formData)
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
                            <p>CURP</p>
                            <input
                                name="RFC"
                                placeholder="NIGS021217HJCTRRA9"
                                className="form-control my-2"
                                {...register('RFC', {
                                    required: { value: true, message: "CURP requerido" },
                                    pattern: {
                                        value: /^[a-zA-Z]{4}[a-zA-Z0-9]{14}$/,
                                        message: "El CURP no es valido, tiene que tener 18 caracteres y iniciar con 4 letras"
                                    }
                                })}
                            ></input>
                            {errors.RFC &&
                                <span className="text-danger text-small d-block mb-2">{errors.RFC.message}</span>}
                            <p>Telefono</p>
                            <input
                                name="correo_electronico"
                                placeholder="3330187594"
                                className="form-control my-2"
                                {...register('correo_electronico', {
                                    required: { value: true, message: "Telefono requerido" },
                                    pattern: {
                                        value: /^\d{10,14}$/,
                                        message: "El telefono no es valido, debe tener minimo 10 digitos maximo 14"
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

export default AddUser1;