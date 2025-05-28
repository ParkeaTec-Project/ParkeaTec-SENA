#language:es
  #author:Parkeatec

Característica: Autenticacion en la pagina de Parkeatec
  Como vigilante de Parkeatec
  Quiero autenticarme en la pagina de Parkeatec
  Para poder acceder al contenido y funcionalidades disponibles.

  @autenticacion

  Escenario: Verificar la autenticacion exitosa en la pagina de Parkeatec
    Dado que el vigilante se encuentra en la pagina de inicio de sesion de Parkeatec
    Cuando ingrese las credenciales de vigilante correctas (usuario y contrasena)
      | usuario           | clave |
      | julianP@gmail.com | 123   |
    Entonces se debe verificar que el vigilante haya sido autenticado correctamente y redirigido a su pagina de inicio.