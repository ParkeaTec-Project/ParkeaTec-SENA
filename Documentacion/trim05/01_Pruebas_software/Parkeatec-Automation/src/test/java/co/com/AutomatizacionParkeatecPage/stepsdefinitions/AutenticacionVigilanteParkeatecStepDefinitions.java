package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.models.CredencialesInicioSesion;
import co.com.AutomatizacionParkeatecPage.questions.ValidacionInicioSesion;
import  co.com.AutomatizacionParkeatecPage.tasks.AbrirPagina;
import co.com.AutomatizacionParkeatecPage.tasks.AutenticarseUsuario;
import co.com.AutomatizacionParkeatecPage.tasks.AutenticarseVigilante;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class AutenticacionVigilanteParkeatecStepDefinitions {
    @Dado("^que el vigilante se encuentra en la pagina de inicio de sesion de Parkeatec$")
    public void queElVigilanteSeEncuentraEnLaPaginaDeInicioDeSesionDeParkeatec() {
        theActorInTheSpotlight().wasAbleTo(AbrirPagina.laPagina());
    }


    @Cuando("^ingrese las credenciales de vigilante correctas \\(usuario y contrasena\\)$")
    public void ingreseLasCredencialesDeVigilanteCorrectasUsuarioYContrasena(List<CredencialesInicioSesion> credenciales) {
        theActorInTheSpotlight().attemptsTo(AutenticarseVigilante.aute(credenciales));
    }

    @Entonces("^se debe verificar que el vigilante haya sido autenticado correctamente y redirigido a su pagina de inicio\\.$")
    public void seDebeVerificarQueElVigilanteHayaSidoAutenticadoCorrectamenteYRedirigidoASuPaginaDeInicio() {
        theActorInTheSpotlight().should(seeThat(ValidacionInicioSesion.validacionInicioSesion()));
    }
}
