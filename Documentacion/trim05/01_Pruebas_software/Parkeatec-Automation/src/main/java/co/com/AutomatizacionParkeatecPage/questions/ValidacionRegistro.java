package co.com.AutomatizacionParkeatecPage.questions;

import co.com.AutomatizacionParkeatecPage.utils.hooks.SesionVariable;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Attribute;
import net.serenitybdd.screenplay.questions.Text;
import static jxl.biff.FormatRecord.logger;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Registro.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class ValidacionRegistro implements Question<Boolean> {

    public static ValidacionRegistro validacionRegistro() { return new ValidacionRegistro(); }

    @Override
    public Boolean answeredBy(Actor actor) {
        String usuario = theActorInTheSpotlight().recall(SesionVariable.nombre.toString());
        String nroDocumento = theActorInTheSpotlight().recall(SesionVariable.documento.toString());
        String email = theActorInTheSpotlight().recall(SesionVariable.correo.toString());

        try {
            String nombre = Attribute.of(INFO_NOMBRE).named("value").viewedBy(actor).asString();
            String documento = Attribute.of(INFO_DOCUMENTO).named("value").viewedBy(actor).asString();
            String correo = Attribute.of(INFO_CORREO).named("value").viewedBy(actor).asString();

            return usuario.equals(nombre) && nroDocumento.equals(documento) && email.equals(correo);
        } catch (Exception e) {
            logger.info("No se encontro la informacion");
            return false;
        }
    }
}
