package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.models.InfoRegistro;
import co.com.AutomatizacionParkeatecPage.questions.ValidacionInicioSesion;
import co.com.AutomatizacionParkeatecPage.tasks.AbrirPagina;
import co.com.AutomatizacionParkeatecPage.tasks.RegistroUsuario;
import cucumber.api.DataTable;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;


public class RegistroParkeatecStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina de registro de Parkeatec$")
    public void queElUsuarioSeEncuentraEnLaPaginaDeRegistroDeParkeatec() {
        theActorInTheSpotlight().wasAbleTo(AbrirPagina.laPagina());
    }


    @Cuando("^ingrese la informacion del formulario correctamente$")
    public void ingreseLaInformacionDelFormularioCorrectamente(List<InfoRegistro> info) {
        theActorInTheSpotlight().attemptsTo(RegistroUsuario.aute(info));
    }

    @Entonces("^se debe verificar que la informacion del usuario haya sido registrada correctamente y redirigido a su pagina de inicio\\.$")
    public void seDebeVerificarQueLaInformacionDelUsuarioHayaSidoRegistradaCorrectamenteYRedirigidoASuPaginaDeInicio() {
        theActorInTheSpotlight().should(seeThat(ValidacionInicioSesion.validacionInicioSesion()));
    }
}
