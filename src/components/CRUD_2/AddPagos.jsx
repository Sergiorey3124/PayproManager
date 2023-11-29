import React, { Fragment, useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import '../styles.css';


const AddPagos = (props) => {

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        const response = await fetch('https://paypromanager2.000webhostapp.com/php/listaUsuarios.php');
        const jsonData = await response.json();
        const users = jsonData.map((user) => ({
          value: user.RFC,
          label: user.RFC,
        }));
        setOptions(users);
    };


        const [options, setOptions] = useState([]);



        const { register, handleSubmit, formState: { errors } } = useForm();

        const [Entradas, setEntradas] = useState([])

        const onSubmit = (data, e) => {
            const formData = new FormData();
            formData.append("RFC", data.RFC);
            formData.append("monto", data.monto);
            formData.append("fecha", data.fecha);
            formData.append("aviso", data.aviso);
            formData.append("concepto_pago", data.concepto_pago);
            formData.append("metodo_pago", data.metodo_pago);
            
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
                                <select {...register("RFC", { required: { value: true, message: "RFC requerido" } })}
                                    className="form-control my-2">
                                    {options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.RFC &&
                                    <span className="text-danger text-small d-block mb-2">{errors.RFC.message}</span>}
                                <p>Monto</p>
                                <input type="number" placeholder="1000.00" {...register("monto", { required: true, min: 1, message: "Monto requerido" })} className="form-control my-2"></input>
                                {errors.monto &&
                                    <span className="text-danger text-small d-block mb-2">{errors.monto.message}</span>}
                                <p>Fecha</p>
                                <input type="date" placeholder="fecha" {...register("fecha", { required: true, message: "fecha requerida" })} className="form-control my-2"></input>
                                {errors.fecha &&
                                    <span className="text-danger text-small d-block mb-2">{errors.fecha.message}</span>}
                                <p>Fecha recordatorio</p>
                                <input type="date" placeholder="aviso" {...register("aviso", { required: true,  message: "fecha requerida"})} className="form-control my-2"></input>
                                {errors.aviso &&
                                    <span className="text-danger text-small d-block mb-2">{errors.aviso.message}</span>}
                                <p>Metodo de pago</p>
                                <select {...register("metodo_pago", { required: { value: true, message: "metodo de pago requerido" } })}
                                    className="form-control my-2">
                                        <option value="Deposito">Deposito</option>
                                        <option value="Transferencia">Transferencia</option>
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Cheque">Cheque</option>
                                </select>
                                {errors.metodo_pago &&
                                    <span className="text-danger text-small d-block mb-2">{errors.metodo_pago.message}</span>}
                                    <p>Concepto de pago</p>
                                    <input {...register("concepto_pago")} className="form-control my-2"></input>
                                
                                <button className="btn btn-primary btn-purple">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>

            </Fragment >
        );
    }

    export default AddPagos;