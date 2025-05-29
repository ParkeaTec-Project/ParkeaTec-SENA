#language:es
  #author:Parkeatec

Característica: registro en la pagina de Parkeatec
  Como usuario de Parkeatec
  Quiero registrarme en la pagina de Parkeatec
  Para tener una cuenta verificada y poder acceder a la pagina

  @registro

  Esquema del escenario: registrar de manera exitosa la informacion en la pagina de Parkeatec
    Dado que el usuario se encuentra en la pagina de registro de Parkeatec
    Cuando ingrese la informacion del formulario correctamente
      | nombre   | apellido   | correo_electronico   | contrasena   | telefono   | direccion   | numero_documento   | foto_usuario   | ficha_aprendiz   |
      | <nombre> | <apellido> | <correo_electronico> | <contrasena> | <telefono> | <direccion> | <numero_documento> | <foto_usuario> | <ficha_aprendiz> |
    Entonces se debe verificar que la informacion del usuario haya sido registrada correctamente y redirigido a su pagina de inicio.

    Ejemplos:
      | nombre | apellido | correo_electronico | contrasena | telefono   | direccion          | numero_documento | foto_usuario                        | ficha_aprendiz |
      | juan   | perez    | juan@gmail.com     | Juan123#   | 3000000000 | carrera 103 #73-51 | 1000517119       | C:/Users/User/Pictures/download.jpg | 2919581        |
