#language:es
  #author:Parkeatec

Característica: Selecccionar un espacio de parqueadero
  como usuario aprendiz de parkeatec
  quiero reservar un espacio de parqueadero
  para realizar uso de este una vez me encuentre en el SENA

  Antecedentes:

    Dado que el usuario se encuentra en la pagina de inicio de sesion de Parkeatec
    Cuando ingrese las credenciales de usuario correctas (usuario y contrasena)
      | usuario     | clave |
      | prueba@gmail.com | 123   |
    Entonces se debe verificar que el usuario haya sido autenticado correctamente y redirigido a su pagina de inicio.

    @realizarReserva

    Escenario: Realizar reserva de espacio de parqueadero
      Cuando realice la reserva de un espacio de parqueadero
      Entonces se debe valida la reserva activa en el apartado de mis reservas