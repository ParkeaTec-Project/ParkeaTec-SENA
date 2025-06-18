#language:es
  #author:parkeatec

Característica: Ver los datos del perfil
  Como usuario de parkeatec
  Quiero ver los datos que he registrado en el sistema
  Para hacer uso de la informacion y codigo QR de la pagina

  Antecedentes:
    Dado que el usuario se encuentra en la pagina de inicio de sesion de Parkeatec
    Cuando ingrese las credenciales de usuario correctas (usuario y contrasena)
      | usuario                   | clave |
      | juanandres78.jg@gmail.com | 123   |


  @verPerfil

  Escenario: Visualizar los datos en la pagina de parkeatec
    Cuando ingrese al apartado de ver perfil
    Entonces debo ver los datos y codigo qr que la pagina parkeatec genera.