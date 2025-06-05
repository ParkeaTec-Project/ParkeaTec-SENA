package co.com.AutomatizacionParkeatecPage.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import static jxl.biff.FormatRecord.logger;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Bicicleta.*;
import co.com.AutomatizacionParkeatecPage.models.InfoBicicleta;

import java.util.List;

public class ValidacionRegistroBicicleta implements Question<Boolean> {

    private List<InfoBicicleta> info;

    public static ValidacionRegistroBicicleta validacionRegistroBicicleta() { return new ValidacionRegistroBicicleta(); }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String serial = Text.of(TEXT_SERIAL).viewedBy(actor).asString();
            String observacion = Text.of(TEXT_OBSERVACION).viewedBy(actor).asString();

            return "123456ABC".equals(serial);
            //return "123456ABC".equals(serial) && "ninguna".equals(observacion);
            //return info.get(0).getNro_serial().equals(serial) && info.get(0).getObservacion().equals(observacion);
        } catch (Exception e) {
            logger.info("No se encontro la informacion");
            return false;
        }
    }

}
