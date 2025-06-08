package co.com.AutomatizacionParkeatecPage.questions;

import co.com.AutomatizacionParkeatecPage.utils.hooks.SesionVariable;
import cucumber.api.java.eo.Se;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.questions.Attribute;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import org.w3c.dom.Attr;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.Moto.*;
import static jxl.biff.FormatRecord.logger;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;


public class ValidacionRegistroMoto implements Question<Boolean> {

    public static ValidacionRegistroMoto validacionRegistroMoto(){
        return new ValidacionRegistroMoto();
    }

    @Override
    public Boolean answeredBy (Actor actor){
        String placa = theActorInTheSpotlight().recall(SesionVariable.placa.toString());
        String marca = theActorInTheSpotlight().recall(SesionVariable.marca.toString());


        try{

            //String placa_moto = Attribute.of(VALIDAR_PLACA).named("value").viewedBy(actor).asString();
            //String marca_moto = Attribute.of(VALIDAR_MARCA).named("value").viewedBy(actor).asString();
            String VLDPLACA = Text.of(VALIDAR_PLACA).viewedBy(actor).asString().replace("Placa: ", "").trim();
            String VLDMARCA = Text.of(VALIDAR_MARCA).viewedBy(actor).asString().replace("Marca: ", "").trim();
            return placa.equals(VLDPLACA) && marca.equals(VLDMARCA);

            //return placa.equals(placa_moto) && marca.equals(marca_moto);
        }
        catch (Exception e){
            logger.info("Ha ocurrido algo inesperado");
            return false;
        }
    }
}
