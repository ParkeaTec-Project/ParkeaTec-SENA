#language: es
  #author: parkeatec

  Característica: Autenticacion en la pagina de Parkeatec
    Como administrador de Parkeatec
    Quiero autenticarme en la pagina de Parkeatec
    Para poder acceder al contenido y funcionalidades disponibles.

  @autenticacion

  Escenario: Verificar la autenticacion exitosa en la pagina parkeatec
    Dado que el administrador se encuentre en la pagina de parkeatec
    Cuando ingrese sus credenciales
      | usuario     | clave |
      | k@gmail.com | 123   |
    Entonces se debe validar que el usuario haya iniciado sesion en la pagina exitosamente