import React, { Fragment, useState } from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import '../styles.css';


const AddPagos = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [Entradas, setEntradas] = useState([])

    const onSubmit = (data, e) => {
        const formData = new FormData();
        formData.append("RFC", data.RFC);
        formData.append("monto", data.monto);
        formData.append("fecha", data.fecha);
        formData.append("aviso", data.aviso);
        // formData.append("direccion", data.direccion);
        // formData.append("NSS", data.NSS);
        axios.post('https://paypromanager2.000webhostapp.com/php/addPagos.php', formData)
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
            <h1>Nuevo Pago</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <p>RFC</p>
                            <select {...register("RFC", { required:  { value: true, message: "RFC requerido" } })}
                            className="form-control my-2">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            {errors.RFC &&
                                <span className="text-danger text-small d-block mb-2">{errors.RFC.message}</span>}
                                <p>Monto</p>
                            <input type="number" placeholder="monto" {...register("monto", { required: true, min: 1, message: "Monto requerido" })} className="form-control my-2"></input>
                            {errors.monto &&
                                <span className="text-danger text-small d-block mb-2">{errors.monto.message}</span>}
                                <p>Fecha</p>
                            <input type="datetime" placeholder="fecha" {...register("fecha", { required: true, message: "fecha requerida" })} className="form-control my-2"></input>
                            {errors.fecha &&
                                <span className="text-danger text-small d-block mb-2">{errors.fecha.message}</span>}
                                <p>Fecha recordatorio</p>
                            <input type="datetime" placeholder="aviso" {...register("aviso", { required: true })} className="form-control my-2"></input>
                            {errors.aviso &&
                                <span className="text-danger text-small d-block mb-2">{errors.aviso.message}</span>}
                      
                        <button className="btn btn-primary btn-purple">Enviar</button>
                    </form>
                </div>
            </div>
        </div>

        </Fragment >
    );
}

export default AddPagos;