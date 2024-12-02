//import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import CrearUsuario from './pages/crearUsuario';
import VerUsuarios from './pages/verUsuarios';
import ActualizarUsuario from './pages/actualizarUsuario';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/crearUsuario' element={ <CrearUsuario /> } />
        <Route path='/usuarios' element={ <VerUsuarios /> } />
        <Route path='/editarUsuario/:id' element={ <ActualizarUsuario /> } />
        <Route path='/login' element={ <Login /> } />
      </Routes>
    </Router>
    
  );
}

export default App;
