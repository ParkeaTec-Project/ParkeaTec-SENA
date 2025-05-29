package co.com.AutomatizacionParkeatecPage.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import static jxl.biff.FormatRecord.logger;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.AutenticacionUsuario.*;

public class ValidacionInicioSesion implements Question<Boolean> {

    public static ValidacionInicioSesion validacionInicioSesion() { return new ValidacionInicioSesion(); }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto = Text.of(MENSAJE_BIENVENIDA).viewedBy(actor).asString();
            return "Perfil".equals(texto);
        } catch (Exception e) {
            logger.info("No se encontro el texto");
            return false;
        }
    }
}
