#language: es
  #author:Parkeatec

Característica: Llenar el formulario de registro de vehiculo moto
  Como usuario
  Quiero llenar el formulario de registro de vehiculo moto
  Para que mi moto pueda ser autorizada para el uso del parqueadero

  Antecedentes:
    Cuando ingrese las credenciales correctas (usuario y contrasena)
      | usuario                   | clave |
      | juanandres78.jg@gmail.com | 123   |
    Entonces se debe verificar que el usuario haya sido autenticado correctamente y redirigido a su pagina de inicio.

    @registromoto
    Esquema del escenario: llenar formulario de registro moto
      Cuando ingrese la informacion solicitada en el formulario
        | placavehiculo | modelo | marca | color | vencimientosoat | observacion |  |