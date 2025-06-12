package co.com.AutomatizacionParkeatecPage.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.VerListaUsuarios.*;
import static jxl.biff.FormatRecord.logger;

public class ValidacionVerUsuarios implements Question<Boolean> {

    public static ValidacionVerUsuarios validacionVerUsuarios(){
        return new ValidacionVerUsuarios();
    }
    @Override
    public Boolean answeredBy(Actor actor){
        try{
            String correo = Text.of(VALIDACION_CORREO).viewedBy(actor).asString();
            String rol = Text.of(VALIDACION_ROL).viewedBy(actor).asString();
            String apellido = Text.of(VALIDACION_APELLIDO).viewedBy(actor).asString();
            return "k".equals(apellido) && "admin".equals(rol) && "k@gmail.com".equals(correo);
        }catch (Exception e){
            logger.info("Algo salió mal");
            return false;
        }
    }
}
