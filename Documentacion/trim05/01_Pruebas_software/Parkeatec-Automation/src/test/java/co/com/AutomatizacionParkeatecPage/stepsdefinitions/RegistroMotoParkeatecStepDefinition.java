package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.models.FormularioMoto;
import co.com.AutomatizacionParkeatecPage.questions.ValidacionRegistroMoto;
import co.com.AutomatizacionParkeatecPage.tasks.RegistroMoto;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class RegistroMotoParkeatecStepDefinition {

    @Cuando("^ingrese la informacion solicitada en el formulario$")
    public void ingreseLaInformacionSolicitadaEnElFormulario(List<FormularioMoto> formularioMoto) {
        theActorInTheSpotlight().attemptsTo(RegistroMoto.aute(formularioMoto));
    }


    @Entonces("^se debe verificar que el vehiculo haya sido registrado$")
    public void seDebeVerificarQueElVehiculoHayaSidoRegistrado() {
        theActorInTheSpotlight().should(seeThat(ValidacionRegistroMoto.validacionRegistroMoto()));
    }
}
