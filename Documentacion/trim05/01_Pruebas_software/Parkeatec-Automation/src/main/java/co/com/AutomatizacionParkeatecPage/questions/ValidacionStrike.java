package co.com.AutomatizacionParkeatecPage.questions;

import co.com.AutomatizacionParkeatecPage.models.Observacion;
import co.com.AutomatizacionParkeatecPage.utils.hooks.SesionVariable;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import java.util.List;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.GeneraraStrike.NEWS;
import static jxl.biff.FormatRecord.logger;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class ValidacionStrike implements Question<Boolean> {
    private List<Observacion> info;

    public static ValidacionStrike validacionStrike(){ return new ValidacionStrike();}

    @Override

    public Boolean answeredBy (Actor actor){
        try{
            String strike = theActorInTheSpotlight().recall(SesionVariable.mensaje.toString());

            String descripcion = Text.of(NEWS).viewedBy(actor).asString();
            return strike.equals(descripcion);

        } catch (Exception e){
            logger.info("no se encuentra informacion");
            return false;
        }
    }
}
