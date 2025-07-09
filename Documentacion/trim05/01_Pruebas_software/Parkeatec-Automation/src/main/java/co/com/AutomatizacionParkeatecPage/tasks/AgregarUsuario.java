package co.com.AutomatizacionParkeatecPage.tasks;

import co.com.AutomatizacionParkeatecPage.utils.hooks.Constantes;


import static co.com.AutomatizacionParkeatecPage.userinterfaces.Bicicleta.TITLE_DASH;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Moto.BEGIN;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Registro.INPUT_FOTO;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Usuario.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.*;


import co.com.AutomatizacionParkeatecPage.utils.hooks.VariableUsuario;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import co.com.AutomatizacionParkeatecPage.models.InfoUsuario;
import net.serenitybdd.screenplay.actions.*;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.apache.commons.lang3.RandomStringUtils;

import java.io.File;
import java.util.List;

public class AgregarUsuario implements Task {

    private List<InfoUsuario> info;

    public AgregarUsuario(List<InfoUsuario> info) { this.info = info; }

    public static AgregarUsuario aute(List<InfoUsuario> info) {
        return Instrumented.instanceOf(AgregarUsuario.class).withProperties(info);
    }

    String correo = RandomStringUtils.random(2, true, false);

    String gmail = "@gmail.com";

    String documento = RandomStringUtils.random(2, false, true);

    String rutaAbsoluta = new File(Constantes.ruta_foto).getAbsolutePath();

    String dominio = info.get(0).getCorreo() + correo + gmail;

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                WaitUntil.the(BEGIN, isCurrentlyEnabled()).forNoMoreThan(5).seconds(),
                Click.on(CLICK_PERFIL),
                Click.on(CLICK_USUARIOS),
                Scroll.to(BTN_CREAR),
                Scroll.to(TEXTO_REGISTRO),
                Click.on(INPUT_DOCUMENTO),
                Enter.theValue(info.get(0).getDocumento() + documento).into(INPUT_DOCUMENTO),
                Click.on(INPUT_NOMBRE),
                Enter.theValue(info.get(0).getNombre()).into(INPUT_NOMBRE),
                Click.on(INPUT_APELLIDO),
                Enter.theValue(info.get(0).getApellido()).into(INPUT_APELLIDO),
                Click.on(INPUT_TELEFONO),
                Enter.theValue(info.get(0).getTelefono()).into(INPUT_TELEFONO),
                Click.on(INPUT_DIRECCION),
                Enter.theValue(info.get(0).getDireccion()).into(INPUT_DIRECCION),
                Click.on(INPUT_CORREO),
                Enter.theValue(dominio).into(INPUT_CORREO),
                Click.on(INPUT_PASSWORD),
                Enter.theValue(info.get(0).getPassword()).into(INPUT_PASSWORD),
                SendKeys.of(rutaAbsoluta).into(INPUT_FOTO),
                Click.on(INPUT_CENTRO),
                Enter.theValue(info.get(0).getCentro_formacion()).into(INPUT_CENTRO),
                SelectFromOptions.byVisibleText("Cedula de ciudadania").from(SELECT_DOCUMENTO),
                Scroll.to(BTN_REGISTRO),
                SelectFromOptions.byVisibleText("Administrador").from(SELECT_ROL),
                Click.on(BTN_REGISTRO),
                Click.on(MODAL_REGISTRO),
                Scroll.to(CLICK_PERFIL),
                Click.on(CLICK_PERFIL),
                Click.on(CLICK_USUARIOS)
        );

        theActorInTheSpotlight().remember(VariableUsuario.nombre.toString(), info.get(0).getNombre());
        theActorInTheSpotlight().remember(VariableUsuario.apellido.toString(), info.get(0).getApellido());
        theActorInTheSpotlight().remember(VariableUsuario.correo.toString(), dominio);
    }
}
