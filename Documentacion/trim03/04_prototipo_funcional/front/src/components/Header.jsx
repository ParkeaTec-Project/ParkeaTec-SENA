function Header(){
    return(
        <header class="header">
        <a href="index.html"><img src="img/logo-parkeaTec.svg" alt="logo" class="logo" /></a>
        <i class="abrir-menu bi bi-list" id="abrir-menu"></i>
        <nav class="nav" id="nav">
            <i class="cerrar-menu bi bi-x" id="cerrar-menu"></i>
            <ul class="menu-horizontal">
                <li>
                    <a class="item-nav" href="#"><i class="fa-solid fa-newspaper"></i>Formulario</a>
                    <ul class="menu-vertical">
                        <li><a href="form.html">Llenar Formulario</a></li>
                        <li><a href="revisarForm.html">Revisar Formulario</a></li>
                    </ul>
                </li>
                <li><a class="item-nav" href="reportes.html"><i class="fas fa-chart-bar"></i>Reportes</a></li>
                <li>
                    <a class="item-nav" href=""><i class="bi bi-p-square-fill"></i>Parqueadero</a>
                    <ul class="menu-vertical">
                        <li><a href="">Asignar Espacio</a></li>
                        <li><a href="verEspaciosParqueadero.html">Ver espacios</a></li>
                        <li><a href="generar-strikes.html">Generar strikes</a></li>
                    </ul>
                </li>
                <li>
                    <a class="item-nav" href="#"><i class="bi bi-person-circle"></i>Perfil</a>
                    <ul class="menu-vertical">
                        <li><a href="verqr.html">Ver QR</a></li>
                        <li><a href="verPerfil.html">Ver perfil</a></li>
                        <li><a href="realizar-reserva.html">Hacer Reserva</a></li>
                        <li><a href="misVehiculos.html">Mis vehículos</a></li>
                        <li><a href="registrarUsuarios.html">Registrar Usuarios</a></li>
                        <li><a href="">Strikes</a></li>
                        <li><a href="ver-factura.html">Mis Facturas</a></li>
                        <li><a href="historial-entrada.html">Historial</a></li>
                        <li><a href="#modal1">Cerrar Sesión</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
    );
}

export default Header;