#language:es
  #author:Parkeatec

Característica: registro de vehiculo en la pagina de Parkeatec
  Como usuario de Parkeatec
  Quiero registrarme la informacion de mi vehiculo
  Para poder hacer uso del parqueadero

  Antecedentes:
    Dado que el usuario se encuentra en la pagina de inicio de sesion de Parkeatec
    Cuando ingrese las credenciales de usuario correctas (usuario y contrasena)
      | usuario                   | clave |
      | juanandres78.jg@gmail.com | 123   |

  @registroBicicleta

  Esquema del escenario: registrar de manera exitosa la informacion en la pagina de Parkeatec
    Cuando ingrese al apartado de formulario y seleccione llenar formulario
      | firma_usuario   | foto_documento   | foto_carnet   | nro_serial   | foto_serial   | foto_vehiculo   | observacion   |
      | <firma_usuario> | <foto_documento> | <foto_carnet> | <nro_serial> | <foto_serial> | <foto_vehiculo> | <observacion> |
    Entonces se debe registrar la informacion y verificar que la informacion del vehiculo haya sido registrada correctamente y visualizar en los vehiculos.

    Ejemplos:
      | firma_usuario                       | foto_documento                      | foto_carnet                         | nro_serial | foto_serial                         | foto_vehiculo                       | observacion |
      | C:/Users/User/Pictures/download.jpg | C:/Users/User/Pictures/download.jpg | C:/Users/User/Pictures/download.jpg | 123456ABC  | C:/Users/User/Pictures/download.jpg | C:/Users/User/Pictures/download.jpg | ninguna     |
