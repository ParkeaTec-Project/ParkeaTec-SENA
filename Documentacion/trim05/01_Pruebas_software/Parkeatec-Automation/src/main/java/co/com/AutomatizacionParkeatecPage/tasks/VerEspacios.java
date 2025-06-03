package co.com.AutomatizacionParkeatecPage.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Espacios.*;

public class VerEspacios implements Task {

    public static VerEspacios verEspacios() { return new VerEspacios(); }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(PARQUEADERO),
                Click.on(ESPACIOS)
        );
    }
}
