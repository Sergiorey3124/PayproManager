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
        setValue("fecha", props.currentUser.fecha);
        setValue("aviso", props.currentUser.fecha_aviso);
        setValue("id", props.currentUser.pago_id);
    }, [props.currentUser, setValue]);

    const onSubmit = (data, e) => {
        props.setEditing(false)
        const formData = new FormData();
        formData.append("RFC", data.RFC);
        formData.append("monto", data.monto);
        formData.append("fecha", data.fecha);
        formData.append("aviso", data.aviso);
        formData.append("id", data.id);
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
                        <input type="number" placeholder="id" {...register("id", { required: true, min: 1 })} readOnly={true} />
                        <p>RFC</p>
                            <select {...register("RFC", { required:  { value: true, message: "RFC requerido" } })}
                            className="form-control my-2">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            {errors.RFC &&
                                <span className="text-danger text-small d-block mb-2">{errors.RFC.message}</span>}
                            <input type="number" placeholder="monto" {...register("monto", { required: true, min: 1 })} />
                            <input type="datetime" placeholder="fecha" {...register("fecha", { required: true })} />
                            <input type="datetime" placeholder="aviso" {...register("aviso", { required: true })} />
                            <button className="btn btn-primary btn-purple">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default EditPagos;