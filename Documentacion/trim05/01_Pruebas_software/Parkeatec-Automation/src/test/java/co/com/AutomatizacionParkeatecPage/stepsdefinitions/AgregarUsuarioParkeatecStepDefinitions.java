package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.models.InfoUsuario;
import co.com.AutomatizacionParkeatecPage.questions.ValidacionAgregarUsuario;
import co.com.AutomatizacionParkeatecPage.tasks.AgregarUsuario;
import cucumber.api.DataTable;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class AgregarUsuarioParkeatecStepDefinitions {

    @Cuando("^ingrese al apartdo de ver usuarios y llene el formulario de crear usuario$")
    public void ingreseAlApartdoDeVerUsuariosYLleneElFormularioDeCrearUsuario(List<InfoUsuario> info) {
        theActorInTheSpotlight().attemptsTo(AgregarUsuario.aute(info));
    }

    @Entonces("^se debe registrar la informacion del usuario y visualizarse en la tabla de usuarios$")
    public void seDebeRegistrarLaInformacionDelUsuarioYVisualizarseEnLaTablaDeUsuarios() {
        theActorInTheSpotlight().should(seeThat(ValidacionAgregarUsuario.validacionAgregarUsuario()));
    }

}
