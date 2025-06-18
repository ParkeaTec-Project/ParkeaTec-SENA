package co.com.AutomatizacionParkeatecPage.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Vehiculo.*;

public class VerVehiculo implements Task {

    public static VerVehiculo verVehiculo() { return new VerVehiculo(); }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(CLICK_PERFIL),
                Click.on(CLICK_VEHICULO)
        );
    }
}
