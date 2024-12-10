import './App.css';
import './styles/app.css'
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/login';
import CrearUsuario from './pages/crearUsuario';
import VerUsuarios from './pages/verUsuarios';
import ActualizarUsuario from './pages/actualizarUsuario';
import Registro from './pages/registro';
import HeaderLogin from './components/HeaderLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecuperarPassword from './pages/recuperarPassword';
import VerPerfil from './pages/verPerfil';
import RealizarReserva from './pages/RealizarReserva';
import VerReservas from './pages/VerReservas';
import GenerarStrike from './pages/GenerarStrike';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/verificarSesion", {
          credentials: "include"}
        );

        const data = await response.json();
        console.log(data);

        if(data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch(error) {
        console.error("Error al verificar la sesion", error);
      }
    };

    session();
  }, []);

  return (
    <Router>
      { isAuthenticated ? (
        <Header />
      ) : (
        <HeaderLogin />
      ) }
      {/* <CerrarSesion /> */}
      <Routes>

        <Route path='/crearUsuario' element={ <CrearUsuario /> } />
        <Route path='/usuarios' element={ <VerUsuarios /> } />
        <Route path='/editarUsuario/:id' element={ <ActualizarUsuario /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/registro' element={ <Registro /> } />
        <Route path='/recuperarPassword' element={ <RecuperarPassword /> } />
        <Route path='/verPerfil' element={ <VerPerfil /> } />
        <Route path='/RealizarReserva' element={ <RealizarReserva /> } />
        <Route path='/VerReservas' element={ <VerReservas /> } />
        <Route path='/GenerarStrike' element={ <GenerarStrike /> } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
