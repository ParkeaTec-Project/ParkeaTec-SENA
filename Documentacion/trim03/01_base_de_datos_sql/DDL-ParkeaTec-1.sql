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
    

insert into tipo_documento values (1, 'Cedula de ciudadania'),
(2, 'Cedula de extranjeria'),
(3, 'Tarjeta de identidad');

insert into usuario values (1000517116, 'juan', 'garnica', 8744, 'carrera 103', 'juan@gmail.com', '123', 'url', 'ceet',
784556, 'url', 'url', 'url', 1, 1);
select * from usuario where id_documento = 1000517116;
SELECT * FROM usuario WHERE correo_electronico = "f@gmail.com";

insert into roles (id, nombre) values (1, 'admin'),
(2, 'vigilante'),
(3, 'usuario');

select * from usuario;
SELECT * FROM usuario WHERE id_documento = 12;
UPDATE usuario SET contraseña = 'hola123' WHERE id_documento = 12;
UPDATE usuario SET contraseña = 'juan123' WHERE id_documento = 1000517116;
delete from usuario WHERE id_documento IN(12, 45, 200, 1234, 123456, 1000517116);

SELECT * FROM usuario WHERE correo_electronico = "felipe@gmail.com";

SELECT p.nombre AS permiso
                    FROM roles r
                    JOIN rol_permisos rp ON r.id = rp.rol_id
                    JOIN permisos p ON rp.permiso_id = p.id
                    WHERE r.id = 1;
                    
SELECT 
    r.nombre AS rol,
    p.nombre AS permiso
FROM 
    usuario u
INNER JOIN 
    roles r ON u.rol_id = r.id
INNER JOIN 
    rol_permisos rp ON r.id = rp.rol_id
INNER JOIN 
    permisos p ON rp.permiso_id = p.id
WHERE 
    u.id_documento = 154555;

select r.nombre from usuario AS u
inner join roles AS r on u.rol_id = r.id
where id_documento = 1000517116;


select * from usuario;
SELECT * FROM usuario WHERE correo_electronico = 'a@gmail.com';

SELECT * FROM usuario WHERE correo_electronico = 'a@gmail.com';
SELECT * FROM roles WHERE id = 3;
SELECT * FROM rol_permisos WHERE rol_id = 3;

select * from usuario where rol_id = 3;
SELECT * FROM usuario WHERE id_documento = 12;
delete from usuario where id_documento = 15455522;
select * from tipo_documento;
select * from roles;
                    
select * from roles;
insert into permisos (id, nombre) values 
(1, 'crear_usuario'),
(2, 'eliminar_usuario'),
(3, 'ver_usuarios'),
(4, 'actualizar_usuario');

insert into rol_permisos (rol_id, permiso_id) values 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 3);

insert into rol_permisos (rol_id, permiso_id) values (3, 3);

select * from roles;
select * from rol_permisos;
delete from rol_permisos where rol_id = 3;
select * from permisos;
    
    
SELECT r.nombre AS rol 
            FROM roles r
            INNER JOIN usuario u ON u.rol_id = r.id
            WHERE u.id_documento = 154555;





