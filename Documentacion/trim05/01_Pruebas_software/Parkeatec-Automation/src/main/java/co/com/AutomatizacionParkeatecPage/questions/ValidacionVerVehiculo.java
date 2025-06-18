package co.com.AutomatizacionParkeatecPage.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Attribute;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Vehiculo.*;
import static jxl.biff.FormatRecord.logger;

public class ValidacionVerVehiculo implements Question<Boolean> {

    public static ValidacionVerVehiculo validacionVerVehiculo() { return new ValidacionVerVehiculo(); }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto_vehiculo = Text.of(TEXTO_VEHICULO).viewedBy(actor).asString();
            String texto_btn = Text.of(BTN_VEHICULO).viewedBy(actor).asString();
            String img_vehiculo = Attribute.of(IMG_VEHICULO).named("alt").viewedBy(actor).asString();

            return texto_vehiculo.equals("Tu vehiculo") && texto_btn.equals("Actualizar vehiculo") && img_vehiculo.equals("Foto del vehiculo");
        } catch (Exception e) {
            logger.info("No se encontro la informacion");
            return false;
        }

    }
}
