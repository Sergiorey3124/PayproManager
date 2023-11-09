import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

function Main() {
    const [pagos, setPagos] = useState([]);

    // Función para obtener los datos de la tabla de pagos
    const fetchPagos = async () => {
        try {
            const response = await axios.get('https://paypromanager2.000webhostapp.com/pagos.php');
            if (response.data && response.data.length > 0) {
                setPagos(response.data);
            } else {
                // Manejar el caso de error o datos vacíos
            }
        } catch (error) {
            // Manejar errores de conexión
        }
    };

    // Llamar a fetchPagos al cargar el componente
    useEffect(() => {
        fetchPagos();
    }, []);

    // Función para generar un PDF a partir de la fila de datos
    const generatePDF = (pago) => {
        const doc = new jsPDF();

        doc.text(`ID: ${pago.pago_id}`, 10, 10);
        doc.text(`RFC: ${pago.RFC}`, 10, 20);
        doc.text(`Monto: ${pago.monto}`, 10, 30);
        doc.text(`Fecha: ${pago.fecha}`, 10, 40);
        doc.text(`Fecha de Aviso: ${pago.fecha_aviso}`, 10, 50);
        doc.text(`Método de Pago: ${pago.metodo_pago}`, 10, 60);
        doc.text(`Estado: ${pago.estado}`, 10, 70);

        doc.save('pago.pdf');
    };

    return (
        <div className="container mt-4">
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>RFC</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Fecha de Aviso</th>
                        <th>Método de Pago</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pagos.map((pago) => (
                        <tr key={pago.pago_id}>
                            <td>{pago.pago_id}</td>
                            <td>{pago.RFC}</td>
                            <td>{pago.monto}</td>
                            <td>{pago.fecha}</td>
                            <td>{pago.fecha_aviso}</td>
                            <td>{pago.metodo_pago}</td>
                            <td>{pago.estado}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => generatePDF(pago)}
                                >
                                    Imprimir PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Main;
