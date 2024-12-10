CREATE DATABASE ParkeaTec;
USE ParkeaTec;


CREATE TABLE Usuario (
	id_documento INT(10) UNSIGNED,
    nombre VARCHAR(30),
    apellido VARCHAR(30),
    telefono INT(10),
    direccion VARCHAR(40),
    correo_electronico VARCHAR(40),
    contraseña VARCHAR(255),
    foto_usuario VARCHAR(255),
    centro_formacion VARCHAR(45),
    ficha_aprendiz INT(10),
    firma_usuario VARCHAR(255),
    foto_documento VARCHAR(255),
    foto_carnet VARCHAR(255),
    id_tipo_documento TINYINT(2) UNSIGNED NOT NULL,
    rol_id INT,
    CONSTRAINT Pk_id_documento
		PRIMARY KEY (id_documento)
);


CREATE TABLE tipo_documento (
	id TINYINT(2) UNSIGNED NOT NULL,
    nombre_documento VARCHAR(45),
    CONSTRAINT Pk_id
		PRIMARY KEY (id)
);

CREATE TABLE roles (
	id INT AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL,
    CONSTRAINT Pk_id_roles
		PRIMARY KEY (id)
);

CREATE TABLE permisos (
	id INT AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL,
    CONSTRAINT Pk_id_permisos
		PRIMARY KEY (id)
);

CREATE TABLE rol_permisos (
	rol_id INT,
    permiso_id INT,
    PRIMARY KEY(rol_id, permiso_id)
);

ALTER TABLE usuario
	ADD CONSTRAINT Fk_rol_id
    FOREIGN KEY (rol_id) REFERENCES roles(id);

ALTER TABLE rol_permisos 
	ADD CONSTRAINT Fk_rol_id_rol_permisos
    FOREIGN KEY (rol_id) REFERENCES roles(id),
    ADD CONSTRAINT Fk_permiso_id
    FOREIGN KEY (permiso_id) REFERENCES permisos(id);

ALTER TABLE Usuario
	ADD CONSTRAINT Fk_id_tipo_documento
    FOREIGN KEY (id_tipo_documento) REFERENCES tipo_documento(id);

CREATE TABLE Ficha (
	id_ficha INT(10) UNSIGNED,
    jornada VARCHAR(20),
    fecha_inicio_aprendiz DATE,
    fecha_terminacion DATE,
    id_documento INT(10) UNSIGNED,
    CONSTRAINT Pk_id_ficha
		PRIMARY KEY (id_ficha)
);

CREATE TABLE userFicha (
	id_documento INT(10) UNSIGNED,
    id_ficha INT(10) UNSIGNED,
    estado VARCHAR(15),
    fecha_inicio_aprendiz DATE,
    fecha_terminacion DATE,
    PRIMARY KEY (id_documento, id_ficha)
);

ALTER TABLE userFicha
	ADD CONSTRAINT Fk_user_ficha_id_documento
    FOREIGN KEY (id_documento) REFERENCES usuario(id_documento),
    ADD CONSTRAINT Fk_user_ficha_id_ficha
    FOREIGN KEY (id_ficha) REFERENCES ficha(id_ficha);


ALTER TABLE Ficha
	ADD CONSTRAINT Fk_ficha
    FOREIGN KEY (id_documento) REFERENCES Usuario (id_documento);
    
CREATE TABLE Ocupacion (
	id_ocupacion INT UNSIGNED,
    fecha_hora_ingreso DATETIME,
    fehca_hora_salida DATETIME,
    id_documento INT(10) UNSIGNED,
    CONSTRAINT Pk_id_ocupacion
		PRIMARY KEY (id_ocupacion)
);

ALTER TABLE Ocupacion
	ADD CONSTRAINT Fk_ocupacion
    FOREIGN KEY (id_documento) REFERENCES Usuario (id_documento);
    
CREATE TABLE Vehiculo (
	placa VARCHAR(6),
    tipo_vehiculo VARCHAR(45),
    modelo VARCHAR(45),
    marca VARCHAR(45),
    color VARCHAR(15),
    foto_placa VARCHAR(255),
    foto_serial VARCHAR(255),
    foto_vehiculo VARCHAR(255),
    foto_tarjeta_propiedad VARCHAR(255),
    foto_soat VARCHAR(255),
    foto_tecnomecanica VARCHAR(255),
    vencimiento_soat DATE,
    id_documento INT(10) UNSIGNED,
    id_tipo_vehiculo TINYINT(2) UNSIGNED NOT NULL,
    CONSTRAINT Pk_placa
		PRIMARY KEY (placa)
);

CREATE TABLE tipo_vehiculo (
	id_tipo_vehiculo TINYINT(2) UNSIGNED NOT NULL,
    nombre VARCHAR(45),
	CONSTRAINT Pk_id_tipo_vehiculo
		PRIMARY KEY (id_tipo_vehiculo)
);

ALTER TABLE Vehiculo
	ADD CONSTRAINT Fk_vehiculo
	FOREIGN KEY (id_documento) REFERENCES Usuario(id_documento),
    ADD CONSTRAINT Fk_id_tipo_vehiculo
    FOREIGN KEY (id_tipo_vehiculo) REFERENCES tipo_vehiculo(id_tipo_vehiculo);

    
CREATE TABLE Reserva (
	id_reserva INT(5) UNSIGNED,
    fecha_creacion DATETIME,
    estado VARCHAR(10),
    fecha_hora_entrada DATETIME,
    fecha_hora_salida DATETIME,
    puesto_asignado VARCHAR(10),
    id_documento INT(10) UNSIGNED,
    vehiculo_placa VARCHAR(6),
    CONSTRAINT Pk_id_reserva
		PRIMARY KEY (id_reserva)
);

ALTER TABLE Reserva
	ADD CONSTRAINT Fk_reserva_documento
    FOREIGN KEY (id_documento) REFERENCES Usuario(id_documento),
    ADD CONSTRAINT Fk_vehiculo_placa
    FOREIGN KEY (vehiculo_Placa) REFERENCES Vehiculo(placa);
    

CREATE TABLE Parqueadero (
	id_parqueadero VARCHAR(10),
    tipo_parqueadero VARCHAR(20),
    espacio_parqueadero INT,
    disponibilidad VARCHAR(10),
    estado VARCHAR(10),
    CONSTRAINT Pk_id_parqueadero
		PRIMARY KEY (id_parqueadero)
);

/*
ALTER TABLE Parqueadero
	ADD CONSTRAINT Fk_parqueadero
    FOREIGN KEY (id_documento) REFERENCES Usuario(id_documento);
*/

CREATE TABLE uso_parqueadero (
	id_uso INT UNSIGNED,
    fecha_entrada DATETIME,
    fecha_salida DATETIME,
    estado VARCHAR(10),
    placa VARCHAR(6),
    id_parqueadero VARCHAR(10),
    CONSTRAINT Pk_id_uso
		PRIMARY KEY (id_uso)
);

ALTER TABLE uso_parqueadero 
	ADD CONSTRAINT Fk_id_uso_placa
    FOREIGN KEY (placa) REFERENCES Vehiculo (placa),
    ADD CONSTRAINT Fk_id_uso_parqueadero
    FOREIGN KEY (id_parqueadero) REFERENCES Parqueadero (id_parqueadero);





