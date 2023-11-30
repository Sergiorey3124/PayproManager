import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import logImage from "./log.png";

function Main() {
    const [pagos, setPagos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [selectedRFC, setSelectedRFC] = useState('');

    const handleFechaInicioChange = (e) => {
        setFechaInicio(e.target.value);
        fetchPagos();
    };

    const handleFechaFinChange = (e) => {
        setFechaFin(e.target.value);
        fetchPagos();
    };

    const handleRFCChange = (e) => {
        setSelectedRFC(e.target.value);
        fetchPagos();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedPayment) {
            console.error('Error: selectedPayment no está configurado correctamente.');
            return;
        }

        // Formatear la fecha al formato "año-mes-día"
        const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

        // Asegúrate de que selectedPayment contiene la información necesaria
        const pago_id = selectedPayment.pago_id;

        // Modificar la lógica de estado según sea necesario
        const estado = 1; // Cambia esto según tus necesidades (1 para true, 0 para false)

        axios.post('https://paypromanager2.000webhostapp.com/php/editpagos.php', {
            pago_id: pago_id,
            fecha: formattedDate,
            estado: estado
        })
        .then((respuesta) => {
            if (respuesta.data.success) {
                // Actualizar el estado del pago en la tabla
                setPagos(pagos.map((p) => {
                    if (p.pago_id === pago_id) {
                        p.fecha = formattedDate;
                        p.estado = estado;
                    }
                    return p;
                }));

                // Cerrar la ventana emergente
                closeModal();

                // Mostrar un mensaje de confirmación
                alert('Pago confirmado correctamente');
            } else {
                // Mostrar un mensaje de error
                alert('Error al confirmar el pago');
            }
        })
        .catch((error) => {
            // Manejar errores de conexión
            console.error('Error al confirmar el pago:', error);
        });
    };

    // Función para cerrar la ventana emergente
    const closeModal = () => {
        setShowModal(false);
        setSelectedPayment(null);
        setSelectedDate('');
    };

    const fetchPagos = async () => {
        try {
            const response = await axios.get('https://paypromanager2.000webhostapp.com/php/pagos.php', {
                params: {
                    fechaInicio,
                    fechaFin,
                    RFC: selectedRFC,
                },
            });
            setPagos(response.data);
        } catch (error) {
            // Manejar errores de conexión
            console.error('Error al obtener pagos:', error);
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
            console.error('Error al obtener usuarios:', error);
        }
    };

    function Confirmar(pago) {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString().split("T")[0];
    
        // Crear una nueva ventana emergente
        const modal = window.open("", "Confirmar Pago", "width=500,height=300");
    
        // Estilos CSS para mejorar la apariencia
        modal.document.head.innerHTML = `
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                    text-align: center;
                }
                .container {
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    max-width: 400px;
                    margin: 0 auto;
                }
                h1 {
                    color: #333;
                }
                label {
                    display: block;
                    margin-top: 10px;
                    font-weight: bold;
                }
                input {
                    width: 100%;
                    padding: 8px;
                    margin-top: 5px;
                    margin-bottom: 15px;
                    box-sizing: border-box;
                }
                input[type="submit"] {
                    background-color: #4caf50;
                    color: white;
                    border: none;
                    padding: 10px;
                    border-radius: 4px;
                    cursor: pointer;
                }
            </style>
        `;
    
        // Contenido del formulario
        modal.document.body.innerHTML = `
            <div class="container">
                <h1>Confirmar Pago</h1>
                <form action="https://paypromanager2.000webhostapp.com/php/editpagos.php" method="post">
                    <input type="hidden" name="pago_id" value=${pago.pago_id} />
                    <input type="hidden" name="estado" value="1" />
                    <label for="fecha">Fecha</label>
                    <input type="date" name="fecha" id="fecha" value=${fechaFormateada} required />
                    <br>
                    <input type="submit" value="Confirmar Pago">
                </form>
            </div>
        `;
    
        // Enviar la solicitud POST al servidor
        axios.post('https://paypromanager2.000webhostapp.com/php/editpagos.php', {
            pago_id: pago.pago_id,
            fecha: fechaFormateada,
            estado: 1
        })
        .then((respuesta) => {
            if (respuesta.data.success) {
                // Actualizar el estado del pago en la base de datos
                setPagos(pagos.map((p) => {
                    if (p.pago_id === pago.pago_id) {
                        p.estado = true;
                    }
                    return p;
                }));
    
                // Mostrar un mensaje de confirmación
                alert('Pago confirmado correctamente');
    
                // Cerrar la ventana emergente
                modal.close();
    
                // Recargar la página después de cerrar la ventana emergente
                window.location.reload();
            } else {
                // Mostrar un mensaje de error
                alert('Error al confirmar el pago');
            }
        })
        .catch((error) => {
            // Manejar errores de conexión
            console.error('Error al confirmar el pago:', error);
        });
    }
    
    const generatePDF = (pago) => {
        const doc = new jsPDF();

        // Agregar la imagen en la parte superior izquierda
        const imgData = logImage;
        doc.addImage(imgData, 'JPEG', 10, 10, 40, 40);

        // Título y formato
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Comprobante de Pago', 105, 20, null, null, 'center');
        doc.text(`Fecha del Pago: ${pago.fecha}`, 105, 50);

        // Línea horizontal
        doc.setLineWidth(0.5);
        doc.line(10, 55, 200, 55);

        // Contenido del comprobante
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text("Pago presentado a traves de PayProManager - Solventado por ´Nombre de la empresa´.",15, 70)
        doc.text(`ID del Pago: ${pago.pago_id}`, 15, 80);
        doc.text(`RFC del Cliente: ${pago.RFC}`, 15, 90);
        doc.text(`Monto Pagado: $${pago.monto}`, 15, 100);
        doc.text(`Método de Pago: ${pago.metodo_pago}`, 15, 110);
        doc.text(`Concepto de Pago: ${pago.concepto_pago}`, 15, 120);
      

        // Línea horizontal
        doc.line(10, 130, 200, 130);

        // Información del cliente (agregada)
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('INFORMACION DEL CLIENTE:', 15, 140);

        // Obtener información del usuario por RFC
        const usuario = usuarios.find((u) => u.RFC === pago.RFC);
        if (usuario) {
            doc.text(`Nombre: ${usuario.nombre}`, 15, 150);
            doc.text(`Correo Electrónico: ${usuario.correo_electronico}`, 15, 160);
            doc.text(`Direccion: ${usuario.direccion}`, 15, 170);
            doc.text(`NSS: ${usuario.NSS}`, 15, 180);
            // Puedes agregar más campos según la estructura de tu tabla Usuario
        } else {
            doc.text('Información del cliente no disponible', 15, 140);
        }

        // Fecha y firma
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Firma del Cliente:', 140, 170);

        // Línea horizontal
        doc.line(10, 190, 200, 190);

        // Pie de página
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Gracias por su confianza, Recuerda que PayProManager te permite tener un control total sobre tus finanzas empresariales.', 15, 190);
        doc.text("Para más información, por favor contacte con nuestro servicio de atención al cliente", 17, 200);
        doc.text("Este documento se extiende hasta donde los involucrados deseen:  ",17, 210 )
        doc.text("__________________",17,270)
        doc.text("__________________",140,270)
        doc.text("  Firma ´Mi Empresa´", 17, 280)
        doc.text("  Firma ´Cliente", 140, 280)
        doc.save('comprobante_pago.pdf');
    };

    useEffect(() => {
        fetchUsuarios();
        fetchPagos();
    }, [fechaInicio, fechaFin, selectedRFC]);

    return (
        <div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h1>Actualizar Pago</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <label htmlFor="fecha">Fecha:</label>
                            <input
                                type="date"
                                id="fecha"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                            <br />
                            <button type="submit">Confirmar Pago</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="container mt-4">
                <div className="mb-3">
                    <label htmlFor="fechaInicio">Fecha Inicio:</label>
                    <input
                        type="date"
                        id="fechaInicio"
                        value={fechaInicio}
                        onChange={(e) => handleFechaInicioChange(e)}
                    />
                    <label htmlFor="fechaFin">Fecha Fin:</label>
                    <input
                        type="date"
                        id="fechaFin"
                        value={fechaFin}
                        onChange={(e) => handleFechaFinChange(e)}
                    />
                    <label htmlFor="RFC">RFC:</label>
                    <select
                        id="RFC"
                        value={selectedRFC}
                        onChange={(e) => handleRFCChange(e)}
                    >
                        <option value="">Todos</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.RFC} value={usuario.RFC}>
                                {usuario.RFC}
                            </option>
                        ))}
                    </select>

                    {/* Botón para aplicar filtros */}
                    <button onClick={fetchPagos} className="btn btn-primary ml-2">
                        Aplicar Filtros
                    </button>
                </div>

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
                                        <>
                                        <button className="btn btn-warning" onClick={() => Confirmar(pago)}>
                                            Confirmar Pago
                                        </button>
                                         <button className="btn btn-primary" onClick={() => Confirmar(pago)}>
                                         Enviar Recordatorio
                                     </button>
                                 </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Main;
