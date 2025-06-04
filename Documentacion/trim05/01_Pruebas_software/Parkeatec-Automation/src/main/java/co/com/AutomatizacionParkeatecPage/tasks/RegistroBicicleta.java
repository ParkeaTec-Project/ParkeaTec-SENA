package co.com.AutomatizacionParkeatecPage.tasks;

import  co.com.AutomatizacionParkeatecPage.models.InfoBicicleta;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.*;

import java.util.List;
import java.nio.file.Path;
import java.nio.file.Paths;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Bicicleta.*;

public class RegistroBicicleta implements Task {

    private List<InfoBicicleta> info;

    public RegistroBicicleta(List<InfoBicicleta> info) { this.info = info; }

    public static RegistroBicicleta aute(List<InfoBicicleta> info) {
        return Instrumented.instanceOf(RegistroBicicleta.class).withProperties(info);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        String rutaFotoFirma = info.get(0).getFirma_usuario();
        Path pathFotoFirma = Paths.get(rutaFotoFirma).toAbsolutePath();

        String rutaFotoDocumento = info.get(0).getFoto_documento();
        Path pathFotoDocumento = Paths.get(rutaFotoDocumento).toAbsolutePath();

        String rutaFotoCarnet = info.get(0).getFoto_carnet();
        Path pathFotoCarnet = Paths.get(rutaFotoCarnet).toAbsolutePath();

        String rutaFotoSerial = info.get(0).getFoto_serial();
        Path pathFotoSerial = Paths.get(rutaFotoSerial).toAbsolutePath();

        String rutaFotoVehiculo = info.get(0).getFoto_vehiculo();
        Path pathFotoVehiculo = Paths.get(rutaFotoVehiculo).toAbsolutePath();

        actor.attemptsTo(
                Click.on(FORMULARIO)
                /*Click.on(LLENAR_FORMULARIO),
                Upload.theFile(Paths.get(pathFotoFirma.toString())).to(INPUT_FIRMA),
                Upload.theFile(Paths.get(pathFotoDocumento.toString())).to(INPUT_DOCUMENTO),
                Upload.theFile(Paths.get(pathFotoCarnet.toString())).to(INPUT_CARNET),
                SelectFromOptions.byVisibleText("Bicicleta").from(SELECT_VEHICULO),
                Scroll.to(VISTA),
                Click.on(INPUT_SERIAL),
                Enter.theValue(info.get(0).getNro_serial()).into(INPUT_SERIAL),
                Upload.theFile(Paths.get(pathFotoSerial.toString())).to(INPUT_FOTO_SERIAL),
                Upload.theFile(Paths.get(pathFotoVehiculo.toString())).to(INPUT_VEHICULO),
                Click.on(INPUT_OBSERVACION),
                Enter.theValue(info.get(0).getObservacion()).into(INPUT_OBSERVACION),
                Click.on(BTN_ENVIAR)*/


        );
    }
}
