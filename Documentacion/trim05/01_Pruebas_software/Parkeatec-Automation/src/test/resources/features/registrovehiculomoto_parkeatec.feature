#language: es
  #author:Parkeatec

Característica: Llenar el formulario de registro de vehiculo moto
  Como usuario
  Quiero llenar el formulario de registro de vehiculo moto
  Para que mi moto pueda ser autorizada para el uso del parqueadero

  Antecedentes:
    Dado que el usuario se encuentra en la pagina de inicio de sesion de Parkeatec
    Cuando ingrese las credenciales de usuario correctas (usuario y contrasena)
      | usuario            | clave |
      | diego123@gmail.com | 123   |
    Entonces se debe verificar que el usuario haya sido autenticado correctamente y redirigido a su pagina de inicio.

    @registromoto
    Esquema del escenario: llenar formulario de registro moto
      Cuando ingrese la informacion solicitada en el formulario
        | placa_vehiculo   | modelo   | marca   | color   | vencimiento_soat   | observacion   |
        | <placa_vehiculo> | <modelo> | <marca> | <color> | <vencimiento_soat> | <observacion> |
      Entonces se debe verificar que el vehiculo haya sido registrado

      Ejemplos:
        | placa_vehiculo | modelo | marca | color | vencimiento_soat | observacion |
        | CBI23H         | Apache | TVS   | Gris  | 14082025         | Ninguna     |