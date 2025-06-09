package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.models.CredencialesInicioSesion;
import co.com.AutomatizacionParkeatecPage.questions.ValidacionInicioSesion;
import co.com.AutomatizacionParkeatecPage.tasks.AbrirPagina;
import co.com.AutomatizacionParkeatecPage.tasks.AutenticarseUsuario;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class AutenticacionAdminParkeatecStepDefinitions {

    @Dado("^que el administrador se encuentre en la pagina de parkeatec$")
    public void queElAdministradorSeEncuentreEnLaPaginaDeParkeatec() {
        theActorInTheSpotlight().wasAbleTo(AbrirPagina.laPagina());
    }


    @Cuando("^ingrese sus credenciales$")
    public void ingreseSusCredenciales(List<CredencialesInicioSesion> credenciales) {
        theActorInTheSpotlight().attemptsTo(AutenticarseUsuario.aute(credenciales));
    }

    @Entonces("^se debe validar que el usuario haya iniciado sesion en la pagina exitosamente$")
    public void seDebeValidarQueElUsuarioHayaIniciadoSesionEnLaPaginaExitosamente() {
        theActorInTheSpotlight().should(seeThat(ValidacionInicioSesion.validacionInicioSesion()));
    }

}
