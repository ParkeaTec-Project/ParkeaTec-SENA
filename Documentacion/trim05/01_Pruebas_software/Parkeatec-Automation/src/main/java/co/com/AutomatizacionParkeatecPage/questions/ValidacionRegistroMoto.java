package co.com.AutomatizacionParkeatecPage.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import static jxl.biff.FormatRecord.logger;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Moto.MSG_REGISTRO;


public class ValidacionRegistroMoto implements Question<Boolean> {

    public static ValidacionRegistroMoto validacionRegistroMoto(){
        return new ValidacionRegistroMoto();
    }

    @Override
    public Boolean answeredBy (Actor actor){
        try{
            String registroMoto = Text.of(MSG_REGISTRO).viewedBy(actor).asString();
            return "Vehiculo registrado".equals(registroMoto);
        }
        catch (Exception e){
            logger.info("Ha ocurrido algo inesperado");
            return false;
        }
    }
}
