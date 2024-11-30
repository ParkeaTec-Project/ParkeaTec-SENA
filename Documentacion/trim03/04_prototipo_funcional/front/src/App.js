//import logo from './logo.svg';
import './App.css';
//import Login from './pages/login';
//import CrearUsuario from './pages/crearUsuario';
import VerUsuarios from './pages/verUsuarios';
import ActualizarUsuario from './pages/actualizarUsuario';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>


    //<Login />
    <Router>
      <Routes>
        <Route path='/usuarios' element={ <VerUsuarios /> } />
        <Route path='/editarUsuario/:id' element={ <ActualizarUsuario /> } />
      </Routes>
    </Router>
  );
}

export default App;
