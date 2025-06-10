package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.questions.ValidacionVerNovedades;
import co.com.AutomatizacionParkeatecPage.tasks.VerNovedades;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class VerNovedadesStepsDefinitions {
    @Cuando("^se encuentre en la pantalla inicial seleccione en el menu el apartado$")
    public void seEncuentreEnLaPantallaInicialSeleccioneEnElMenuElApartado() {
        theActorInTheSpotlight().attemptsTo(VerNovedades.verNovedades());
    }


    @Entonces("^este reflejara las novedades escritos por el usuario$")
    public void esteReflejaraLasNovedadesEscritosPorElUsuario() {
        theActorInTheSpotlight().should(seeThat(ValidacionVerNovedades.validacionVerNovedades()));
    }
}