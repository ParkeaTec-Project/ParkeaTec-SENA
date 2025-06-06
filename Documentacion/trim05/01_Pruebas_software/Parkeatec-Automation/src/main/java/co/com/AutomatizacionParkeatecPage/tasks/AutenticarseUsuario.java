package co.com.AutomatizacionParkeatecPage.tasks;

import co.com.AutomatizacionParkeatecPage.models.CredencialesInicioSesion;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.waits.Wait;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.AutenticacionUsuario.*;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Bicicleta.DASHBOARD;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;
import static net.serenitybdd.screenplay.waits.WaitUntil.the;

public class AutenticarseUsuario implements Task {

    private List<CredencialesInicioSesion> credenciales;

    public AutenticarseUsuario(List<CredencialesInicioSesion> credenciales) { this.credenciales = credenciales; }

    public static AutenticarseUsuario aute(List<CredencialesInicioSesion> credenciales) {
        return Instrumented.instanceOf(AutenticarseUsuario.class).withProperties(credenciales);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(INPUT_USUARIO),
                Enter.theValue(credenciales.get(0).getUsuario()).into(INPUT_USUARIO),
                Click.on(INPUT_CLAVE),
                Enter.theValue(credenciales.get(0).getClave()).into(INPUT_CLAVE),
                Click.on(BTN_SUCCESS),
                Click.on(CERRAR_MODAL)


        );
    }
}
