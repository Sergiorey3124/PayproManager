import React from 'react'
import imagen1 from './image1.png';
import imagen2 from './image2.jpg';
import Diversity1 from '@mui/icons-material/AttachMoney';
import Logro from '@mui/icons-material/EmojiEvents';
import Grafica from '@mui/icons-material/Poll';
import Calorias from '@mui/icons-material/WorkHistory';
import Galleta from '@mui/icons-material/ReceiptLong';
import Dispositivos from '@mui/icons-material/DashboardCustomize';

export default function Home() {
  return (
    <div className="container" style={{ marginTop: '100px'}}>
      <div className="row">
        <div className="col-md-6 mr-auto">
          <h2 style={{ fontSize: '80px', lineHeight: '80px', marginBottom: '20px', fontWeight: '900' }}>
          Optimiza tus Finanzas Empresariales.</h2>
          <div className="col-md-9">
            <p>PayProManager es la solución integral para la gestión de pagos pendientes en tu empresa. Olvídate de las complicaciones financieras y descubre una forma más eficiente de manejar tus finanzas corporativas.</p>
            <button className="btn btn-secondary" style={{ backgroundColor: "#34495E"}} onClick={() => window.location.href = "/Login"}>Empieza gratis</button>
          </div>
        </div>
        <div className="col-md-6 mr-auto">
        <img src={imagen1} alt="Imagen" width="100%" height="500px" />
        </div>
      </div>

      <div className="row" style={{ marginTop: '100px'}}>
      <div className="col-md-6 mr-auto">
        <img src={imagen2} alt="Imagen" width="100%" height="500px" />
        </div>
        <div className="col-md-6 mr-auto">
          <h2 style={{ fontSize: '80px', lineHeight: '80px', marginBottom: '20px', fontWeight: '900' }}>
          Trabaja de manera conjunta y colaborativa</h2>
          <div className="col-md-9">
            <p>Simplifica la asignación de responsabilidades y el seguimiento de los pagos pendientes. Cada miembro del equipo puede acceder y actualizar la información necesaria de los pagos, lo que mejora la comunicación y la productividad.</p>
          </div>
        </div>
      </div>
     
      <div className="container text-center" style={{ marginTop: '100px'}}>
        <h2 style={{ fontSize: '60px', lineHeight: '60px', marginBottom: '20px', fontWeight: '900' }}>
        <span style={{ color: '#34495E' }}>Las herramientas para tus objetivos</span>
        </h2>
        <hr />
        <div className="row">
          <div className="col-md-4 mt-4 mb-5">
          <Diversity1  sx={{ color: '#16A085', fontSize: 40 }}/>
            <h2 className='mt-3'>Gestión Integral de Pagos</h2>
            <div className='text'>PayProManager te permite tener un control total sobre tus finanzas empresariales.</div>
          </div>
          <div className="col-md-4 mt-4 mb-5">
          <Galleta  sx={{ color: '#16A085', fontSize: 40 }}/>
            <h2 className='mt-3'>Facturación Rápida y Personalizada</h2>
            <div className='text'>Crea facturas profesionales en minutos y personalízalas según las necesidades de tu empresa y tus clientes.</div>
          </div>
          <div className="col-md-4 mt-4 mb-5">
          <Calorias  sx={{ color: '#16A085', fontSize: 40 }}/>
            <h2 className='mt-3'>Recordatorios de Pago Automáticos</h2>
            <div className='text'>Automatiza el proceso de envío de recordatorios de pago a tus clientes</div>
          </div>
          <div className="col-md-4 mt-4 mb-5">
          <Logro  sx={{ color: '#16A085', fontSize: 40 }}/>
            <h2 className='mt-3'>Colaboración y Trabajo en Equipo</h2>
            <div className='text'> Facilita la colaboración en tu equipo al permitir que varios miembros trabajen de manera conjunta en la gestión de pagos</div>
          </div>
          <div className="col-md-4 mt-4 mb-5">
          <Grafica  sx={{ color: '#16A085', fontSize: 40 }}/>
            <h2 className='mt-3'>Informes y Análisis Financieros</h2>
            <div className='text'>Accede a informes detallados y análisis en tiempo real que te ayudan a tomar decisiones financieras más informadas</div>
          </div>
          <div className="col-md-4 mt-4 mb-5">
          <Dispositivos  sx={{ color: '#16A085', fontSize: 40 }}/>
            <h2 className='mt-3'>Accesibilidad y Dispositivos Múltiples</h2>
            <div className='text'>Puede acceder y realizar un seguimiento de los pagos desde diversos dispositivos, como teléfonos móviles, tabletas y computadoras.</div>
          </div>
        </div>
      </div>


    </div>
  );
}

