import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import NavbarAdmin from "./components/NavbarAdmin";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import SingIn from "./components/SignIn";
import SignUp from "./components/SignUp";//Cambiar nombre del archivo
import Main from "./components/Main";
import Crud1 from "./components/CRUD/Crud1";
import Crud2 from "./components/CRUD_2/Crud2";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';


const navArrayLinks = [
    { title: "Home", path: "/" },
    { title: "Iniciar sesión", path: "/login" },
    { title: "Registrarse", path: "/register" },
  ];

  const navArrayLinks2 = [ //Links para navbar ya logueado
  { title: "Pagos", path: "/main" },
  { title: "Usuarios", path: "/usuarios" },
  { title: "Pagos 2", path: "/pagos" }
];

export default function App(){

    const [loggedIn, setLoggedIn] = useState(false); // Track user's login status

    return(
        <>
        {loggedIn ? <NavbarAdmin navArrayLinks={navArrayLinks2}/> : <Navbar navArrayLinks={navArrayLinks} />}
        <Container sx={{mt: 5, marginBottom: 60}}>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<SignUp setLoggedIn={setLoggedIn}/>}/>
                <Route path="/login" element={<SingIn setLoggedIn={setLoggedIn}/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/usuarios" element={<Crud1/>}/>
                <Route path="/pagos" element={<Crud2/>}/>
            </Routes>
            
        </Container>
        <Footer/>
        </>
    )
}