#language:es
  #author:Parkeatec

Característica: registro en la pagina de Parkeatec
  Como usuario de Parkeatec
  Quiero registrarme en la pagina de Parkeatec
  Para tener una cuenta verificada y poder acceder a la pagina

  @registro

  Escenario: registrar de manera exitosa la informacion en la pagina de Parkeatec
    Dado que el usuario se encuentra en la pagina de registro de Parkeatec
    Cuando ingrese la informacion correcta (usuario y contrasena)
      | nombre | apellido | correo_eletronico | contresena | telefono | direccion   | tipo_documento       | numero_documento | foto_usuario | centro_formacion | ficha_aprendiz |
      | juan   | perez    | juan@gmail.com    | 123        | 12345776 | carrera 103 | cedula de ciudadania | 346547865        |              | ceet             | 2919581        |
    Entonces se debe verificar que la informacion del usuario haya sido registrada correctamente y redirigido a su pagina de inicio.