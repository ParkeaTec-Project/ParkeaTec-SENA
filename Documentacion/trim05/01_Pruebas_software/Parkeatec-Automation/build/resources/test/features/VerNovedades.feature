#language:es
  #author:Felipe

Característica: Selecccionar en el menu el apartado
  como usuario con rol de vigilante de Parkeatec quiero ver las novedades que he registrado.
  para llevar un registro de estas.

  Antecedentes:

    Dado que el vigilante se encuentra en la pagina de inicio de sesion de Parkeatec
    Cuando ingrese las credenciales de vigilante correctas (usuario y contrasena)
      | usuario           | clave |
      | julianP@gmail.com | 123   |

    @VerNovedades

    Escenario: Ver mis novedades
      Cuando se encuentre en la pantalla inicial seleccione en el menu el apartado
      Entonces este reflejara las novedades escritos por el usuario