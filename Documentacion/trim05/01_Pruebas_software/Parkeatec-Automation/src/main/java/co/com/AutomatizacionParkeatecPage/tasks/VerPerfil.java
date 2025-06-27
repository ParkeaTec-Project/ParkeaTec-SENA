package co.com.AutomatizacionParkeatecPage.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.waits.WaitUntil;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Moto.BEGIN;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Perfil.*;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isCurrentlyEnabled;

public class VerPerfil implements Task {

    public static VerPerfil verPerfil() { return new VerPerfil(); }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                WaitUntil.the(BEGIN, isCurrentlyEnabled()).forNoMoreThan(5).seconds(),
                Click.on(CLICK_PERFIL),
                Click.on(VER_PERFIL)
        );
    }

}
