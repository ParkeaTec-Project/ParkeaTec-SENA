package co.com.AutomatizacionParkeatecPage.tasks;

import co.com.AutomatizacionParkeatecPage.userinterfaces.Moto;
import co.com.AutomatizacionParkeatecPage.utils.hooks.SesionVariable;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.waits.WaitUntil;

import java.util.List;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.VerListaUsuarios.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isCurrentlyEnabled;

public class ListaUsuarios implements Task {

    public static ListaUsuarios noData(){
        return Tasks.instrumented(ListaUsuarios.class);
    }
    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
                WaitUntil.the(Moto.BEGIN, isCurrentlyEnabled()).forNoMoreThan(5).seconds(),
                Click.on(BTN_PERFIL),
                Click.on(BTN_VERUSUARIOS)
        );
    }
}
