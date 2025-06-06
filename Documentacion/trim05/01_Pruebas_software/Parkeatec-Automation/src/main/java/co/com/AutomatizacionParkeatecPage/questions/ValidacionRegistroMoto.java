package co.com.AutomatizacionParkeatecPage.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Moto.*;
import static jxl.biff.FormatRecord.logger;


public class ValidacionRegistroMoto implements Question<Boolean> {

    public static ValidacionRegistroMoto validacionRegistroMoto(){
        return new ValidacionRegistroMoto();
    }

    @Override
    public Boolean answeredBy (Actor actor){
        try{
            String VLDPLACA = Text.of(VALIDAR_PLACA).viewedBy(actor).asString();
            String VLDMARCA = Text.of(VALIDAR_MARCA).viewedBy(actor).asString();
            return "Placa: CBI23H".equals(VLDPLACA) && "Marca: TVS".equals(VLDMARCA);
        }
        catch (Exception e){
            logger.info("Ha ocurrido algo inesperado");
            return false;
        }
    }
}
