package co.com.AutomatizacionParkeatecPage.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Bicicleta.*;

public class EliminarVehiculo implements Task {

    public static EliminarVehiculo eliminarVehiculo() { return new EliminarVehiculo(); }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
            Click.on(BTN_BORRAR),
            Click.on(MODAL_BORRAR)
        );
    }
}
