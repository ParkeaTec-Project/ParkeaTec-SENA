package co.com.AutomatizacionParkeatecPage.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import static jxl.biff.FormatRecord.logger;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Espacios.*;

public class ValidacionEspacios implements Question<Boolean> {

    public static ValidacionEspacios validacionEspacios() { return new ValidacionEspacios(); }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String espacio_1 = Text.of(ESPACIO_1).viewedBy(actor).asString();
            String espacio_2 = Text.of(ESPACIO_2).viewedBy(actor).asString();
            String espacio_3 = Text.of(ESPACIO_3).viewedBy(actor).asString();

            return "A1".equals(espacio_1) && "A2".equals(espacio_2) && "A3".equals(espacio_3);
        } catch (Exception e) {
            logger.info("No se encontraron los espacios");
            return false;
        }
    }
}
