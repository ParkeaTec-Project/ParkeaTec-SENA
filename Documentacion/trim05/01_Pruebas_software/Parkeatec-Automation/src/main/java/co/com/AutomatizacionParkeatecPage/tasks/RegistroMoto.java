package co.com.AutomatizacionParkeatecPage.tasks;

import co.com.AutomatizacionParkeatecPage.models.FormularioMoto;
import co.com.AutomatizacionParkeatecPage.utils.hooks.Constantes;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import co.com.AutomatizacionParkeatecPage.utils.hooks.Constantes.*;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Hit;
import net.serenitybdd.screenplay.actions.SendKeys;
import net.serenitybdd.screenplay.waits.Wait;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.openqa.selenium.Keys;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.List;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Moto.*;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Registro.INPUT_FOTO;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.VerReservas.CLICK_PERFIL;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isCurrentlyEnabled;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class RegistroMoto implements Task {

    private List<FormularioMoto> formularioMoto;

    public RegistroMoto(List<FormularioMoto> formularioMoto) {this.formularioMoto = formularioMoto;}

    public static RegistroMoto aute(List<FormularioMoto> formularioMoto){
        return Instrumented.instanceOf(RegistroMoto.class).withProperties(formularioMoto);
    }
    @Override
    public <T extends Actor> void performAs(T actor){

        String rutaFotoFirmaMoto = new File(Constantes.rutaFotoFirmaMoto).getAbsolutePath();
        String rutaFotoMoto = new File(Constantes.rutaFotoMoto).getAbsolutePath();
        String rutaFotoDocumentoMoto = new File(Constantes.rutaFotoDocumentoMoto).getAbsolutePath();
        String rutaFotoCarnetMoto = new File(Constantes.rutaFotoCarnetMoto).getAbsolutePath();
        String rutaFotoPlacaMoto = new File(Constantes.rutaFotoPlacaMoto).getAbsolutePath();
        String rutaLicencia = new File(Constantes.rutaLicencia).getAbsolutePath();
        String rutaTarjetaProp = new File(Constantes.rutaTarjetaProp).getAbsolutePath();
        String rutaFotoTecno = new File(Constantes.rutaFotoTecno).getAbsolutePath();
        actor.attemptsTo(
                WaitUntil.the(FORMULARIO, isCurrentlyEnabled()).forNoMoreThan(5).seconds(),
                Click.on(FORMULARIO),
                Click.on(LLENAR_FORMULARIO),
                SendKeys.of(rutaFotoFirmaMoto).into(INPUT_FIRMA),
                SendKeys.of(rutaFotoDocumentoMoto).into(INPUT_DOCUMENTO),
                SendKeys.of(rutaFotoCarnetMoto).into(INPUT_CARNET),
                Click.on(SELECT_VEHICULO),
                Hit.the(Keys.ARROW_DOWN).into(SELECT_VEHICULO)


        );
    }
}
