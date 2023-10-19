import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import SingIn from "./components/SingIn";
import SignUp from "./components/SignUp";//Cambiar nombre del archivo
import 'bootstrap/dist/css/bootstrap.min.css';


const navArrayLinks = [
    { title: "Home", path: "/" },
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" },
  ];

export default function app(){
    return(
        <>
        <Navbar navArrayLinks={navArrayLinks}/>
        <Container sx={{mt: 5}}>

            <Routes>
                <Route path="/"
                element={<Home/>}/>
            </Routes>

            <Routes>
                <Route path="/login"
                element={<SingIn/>}/>
            </Routes>

            <Routes>
                <Route path="/register"
                element={<SignUp/>}/>
            </Routes>
        
        </Container>
        </>
    )
}