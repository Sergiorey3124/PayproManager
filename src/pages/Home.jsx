import React, { useState, useEffect } from 'react';
import './styles.css';


function HomePage() {
  const rectanglesData = [
    {
      id: 1,
      image: require('./PayPro.jpg'),
      text: <center> ¿Por qué confiar en nosotros?</center>,
      description: 'En PayPro Manager, nuestra reputación se basa en la confianza que depositan nuestros usuarios en nosotros. Hemos demostrado a lo largo del tiempo que somos una elección confiable para la gestión financiera. Nuestra experiencia en el campo, así como nuestro compromiso inquebrantable con la eficiencia, son la base de tu confianza en nosotros. Nos esforzamos por brindarte la tranquilidad de saber que tus operaciones financieras se gestionan de manera oportuna y precisa, lo que te permite enfocarte en el crecimiento de tu negocio.',
    },
    {
      id: 2,
      image: require('./payro.jpg'),
      text: <center>Nuestras Raíces</center>,
      description: 'Nuestras raíces definen quiénes somos en PayPro Manager. Desde nuestro humilde comienzo hasta nuestro crecimiento constante, nuestras raíces son la base de nuestra dedicación a tu éxito financiero. Hemos sido moldeados por la rica historia de la gestión financiera en México, y estamos comprometidos a llevar esa tradición a la era moderna. En PayPro Manager, entendemos las necesidades únicas de las empresas mexicanas y trabajamos para servirte de la mejor manera posible.',
    },
    {
      id: 3,
      image: require('./log.jpg'),
      text: <center>Acerca de nosotros.</center>,
      description: 'El equipo detrás de PayPro Manager está compuesto por profesionales apasionados y dedicados. Nos motiva la búsqueda de soluciones innovadoras que simplifiquen la gestión financiera para empresas en México. Creemos en la transparencia y la excelencia en el servicio al cliente. Nuestro equipo trabaja de manera cohesionada para garantizar que nuestras soluciones se adapten a tus necesidades. Queremos que conozcas quiénes somos, qué nos motiva y cómo trabajamos juntos para servirte de la mejor manera posible.',
    },
    {
      id: 4,
      image: require('./oc.jpg'),
      text: <center>¿Que puedes hacer con nosotros?</center>,
      description: 'En PayPro Manager, te ofrecemos una amplia gama de posibilidades. Nuestra aplicación te permite administrar pagos, generar facturas y agilizar tus procesos financieros de manera eficiente. Desde llevar un registro de pagos pendientes hasta programar recordatorios, nuestra plataforma está diseñada para facilitar tu vida financiera. Queremos ser tu socio en el mundo de las finanzas empresariales en México, brindándote soluciones que te permitan concentrarte en hacer crecer tu negocio. Descubre cómo PayPro Manager puede impulsar tu éxito financiero.',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openedRectangle, setOpenedRectangle] = useState(null);
  const [showMoneyAnimation, setShowMoneyAnimation] = useState(false);

  const handleClick = (rectangle) => {
    setShowMoneyAnimation(true);
    setTimeout(() => {
      setOpenedRectangle(rectangle);
    }, 1000);
  };

  const handleClose = () => {
    setOpenedRectangle(null);
    setShowMoneyAnimation(false); // Restablece la animación cuando se cierra
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === rectanglesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  
    return () => clearInterval(interval);
  }, [rectanglesData.length]); // Agrega rectanglesData.length como dependencia
  

  return (
    <div className="home-container">
      <div className="image-description-container">
        <div className="image-container"></div>
        <div className="description-container">
          <p>
            <br />
            <br />
            <center>
              <span className="description-title">
                <h1>"Quiénes Somos - PayPro Manager"</h1>
              </span>
            </center>
            <br />
            PayPro Manager es un equipo apasionado de profesionales que se dedican a simplificar y optimizar la gestión financiera para empresas en México. Nuestra plataforma facilita el control de pagos, la generación de facturas y la gestión de recordatorios, con un enfoque en la eficiencia y la facilidad de uso. Estamos aquí para que nuestros clientes puedan concentrarse en hacer crecer sus negocios y dejar la administración financiera en nuestras manos. ¡Únete a nosotros y descubre cómo PayPro Manager puede ser tu socio confiable en las finanzas empresariales!
          </p>
        </div>
      </div>

      <div className="rectangle-container">
        {rectanglesData.map((item) => (
          <div
            key={item.id}
            className={`rectangle ${showMoneyAnimation ? 'money-animation' : ''}`}
            onClick={() => handleClick(item)}
          >
            <div
              className="rectangle-image"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <p className="rectangle-text">{item.text}</p>
          </div>
        ))}
      </div>

      {openedRectangle && (
        <div className="rectangle-details">
          <div
            className="rectangle-image"
            style={{ backgroundImage: `url(${openedRectangle.image})` }}
          ></div>
          <p className="rectangle-text">{openedRectangle.text}</p>
          <p className="rectangle-description">{openedRectangle.description}</p>
          <button onClick={handleClose}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
