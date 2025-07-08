package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.questions.ValidacionMisReservas;
import co.com.AutomatizacionParkeatecPage.tasks.RealizarReserva;
import co.com.AutomatizacionParkeatecPage.tasks.VerEspacios;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class RealizarReservaParkeatecStepDefinitions {
    @Cuando("^realice la reserva de un espacio de parqueadero$")
    public void realiceLaReservaDeUnEspacioDeParqueadero() {
        theActorInTheSpotlight().attemptsTo(RealizarReserva.realizarReserva());
    }


    @Entonces("^se debe valida la reserva activa en el apartado de mis reservas$")
    public void seDebeValidaLaReservaActivaEnElApartadoDeMisReservas() {
        theActorInTheSpotlight().should(seeThat(ValidacionMisReservas.validacionMisReservas()));
    }
}
