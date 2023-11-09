import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";

const App = () => {
  const [pagos, setPagos] = useState([]);
  const [id, setId] = useState("");
  const [rfc, setRfc] = useState("");

  useEffect(() => {
    axios
      .get("https://paypromanager2.000webhostapp.com/pagos.php")
      .then((response) => {
        setPagos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id !== "") {
      axios
        .get("https://paypromanager2.000webhostapp.com/pagos.php?id=" + id)
        .then((response) => {
          setPagos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (rfc !== "") {
      axios
        .get("https://paypromanager2.000webhostapp.com/pagos.php?rfc=" + rfc)
        .then((response) => {
          setPagos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h1>Pagos</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="id">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="rfc">
          <Form.Label>RFC</Form.Label>
          <Form.Control type="text" placeholder="RFC" value={rfc} onChange={(e) => setRfc(e.target.value)} />
        </Form.Group>
        <Button type="submit">Filtrar</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>RFC</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Fecha Aviso</th>
            <th>Método de Pago</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.id}</td>
              <td>{pago.rfc}</td>
              <td>{pago.monto}</td>
              <td>{pago.fecha}</td>
              <td>{pago.fecha_aviso}</td>
              <td>{pago.metodo_pago}</td>
              <td>{pago.estado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));