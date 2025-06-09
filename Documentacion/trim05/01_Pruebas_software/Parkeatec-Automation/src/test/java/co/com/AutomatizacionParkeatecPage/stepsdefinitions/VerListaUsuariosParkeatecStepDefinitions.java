package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.tasks.ListaUsuarios;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class VerListaUsuariosParkeatecStepDefinitions {
    @Cuando("^ingrese al apartado Ver usuarios$")
    public void ingreseAlApartadoVerUsuarios() {
        theActorInTheSpotlight().attemptsTo(ListaUsuarios.noData());
    }

    @Entonces("^se debe verificar los usuarios con nombre completo, correo y rol$")
    public void seDebeVerificarLosUsuariosConNombreCompletoCorreoYRol() {
    }
}
