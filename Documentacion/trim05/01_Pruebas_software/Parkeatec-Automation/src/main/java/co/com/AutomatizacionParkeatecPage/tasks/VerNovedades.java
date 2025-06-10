package co.com.AutomatizacionParkeatecPage.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.waits.WaitUntil;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Novedades.*;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isCurrentlyVisible;

public class VerNovedades implements Task {

    public static VerNovedades verNovedades() { return new VerNovedades(); }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                WaitUntil.the(TITLE_DASH, isCurrentlyVisible()).forNoMoreThan(10).seconds(),
                Click.on(PROFILE_SECTION),
                Click.on(SEE_NEWS)
        );
    }
}
