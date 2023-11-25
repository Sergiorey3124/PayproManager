import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import logImage from "./log.png";

function Main() {
    const [pagos, setPagos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedPago, setSelectedPago] = useState(null);
    const [confirmDate, setConfirmDate] = useState("");

    const handleCloseConfirmModal = () => setShowConfirmModal(false);
    const handleShowConfirmModal = () => setShowConfirmModal(true);

    const fetchPagos = async () => {
        try {
            const response = await axios.get('https://paypromanager2.000webhostapp.com/php/pagos.php');
            if (response.data && response.data.length > 0) {
                setPagos(response.data);
            } else {
                // Manejar el caso de error o datos vacíos
            }
        } catch (error) {
            // Manejar errores de conexión
        }
    };

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('https://paypromanager2.000webhostapp.com/php/listaUsuarios.php');
            if (response.data && response.data.length > 0) {
                setUsuarios(response.data);
            } else {
                // Manejar el caso de error o datos vacíos
            }
        } catch (error) {
            // Manejar errores de conexión
        }
    };

    const Confirmar = (pago) => {
        setSelectedPago(pago);
        handleShowConfirmModal();
    };

    const handleDateChange = (event) => {
        setConfirmDate(event.target.value);
    };

    const handleConfirmAction = () => {
        // Validar que se haya ingresado una fecha
        if (!confirmDate) {
            // Puedes mostrar un mensaje de error o tomar la acción que prefieras
            alert("Por favor, ingrese una fecha de confirmación.");
            return;
        }

        // Puedes acceder a confirmDate para realizar la acción que necesites
        console.log("Fecha de confirmación:", confirmDate);

        // Aquí puedes realizar la lógica adicional antes de confirmar el pago
        generatePDF(selectedPago);
        handleCloseConfirmModal();
    };

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

        // Información del cliente (agregada)
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('INFORMACION DEL CLIENTE:', 15, 130);

        // Obtener información del usuario por RFC
        const usuario = usuarios.find((u) => u.RFC === pago.RFC);
        if (usuario) {
            doc.text(`Nombre: ${usuario.nombre}`, 15, 140);
            doc.text(`Correo Electrónico: ${usuario.correo_electronico}`, 15, 150);
            doc.text(`Direccion: ${usuario.direccion}`, 15, 160);
            doc.text(`NSS: ${usuario.NSS}`, 15, 170);
            // Puedes agregar más campos según la estructura de tu tabla Usuario
        } else {
            doc.text('Información del cliente no disponible', 15, 140);
        }

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
        doc.text('Gracias por su confianza, Recuerda que PayProManager te permite tener un control total sobre tus finanzas empresariales.', 15, 190);
        doc.text("Para más información, por favor contacte con nuestro servicio de atención al cliente", 17, 200);
        doc.save('comprobante_pago.pdf');
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    useEffect(() => {
        fetchPagos();
    }, []);

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
                            <td>{pago.estado ? 'Pagado' : 'En Espera'}</td>
                            <td>
                                {pago.estado === 1 ? (
                                    <button className="btn btn-primary" onClick={() => generatePDF(pago)}>
                                        Imprimir PDF
                                    </button>
                                ) : (
                                    <button className="btn btn-warning" onClick={() => Confirmar(pago)}>
                                        Confirmar Pago
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Estás seguro de que deseas confirmar el pago?</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="confirmDate">Fecha de Confirmación:</label>
                            <input
                                type="date"
                                id="confirmDate"
                                value={confirmDate}
                                onChange={handleDateChange}
                                className="form-control"
                                required
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAction}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Main;
