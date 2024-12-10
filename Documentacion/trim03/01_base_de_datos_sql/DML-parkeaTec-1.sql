INSERT INTO tipo_documento VALUES 
(1, 'Cedula de ciudadania'),
(2, 'Cedula de extranjeria'),
(3, 'Tarjeta de identidad');

INSERT INTO roles (id, nombre) VALUES 
(1, 'admin'),
(2, 'vigilante'),
(3, 'usuario');

INSERT INTO permisos (id, nombre) VALUES
(1, 'crear_usuario'),
(2, 'eliminar_usuario'),
(3, 'ver_usuarios'),
(4, 'actualizar_usuario');

INSERT INTO rol_permisos (rol_id, permiso_id) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 3);



select * from usuario;

SELECT * FROM usuario WHERE id_documento = 1000517116;

SELECT * FROM usuario WHERE correo_electronico = "f@gmail.com";


SELECT * FROM obtenerusuario;

CALL ObtenerEmail('juan@gmail.com');
CALL InfoUsuario('1000517116');
CALL InfoUsuario(1019988647);
CALL InfoRol('1000517116');



CALL ActualizarUsuario('alejo', 'alejo@gmail.com', 'alejo123', 456);

CALL DetalleUsuarioDocumento(1000517116);

CALL ObtenerUsuarioId(1000517116);


CALL DetalleUsuarioDocumento(1000517116);



SELECT * FROM usuario WHERE rol_id = 3;

DELETE FROM usuario WHERE id_documento = 15455522;
SELECT * FROM tipo_documento;
SELECT * FROM roles;
                    
SELECT * FROM roles;


SELECT * FROM rol_permisos;

SELECT * FROM permisos;
    
    