package co.com.AutomatizacionParkeatecPage.tasks;

import co.com.AutomatizacionParkeatecPage.models.FormularioMoto;
import co.com.AutomatizacionParkeatecPage.userinterfaces.VerReservas;
import co.com.AutomatizacionParkeatecPage.utils.hooks.Constantes;
import co.com.AutomatizacionParkeatecPage.utils.hooks.SesionVariable;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import co.com.AutomatizacionParkeatecPage.utils.hooks.Constantes.*;
import net.serenitybdd.screenplay.actions.*;
import net.serenitybdd.screenplay.ensure.Ensure;
import net.serenitybdd.screenplay.waits.Wait;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.openqa.selenium.Keys;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.List;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Bicicleta.INPUT_SERIAL;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Bicicleta.PERFIL;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Moto.*;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Registro.INPUT_FOTO;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.VerReservas.CLICK_PERFIL;
import static co.com.AutomatizacionParkeatecPage.utils.hooks.Constantes.rutaFotoSoat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.*;

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
        String rutaFotoSoat = new File(Constantes.rutaFotoSoat).getAbsolutePath();
        String rutaFotoTecno = new File(Constantes.rutaFotoTecno).getAbsolutePath();
        actor.attemptsTo(
                WaitUntil.the(BEGIN, isCurrentlyEnabled()).forNoMoreThan(5).seconds(),
                Click.on(FORMULARIO),
                Click.on(LLENAR_FORMULARIO),
                Scroll.to(BTN_ENVIAR),
                SendKeys.of(rutaFotoFirmaMoto).into(INPUT_FIRMA),
                SendKeys.of(rutaFotoDocumentoMoto).into(INPUT_DOCUMENTO),
                SendKeys.of(rutaFotoCarnetMoto).into(INPUT_CARNET),
                Click.on(SELECT_VEHICULO),
                Hit.the(Keys.ARROW_DOWN).into(SELECT_VEHICULO),
                Click.on(SELECT_VEHICULO),
                Scroll.to(INPUT_PLACA),
                Click.on(INPUT_PLACA),
                Enter.theValue(formularioMoto.get(0).getPlaca_vehiculo()).into(INPUT_PLACA),
                Click.on(INPUT_MODELO),
                Enter.theValue(formularioMoto.get(0).getModelo()).into(INPUT_MODELO),
                Click.on(INPUT_MARCA),
                Enter.theValue(formularioMoto.get(0).getMarca()).into(INPUT_MARCA),
                Click.on(INPUT_COLOR),
                Enter.theValue(formularioMoto.get(0).getColor()).into(INPUT_COLOR),
                Scroll.to(INPUT_SOAT),
                Click.on(INPUT_SOAT),
                Enter.theValue(formularioMoto.get(0).getVencimiento_soat()).into(INPUT_SOAT),
                Click.on(INPUT_OBSERVACION),
                Enter.theValue(formularioMoto.get(0).getObservacion()).into(INPUT_OBSERVACION),
                Scroll.to(INPUT_LICENCIA),
                SendKeys.of(rutaFotoPlacaMoto).into(INPUT_FOTOPLACA),
                SendKeys.of(rutaFotoMoto).into(INPUT_FOTOVEHICULO),
                SendKeys.of(rutaLicencia).into(INPUT_LICENCIA),
                SendKeys.of(rutaTarjetaProp).into(INPUT_TARPROP),
                SendKeys.of(rutaFotoSoat).into(INPUT_FOTOSOAT),
                SendKeys.of(rutaFotoTecno).into(INPUT_FOTOTECNO),
                Click.on(BTN_ENVIAR),
                Click.on(BTN_CERRAR),
                Scroll.to(SCL_NAV),
                Scroll.to(BTN_PERFIL),
                WaitUntil.the(BTN_PERFIL, isVisible()).forNoMoreThan(20).seconds(),
                Click.on(BTN_PERFIL),
                Click.on(BTN_VEHICULOS)
        );
        theActorInTheSpotlight().remember(SesionVariable.placa.toString(),formularioMoto.get(0).getPlaca_vehiculo());
        theActorInTheSpotlight().remember(SesionVariable.marca.toString(), formularioMoto.get(0).getMarca());
    }
}
