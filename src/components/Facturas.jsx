import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';

function Facturas() {
    const [pagos, setPagos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [selectedRFC, setSelectedRFC] = useState('');
    const [selectedPagos, setSelectedPagos] = useState([]);
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [invoiceDate, setInvoiceDate] = useState('');
    const [invoiceConcept, setInvoiceConcept] = useState('');

    useEffect(() => {
        fetchPagos();
        fetchUsuarios();
    }, []);

    const fetchPagos = async () => {
        try {
            const response = await axios.get('https://paypromanager2.000webhostapp.com/php/pagos.php');
            if (response.data && response.data.length > 0) {
                setPagos(response.data);
            } else {
                // Manejar el caso de error o datos vacíos
            }
        } catch (error) {
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
            console.error('Error al obtener usuarios:', error);
        }
    };

    const handleRFCChange = (e) => {
        const selectedRFC = e.target.value;
        setSelectedRFC(selectedRFC);
    };

    const handleCheckboxChange = (pago_id) => {
        setSelectedPagos((prevSelected) => {
            if (prevSelected.includes(pago_id)) {
                return prevSelected.filter((id) => id !== pago_id);
            } else {
                return [...prevSelected, pago_id];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedPayments = pagos.filter((pago) => selectedPagos.includes(pago.pago_id));
        const firstPayment = selectedPayments[0];

        if (
            selectedPayments.every(
                (pago) =>
                    pago.fecha === firstPayment.fecha &&
                    pago.concepto_pago === firstPayment.concepto_pago &&
                    pago.metodo_pago === firstPayment.metodo_pago
            )
        ) {
            const pdf = new jsPDF();
            pdf.text(20, 20, '');

            selectedPayments.forEach((pago, index) => {
                const y = 30 + index * 10;
                pdf.text(20, y, `ID: ${pago.pago_id}, RFC: ${pago.RFC}, Monto: ${pago.monto}`);
            });

            pdf.save('Lista_de_Compras.pdf');

            const response = await axios.post('https://paypromanager2.000webhostapp.com/php/crear_facturas.php', {
                selectedInvoices: selectedPayments,
                invoiceDate,
                invoiceConcept,
            });

            console.log(response.data);
        } else {
            alert('Los pagos seleccionados deben tener la misma fecha, concepto y método de pago.');
        }
    };

    return (
        <div className="container mt-4">
            <h1>Generar Facturas</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="RFC">Seleccionar RFC:</label>
                    <select
                        className="form-control"
                        id="RFC"
                        value={selectedRFC}
                        onChange={handleRFCChange}
                    >
                        <option value="">Seleccione RFC</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.RFC} value={usuario.RFC}>
                                {usuario.RFC}
                            </option>
                        ))}
                    </select>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>RFC</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Concepto</th>
                            <th>Método de Pago</th>
                            <th>Seleccionar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagos.map((pago) => (
                            <tr key={pago.pago_id}>
                                <td>{pago.pago_id}</td>
                                <td>{pago.RFC}</td>
                                <td>{pago.monto}</td>
                                <td>{pago.fecha}</td>
                                <td>{pago.concepto_pago}</td>
                                <td>{pago.metodo_pago}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        value={pago.pago_id}
                                        onChange={() => handleCheckboxChange(pago.pago_id)}
                                        checked={selectedPagos.includes(pago.pago_id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button type="submit" className="btn btn-primary">
                    Generar Factura
                </button>
            </form>
        </div>
    );
}

export default Facturas;