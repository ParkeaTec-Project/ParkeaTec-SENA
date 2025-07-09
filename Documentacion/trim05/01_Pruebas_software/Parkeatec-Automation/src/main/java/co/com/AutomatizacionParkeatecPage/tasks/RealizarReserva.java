package co.com.AutomatizacionParkeatecPage.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.waits.WaitUntil;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Espacios.*;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Moto.BEGIN;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isCurrentlyEnabled;

public class RealizarReserva implements Task {

    public static RealizarReserva realizarReserva(){
        return new RealizarReserva();
    }
    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
                WaitUntil.the(BEGIN, isCurrentlyEnabled()).forNoMoreThan(5).seconds(),
                Click.on(PARQUEADERO),
                Click.on(ESPACIOS),
                Click.on(ESPACIO_1),
                Click.on(BTN_RESERVA),
                Click.on(CERRAR_MODAL),
                Click.on(BTN_PERFIL),
                Click.on(BTN_VERRESERVA),
                Click.on(BTN_CANCELARRESERVA)
        );
    }
}
