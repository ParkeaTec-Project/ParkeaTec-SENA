package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.questions.ValidacionEspacios;
import co.com.AutomatizacionParkeatecPage.tasks.VerEspacios;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class VerEspaciosParkeatecStepsDefinitions {

    @Cuando("^ingrese al apartado de parqueadero desde el menu$")
    public void ingreseAlApartadoDeParqueaderoDesdeElMenu() {
        theActorInTheSpotlight().attemptsTo(VerEspacios.verEspacios());
    }


    @Entonces("^se debe visualizar todos los espacios ocupados o disponibles del parqueadero$")
    public void seDebeVisualizarTodosLosEspaciosOcupadosODisponiblesDelParqueadero() {
        theActorInTheSpotlight().should(seeThat(ValidacionEspacios.validacionEspacios()));
    }
}
