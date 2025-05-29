package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.questions.ValidacionMisReservas;
import co.com.AutomatizacionParkeatecPage.tasks.MisReservas;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class VerReservasParkeatecStepsDefinitions {
    @Cuando("^ingrese al apartado de mis reservas$")
    public void ingreseAlApartadoDeMisReservas() {
        theActorInTheSpotlight().attemptsTo(MisReservas.noData());
    }

    @Entonces("^se debe validar la existencia de las reservas realizadas y/o activas del usuario\\.$")
    public void seDebeValidarLaExistenciaDeLasReservasRealizadasYOActivasDelUsuario() {
        theActorInTheSpotlight().should(seeThat(ValidacionMisReservas.validacionMisReservas()));
    }
}
