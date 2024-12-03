//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/login';
import CrearUsuario from './pages/crearUsuario';
import RegistroUsuario from './pages/registroUsuario';
import VerUsuarios from './pages/verUsuarios';
import ActualizarUsuario from './pages/actualizarUsuario';
import CerrarSesion from './pages/cerrarSesion';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <CerrarSesion />
      <Routes>
        <Route path='/crearUsuario' element={ <CrearUsuario /> } />
        <Route path='/registroUsuario' element={ <RegistroUsuario /> } />
        <Route path='/usuarios' element={ <VerUsuarios /> } />
        <Route path='/editarUsuario/:id' element={ <ActualizarUsuario /> } />
        <Route path='/login' element={ <Login /> } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
