import "./App.css";
import "./styles/app.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import MainLayout from "./components/mainLayout";
import Dashboard from "./pages/Presentation.jsx";
import Login from "./pages/login";
import CrearUsuario from "./pages/crearUsuario";
import VerUsuarios from "./pages/verUsuarios";
import ActualizarUsuario from "./pages/actualizarUsuario";
import Registro from "./pages/registro";


import ForgotPassword from "./pages/forgotPassword";
import RecuperarPassword from "./pages/recuperarPassword";

import VerPerfil from "./pages/verPerfil";
import RealizarReserva from "./pages/RealizarReserva";
import GenerarStrike from "./pages/GenerarStrike";
import Formulario from "./pages/form";
import VerVehiculo from "./pages/verVehiculo";
import EspaciosParqueadero from "./pages/espaciosParqueadero";
import VerReservas from "./pages/reservas";
import RegistroNovedad from "./pages/registarNovedad";
import ListaNovedades from "./pages/listaNovedades";
import ListaNovedadesAdmin from "./pages/listaNovedadesAdmin";
import VerStrikesUsuario from "./pages/strikesUsuario";
import NotFound from "./pages/notFound";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const session = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/verificarSesion",
        {
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      console.error("Error al verificar la sesion", error);
    }
  };

  useEffect(() => {
    session();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element = { <MainLayout isAuthenticated={isAuthenticated}/> }>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/crearUsuario" element={<CrearUsuario />} />
          <Route path="/usuarios" element={<VerUsuarios />} />
          <Route path="/editarUsuario/:id" element={<ActualizarUsuario />} />
          <Route path="/login" element={<Login session={session} />} />
          <Route path="/registro" element={<Registro />} />

          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<RecuperarPassword />} />

          <Route path="/verPerfil" element={<VerPerfil />} />
          <Route path="/RealizarReserva" element={<RealizarReserva />} />
          <Route path="/VerReservas" element={<VerReservas />} />
          <Route path="/GenerarStrike" element={<GenerarStrike />} />
          <Route path="/Formulario" element={<Formulario />} />

          <Route path="/MiVehiculo" element={<VerVehiculo />} />

          <Route path="/EspaciosParqueadero" element={<EspaciosParqueadero />} />
        
          <Route path="/VerReservas" element={<VerReservas/>} />

          <Route path="/RegistroNovedad" element={<RegistroNovedad />}/>

          <Route path="/ListaNovedades" element={<ListaNovedades />}/>

          <Route path="/ListaNovedadesAdmin" element={<ListaNovedadesAdmin />}/>

          <Route path="/StrikesUsuario" element={<VerStrikesUsuario />}/>
        </Route>
      
        <Route path='*' element = { <NotFound /> } />
        
      </Routes>
    </Router>
  );
}

export default App;
