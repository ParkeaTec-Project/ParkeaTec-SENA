# language: es
# author: Parkeatec

Característica: Ver las reservas que el usuario tiene activas o ha realizado
  Como usuario de Parkeatec
  Quiero ver mis reservas
  Para tener el histórico de mi uso del parqueadero.

  Antecedentes:
    Dado que el usuario se encuentra en la pagina de inicio de sesion de Parkeatec
    Cuando ingrese las credenciales de usuario correctas (usuario y contrasena)
      | usuario          | clave |
      | benson@gmail.com | 123   |
    Entonces se debe verificar que el usuario haya sido autenticado correctamente y redirigido a su pagina de inicio.

  @verreserva
  Escenario: Mostrar la reserva activa y las reservas realizadas por el usuario
    Cuando ingrese al apartado de mis reservas
    Entonces se debe validar la existencia de las reservas realizadas y/o activas del usuario.
