package co.com.AutomatizacionParkeatecPage.questions;


import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import static jxl.biff.FormatRecord.logger;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Novedades.MY_NEWS;

public class ValidacionVerNovedades implements Question<Boolean> {

    public static ValidacionVerNovedades validacionVerNovedades() { return new ValidacionVerNovedades(); }

    @Override
    public Boolean answeredBy(Actor actor){
        try {
            String novedades = Text.of(MY_NEWS).viewedBy(actor).asString();

            return "Mis novedades".equals(novedades);
        } catch (Exception e){
            logger.info("No se encuentra la pagina");
            return false;
        }
    }
}
