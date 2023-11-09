import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import logImage from "./log.png";

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

        // Agregar la imagen en la parte superior izquierda
        const imgData = logImage;
        doc.addImage(imgData, 'JPEG', 10, 10, 40, 40);

        // Título y formato
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Comprobante de Pago', 105, 20, null, null, 'center');

    // Línea horizontal
    doc.setLineWidth(0.5);
    doc.line(10, 55, 200, 55);

    // Contenido del comprobante
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`ID del Pago: ${pago.pago_id}`, 15, 70);
    doc.text(`Fecha del Pago: ${pago.fecha}`, 15, 80);
    doc.text(`RFC del Cliente: ${pago.RFC}`, 15, 90);
    doc.text(`Monto Pagado: $${pago.monto}`, 15, 100);
    doc.text(`Método de Pago: ${pago.metodo_pago}`, 15, 110);

    // Línea horizontal
    doc.line(10, 120, 200, 120);

    // Nota
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Eaqui va lo del rfc.', 15, 130);





    // Fecha y firma
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Fecha del Pago:', 140, 150);
    doc.text('Firma del Cliente:', 140, 170);

    // Línea horizontal
    doc.line(10, 180, 200, 180);

    // Pie de página
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Gracias por su pago. Para más información, por favor contacte con nuestro servicio de atención al cliente.', 15, 195);

    doc.save('comprobante_pago.pdf');
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
