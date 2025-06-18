package co.com.AutomatizacionParkeatecPage.questions;

import co.com.AutomatizacionParkeatecPage.utils.hooks.SesionVariable;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import static jxl.biff.FormatRecord.logger;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Bicicleta.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

import co.com.AutomatizacionParkeatecPage.models.InfoBicicleta;

import java.util.List;

public class ValidacionRegistroBicicleta implements Question<Boolean> {


    public static ValidacionRegistroBicicleta validacionRegistroBicicleta() { return new ValidacionRegistroBicicleta(); }

    @Override
    public Boolean answeredBy(Actor actor) {
        String nroSerial = theActorInTheSpotlight().recall(SesionVariable.nroSerial.toString());
        String nota = theActorInTheSpotlight().recall(SesionVariable.nota.toString());

        try {
            String serial = Text.of(TEXT_SERIAL).viewedBy(actor).asString().replace("Placa: ", "").trim();
            String observacion = Text.of(TEXT_OBSERVACION).viewedBy(actor).asString().replace("Observaciones: ", "").trim();

            /*if (nroSerial.equals(serial) && nota.equals(observacion)) {
                System.out.println("numero seria" + nroSerial);
                System.out.println("observacion" + nota);
            }*/

            return nroSerial.equals(serial) && nota.equals(observacion);
        } catch (Exception e) {
            logger.info("No se encontro la informacion");
            return false;
        }
    }

}
