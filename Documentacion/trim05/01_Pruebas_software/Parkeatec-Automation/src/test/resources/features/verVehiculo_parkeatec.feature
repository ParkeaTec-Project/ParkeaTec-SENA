#language:es
  #author:parkeatec

Característica: Ver los vehiculos dentro del sistema
  Como usuario de parkeatec
  quiero ver la informacion de mi vehiculo
  Para gestionar los datos del vehiculo

  Antecedentes:
    Dado que el usuario se encuentra en la pagina de inicio de sesion de Parkeatec
    Cuando ingrese las credenciales de usuario correctas (usuario y contrasena)
      | usuario                   | clave |
      | juanandres78.jg@gmail.com | 123   |

  @verVehiculo

  Escenario: Visualizar los vehiculos dentro de la pagina de parkeatec
    Cuando ingrese al apartado de mis vehiculos
    Entonces se debe visualizar los datos de los vehiculos registrados dentro del sistema.