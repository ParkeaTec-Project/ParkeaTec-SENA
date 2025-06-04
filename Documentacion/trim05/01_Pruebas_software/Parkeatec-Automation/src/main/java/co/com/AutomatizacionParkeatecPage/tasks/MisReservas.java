package co.com.AutomatizacionParkeatecPage.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Hit;
import net.serenitybdd.screenplay.waits.Wait;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.openqa.selenium.Keys;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.VerReservas.*;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class MisReservas implements Task {

    public static MisReservas noData(){
        return Tasks.instrumented(MisReservas.class);
    }
    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
                WaitUntil.the(CLICK_PERFIL, isVisible()).forNoMoreThan(8).seconds(),
                Click.on(CLICK_PERFIL),
                Click.on(CLICK_VERRESERVAS)
        );
    }
}
