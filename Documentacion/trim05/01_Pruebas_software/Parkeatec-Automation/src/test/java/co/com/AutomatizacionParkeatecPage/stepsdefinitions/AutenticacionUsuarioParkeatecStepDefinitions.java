package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.models.CredencialesInicioSesion;
import co.com.AutomatizacionParkeatecPage.questions.ValidacionInicioSesion;
import  co.com.AutomatizacionParkeatecPage.tasks.AbrirPagina;
import co.com.AutomatizacionParkeatecPage.tasks.AutenticarseUsuario;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class AutenticacionUsuarioParkeatecStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina de inicio de sesion de Parkeatec$")
    public void queElUsuarioSeEncuentraEnLaPaginaDeInicioDeSesionDeParkeatec() {
        theActorInTheSpotlight().wasAbleTo(AbrirPagina.laPagina());
    }


    @Cuando("^ingrese las credenciales de usuario correctas \\(usuario y contrasena\\)$")
    public void ingreseLasCredencialesDeUsuarioCorrectasUsuarioYContrasena(List<CredencialesInicioSesion> credenciales) {
        theActorInTheSpotlight().attemptsTo(AutenticarseUsuario.aute(credenciales));
    }

    @Entonces("^se debe verificar que el usuario haya sido autenticado correctamente y redirigido a su pagina de inicio\\.$")
    public void seDebeVerificarQueElUsuarioHayaSidoAutenticadoCorrectamenteYRedirigidoASuPaginaDeInicio() {
        theActorInTheSpotlight().should(seeThat(ValidacionInicioSesion.validacionInicioSesion()));
    }
}
