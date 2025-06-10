package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.models.Observacion;
import co.com.AutomatizacionParkeatecPage.questions.ValidacionStrike;
import co.com.AutomatizacionParkeatecPage.tasks.RegistrarStrike;
import cucumber.api.DataTable;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class GenerarstrikeDefinitions {
    @Cuando("^se encuentre en el apartado de espacios de parqueo este regisrte una novedad$")
    public void seEncuentreEnElApartadoDeEspaciosDeParqueoEsteRegisrteUnaNovedad(List<Observacion> info) {
        theActorInTheSpotlight().attemptsTo(RegistrarStrike.aute(info));
    }


    @Entonces("^este se vera reflejado en el apartado Ver novedades$")
    public void esteSeVeraReflejadoEnElApartadoVerNovedades() {
        theActorInTheSpotlight().should(seeThat(ValidacionStrike.validacionStrike()));
    }
}
