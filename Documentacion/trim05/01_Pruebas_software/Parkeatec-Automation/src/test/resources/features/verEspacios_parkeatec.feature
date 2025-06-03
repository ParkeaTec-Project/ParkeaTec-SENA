#language:es
  #author:Parkeatec

Característica: ver los espacios de parqueadero en la pagina de Parkeatec
  Como usuario de Parkeatec
  Quiero ver los espacios disponibles dentro del parqueadero
  Para poder hacer uso del parqueadero

  Antecedentes:
    Dado que el usuario se encuentra en la pagina de inicio de sesion de Parkeatec
    Cuando ingrese las credenciales de usuario correctas (usuario y contrasena)
      | usuario                   | clave |
      | juanandres78.jg@gmail.com | 123   |

  @verEspacios

  Escenario: visualizar exitosamente los espacios del parqueadero
    Cuando ingrese al apartado de parqueadero desde el menu
    Entonces se debe visualizar todos los espacios ocupados o disponibles del parqueadero

