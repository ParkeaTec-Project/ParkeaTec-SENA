package co.com.AutomatizacionParkeatecPage.tasks;

import co.com.AutomatizacionParkeatecPage.models.Observacion;
import co.com.AutomatizacionParkeatecPage.utils.hooks.SesionVariable;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Performable;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.DriverTask;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.GeneraraStrike.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isCurrentlyVisible;

import java.util.List;


public class RegistrarStrike implements Task {
    public static Performable toAlert(){
        return new DriverTask(driver ->driver.switchTo().alert().accept());
    }
    private List<Observacion> info;
    public RegistrarStrike(List<Observacion> info){this.info = info;}
    public static RegistrarStrike aute(List<Observacion> info) { return Instrumented.instanceOf(RegistrarStrike.class).withProperties(info);}

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
                WaitUntil.the(TITLE_DASH, isCurrentlyVisible()).forNoMoreThan(10).seconds(),
                Click.on(PARKING_LOT),
                Click.on(SEE_PARKING),
                Click.on(CLOSE_MODAL),
                Click.on(SELECT_PARKING),
                Click.on(REGISTER_NEWS),
                Click.on(INPUT_NEWS),
                Enter.theValue(info.get(0).getMensaje()).into(INPUT_NEWS),
                Click.on(SEND_NEWS),
                toAlert(),
                Click.on(VIEW_PROFILE),
                Click.on(VIEW_NEWS)
        );
        theActorInTheSpotlight().remember(SesionVariable.mensaje.toString(),info.get(0).getMensaje());
    }
}
