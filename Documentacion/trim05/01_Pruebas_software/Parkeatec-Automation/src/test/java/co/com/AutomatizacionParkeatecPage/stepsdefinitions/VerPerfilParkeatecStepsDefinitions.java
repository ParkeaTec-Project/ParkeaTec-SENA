package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.questions.ValidacionVerPerfil;
import co.com.AutomatizacionParkeatecPage.tasks.VerPerfil;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class VerPerfilParkeatecStepsDefinitions {
    @Cuando("^ingrese al apartado de ver perfil$")
    public void ingreseAlApartadoDeVerPerfil() {
        theActorInTheSpotlight().attemptsTo(VerPerfil.verPerfil());
    }


    @Entonces("^debo ver los datos y codigo qr que la pagina parkeatec genera\\.$")
    public void deboVerLosDatosYCodigoQrQueLaPaginaParkeatecGenera() {
        theActorInTheSpotlight().should(seeThat(ValidacionVerPerfil.validacionVerPerfil()));
    }
}
