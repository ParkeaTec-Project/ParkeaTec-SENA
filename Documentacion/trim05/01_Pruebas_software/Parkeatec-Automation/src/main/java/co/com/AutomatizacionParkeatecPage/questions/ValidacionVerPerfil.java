package co.com.AutomatizacionParkeatecPage.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Attribute;
import net.serenitybdd.screenplay.questions.Text;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Perfil.*;
import static jxl.biff.FormatRecord.logger;

public class ValidacionVerPerfil implements Question<Boolean> {

    public static ValidacionVerPerfil validacionVerPerfil() { return new ValidacionVerPerfil(); }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto_perfil = Text.of(TEXTO_PERFIL).viewedBy(actor).asString();
            String codigoQr = Attribute.of(QR).named("alt").viewedBy(actor).asString();

            return texto_perfil.equals("Informacion del perfil") && codigoQr.equals("Codigo QR del usuario");
        } catch (Exception e) {
            logger.info("No se encontro la informacion");
            return false;
        }
    }

}
