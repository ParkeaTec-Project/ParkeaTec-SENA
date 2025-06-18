#language:es
  #author:parkeatec

Característica: Realizar el registro de un usuario
  Como administrador de parkeatec
  Quiero hacer el registro de varios usuarios
  Para que puedan hacer diferentes funciones dentro de la pagina

  Antecedentes:
    Dado que el administrador se encuentre en la pagina de parkeatec
    Cuando ingrese sus credenciales
      | usuario     | clave |
      | k@gmail.com | 123   |

  @agregarUsuario

  Esquema del escenario: Hacer el registro de nuevos usuarios
    Cuando ingrese al apartdo de ver usuarios y llene el formulario de crear usuario
      | documento   | nombre   | apellido   | telefono   | direccion   | correo   | password   | centro_formacion   |
      | <documento> | <nombre> | <apellido> | <telefono> | <direccion> | <correo> | <password> | <centro_formacion> |
    Entonces se debe registrar la informacion del usuario y visualizarse en la tabla de usuarios

    Ejemplos:
      | documento | nombre | apellido | telefono   | direccion          | correo | password   | centro_formacion |
      | 89888548  | andres | perez    | 3000000000 | carrera 103 #73-51 | andres | Andres123# | CEET             |
