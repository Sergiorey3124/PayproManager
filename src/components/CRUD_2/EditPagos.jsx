import React, { Fragment, useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import '../styles.css';



const EditPagos = (props) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: props.currentUser
    }
    );

    const [Entradas, setEntradas] = useState([])

    useEffect(() => {
        setValue("RFC", props.currentUser.RFC);
        setValue("monto", props.currentUser.monto);
        setValue("aviso", props.currentUser.fecha_aviso);
        setValue("id", props.currentUser.pago_id);
        setValue("metodo_pago", props.currentUser.metodo_pago);
        setValue("concepto_pago", props.currentUser.concepto_pago);
    }, [props.currentUser, setValue]);

    const onSubmit = (data, e) => {
        props.setEditing(false)
        const formData = new FormData();
        formData.append("RFC", data.RFC);
        formData.append("monto", data.monto);
        formData.append("aviso", data.aviso);
        formData.append("id", data.id);
        formData.append("metodo_pago", data.metodo_pago);
        formData.append("concepto_pago", data.concepto_pago);
        axios.post('https://paypromanager2.000webhostapp.com/php/editPago.php', formData)
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
            <h1>Editar Pago</h1>
            <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <p>RFC</p>
                                <input readOnly={true} {...register("RFC")} className="form-control my-2"></input>
                                <p>Monto</p>
                                <input type="number" placeholder="1000.00" {...register("monto", { required: true, min: 1, message: "Monto requerido" })} className="form-control my-2"></input>
                                {errors.monto &&
                                    <span className="text-danger text-small d-block mb-2">{errors.monto.message}</span>}
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
        </Fragment>
    );
}
export default EditPagos;