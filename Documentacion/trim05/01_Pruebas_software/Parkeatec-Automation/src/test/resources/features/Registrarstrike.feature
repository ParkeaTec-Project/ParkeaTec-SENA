#language:es
  #author:Felipe

Característica: Selecccionar un espacio de parqueo ocupado
  como usuario con rol de vigilante de Parkeatec quiero registrar una novedad del espacio de parqueo.
  para reportar el mal uso de este.

  Antecedentes:

    Dado que el vigilante se encuentra en la pagina de inicio de sesion de Parkeatec
    Cuando ingrese las credenciales de vigilante correctas (usuario y contrasena)
      | usuario           | clave |
      | julianP@gmail.com | 123   |

  @RegistrarNovedad

  Esquema del escenario: Registrar una novedad
    Cuando se encuentre en el apartado de espacios de parqueo este regisrte una novedad
      | <Mensaje> |
      | Mensaje   |
    Entonces este se vera reflejado en el apartado Ver novedades

    Ejemplos:
      | Mensaje                                                                        |
      | El usuario dejo el vehiculo parqueado fuera del horario de uso del parqueadero |