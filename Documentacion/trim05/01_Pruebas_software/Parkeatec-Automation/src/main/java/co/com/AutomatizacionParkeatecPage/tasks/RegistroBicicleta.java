package co.com.AutomatizacionParkeatecPage.tasks;

//<<<<<<< HEAD
import  co.com.AutomatizacionParkeatecPage.models.InfoBicicleta;
//=======
import co.com.AutomatizacionParkeatecPage.models.InfoBicicleta;
import co.com.AutomatizacionParkeatecPage.utils.hooks.Constantes;
//>>>>>>> a02c9469057b330380e22f0b9e513b72cc73679a
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.*;
import net.serenitybdd.screenplay.waits.WaitUntil;

import java.util.List;
import java.io.File;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Bicicleta.*;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isCurrentlyEnabled;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class RegistroBicicleta implements Task {

    private List<InfoBicicleta> info;

    public RegistroBicicleta(List<InfoBicicleta> info) { this.info = info; }

    public static RegistroBicicleta aute(List<InfoBicicleta> info) {
        return Instrumented.instanceOf(RegistroBicicleta.class).withProperties(info);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        String rutaFirma = new File(Constantes.ruta_firma).getAbsolutePath();
        String rutaDocumento = new File(Constantes.ruta_documento).getAbsolutePath();
        String rutaCarnet = new File(Constantes.ruta_carnet).getAbsolutePath();
        String rutaSerial = new File(Constantes.ruta_serial).getAbsolutePath();
        String rutaVehiculo = new File(Constantes.ruta_bicicleta).getAbsolutePath();

        actor.attemptsTo(
                WaitUntil.the(FORMULARIO, isCurrentlyEnabled()).forNoMoreThan(5).seconds(),
                Click.on(FORMULARIO),
                Click.on(LLENAR_FORMULARIO),
                Scroll.to(VISTA),
                SendKeys.of(rutaFirma).into(INPUT_FIRMA),
                SendKeys.of(rutaDocumento).into(INPUT_DOCUMENTO),
                SendKeys.of(rutaCarnet).into(INPUT_CARNET),
                SelectFromOptions.byVisibleText("Bicicleta").from(SELECT_VEHICULO),
                Scroll.to(BTN_ENVIAR),
                Click.on(INPUT_SERIAL),
                Enter.theValue(info.get(0).getNro_serial()).into(INPUT_SERIAL),
                SendKeys.of(rutaSerial).into(INPUT_FOTO_SERIAL),
                SendKeys.of(rutaVehiculo).into(INPUT_VEHICULO),
                Click.on(INPUT_OBSERVACION),
                Enter.theValue(info.get(0).getObservacion()).into(INPUT_OBSERVACION),
                Click.on(BTN_ENVIAR),
                Scroll.to(PERFIL),
                Click.on(PERFIL),
                Click.on(VEHICULO)
        );
    }
}
