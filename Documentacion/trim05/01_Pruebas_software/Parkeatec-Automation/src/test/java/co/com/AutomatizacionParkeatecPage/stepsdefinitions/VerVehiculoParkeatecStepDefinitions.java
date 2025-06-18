package co.com.AutomatizacionParkeatecPage.stepsdefinitions;


import co.com.AutomatizacionParkeatecPage.questions.ValidacionVerVehiculo;
import co.com.AutomatizacionParkeatecPage.tasks.VerVehiculo;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class VerVehiculoParkeatecStepDefinitions {
    @Cuando("^ingrese al apartado de mis vehiculos$")
    public void ingreseAlApartadoDeMisVehiculos() {
        theActorInTheSpotlight().attemptsTo(VerVehiculo.verVehiculo());
    }

    @Entonces("^se debe visualizar los datos de los vehiculos registrados dentro del sistema\\.$")
    public void seDebeVisualizarLosDatosDeLosVehiculosRegistradosDentroDelSistema() {
        theActorInTheSpotlight().should(seeThat(ValidacionVerVehiculo.validacionVerVehiculo()));
    }

}
