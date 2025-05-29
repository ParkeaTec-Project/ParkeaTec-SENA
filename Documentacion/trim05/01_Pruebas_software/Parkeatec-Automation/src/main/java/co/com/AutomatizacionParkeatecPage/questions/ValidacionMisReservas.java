package co.com.AutomatizacionParkeatecPage.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import static jxl.biff.FormatRecord.logger;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.VerReservas.VALIDACION_PAGRESERVA;

public class ValidacionMisReservas implements Question<Boolean> {

    public static ValidacionMisReservas validacionMisReservas(){
        return new ValidacionMisReservas();
    }
    @Override
    public Boolean answeredBy(Actor actor){
        try{
            String texto = Text.of(VALIDACION_PAGRESERVA).viewedBy(actor).asString();
            return "Activa".equals(texto);
        }catch (Exception e){
            logger.info("Algo salió mal");
            return false;
        }
    }
}
