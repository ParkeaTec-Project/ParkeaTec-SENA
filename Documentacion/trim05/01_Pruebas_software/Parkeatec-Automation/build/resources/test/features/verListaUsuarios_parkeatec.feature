#language: es
  #author: parkeatec

  Característica: Ver la lista de usuarios que se han creado o registrado
    Como administrador de parkeatec
    Quiero ver el listado de usuarios registrados y/o creados
    Para gestionarlos mediante una sola unica vista

  Antecedentes:
    Dado que el administrador se encuentre en la pagina de parkeatec
    Cuando ingrese sus credenciales
      | usuario     | clave |
      | k@gmail.com | 123   |
    Entonces se debe validar que el usuario haya iniciado sesion en la pagina exitosamente

    @verListadoUsuarios
    Escenario: Mostrar los usuarios activos de parkeatec (usuario, vigilante o admin)
      Cuando ingrese al apartado Ver usuarios
      Entonces se debe verificar los usuarios con nombre completo, correo y rol