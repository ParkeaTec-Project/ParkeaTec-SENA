package co.com.AutomatizacionParkeatecPage.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Perfil.*;

public class VerPerfil implements Task {

    public static VerPerfil verPerfil() { return new VerPerfil(); }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(CLICK_PERFIL),
                Click.on(VER_PERFIL)
        );
    }

}
