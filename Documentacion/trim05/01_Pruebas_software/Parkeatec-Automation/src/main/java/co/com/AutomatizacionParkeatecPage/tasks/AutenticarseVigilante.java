package co.com.AutomatizacionParkeatecPage.tasks;

import co.com.AutomatizacionParkeatecPage.models.CredencialesInicioSesion;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import java.util.List;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.AutenticacionUsuario.*;

public class AutenticarseVigilante implements Task {

    private List<CredencialesInicioSesion> credenciales;

    public AutenticarseVigilante(List<CredencialesInicioSesion> credenciales) { this.credenciales = credenciales; }

    public static AutenticarseVigilante aute(List<CredencialesInicioSesion> credenciales) {
        return Instrumented.instanceOf(AutenticarseVigilante.class).withProperties(credenciales);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(INPUT_USUARIO),
                Enter.theValue(credenciales.get(0).getUsuario()).into(INPUT_USUARIO),
                Click.on(INPUT_CLAVE),
                Enter.theValue(credenciales.get(0).getClave()).into(INPUT_CLAVE),
                Click.on(BTN_SUCCESS)
        );
    }
}
