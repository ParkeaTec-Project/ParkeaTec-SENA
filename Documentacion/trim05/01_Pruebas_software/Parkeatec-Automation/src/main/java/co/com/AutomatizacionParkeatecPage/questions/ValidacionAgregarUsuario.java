package co.com.AutomatizacionParkeatecPage.questions;

import co.com.AutomatizacionParkeatecPage.utils.hooks.SesionVariable;
import co.com.AutomatizacionParkeatecPage.utils.hooks.VariableUsuario;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Usuario.*;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static jxl.biff.FormatRecord.logger;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class ValidacionAgregarUsuario implements Question<Boolean> {

    public static ValidacionAgregarUsuario validacionAgregarUsuario() { return new ValidacionAgregarUsuario(); }

    @Override
    public Boolean answeredBy(Actor actor) {
        String usuario = theActorInTheSpotlight().recall(VariableUsuario.nombre.toString());
        String nroDocumento = theActorInTheSpotlight().recall(VariableUsuario.apellido.toString());
        String email = theActorInTheSpotlight().recall(VariableUsuario.correo.toString());
        try {
            String nombre = Text.of(NOMBRE).viewedBy(actor).asString();
            String documento = Text.of(APELLIDO).viewedBy(actor).asString();
            String correo = Text.of(CORREO).viewedBy(actor).asString();

            return usuario.equals(nombre) && nroDocumento.equals(documento) && email.equals(correo);

        } catch (Exception e) {
            logger.info("No se encontro la informacion");
            return false;
        }
    }
}
