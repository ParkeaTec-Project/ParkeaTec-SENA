package co.com.AutomatizacionParkeatecPage.tasks;

import co.com.AutomatizacionParkeatecPage.models.InfoRegistro;

import static co.com.AutomatizacionParkeatecPage.userinterfaces.AutenticacionUsuario.CERRAR_MODAL;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Registro.*;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.AutenticacionUsuario.*;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Bicicleta.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isCurrentlyEnabled;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

import co.com.AutomatizacionParkeatecPage.utils.hooks.Constantes;

import co.com.AutomatizacionParkeatecPage.utils.hooks.SesionVariable;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.*;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.apache.commons.lang3.RandomStringUtils;

import java.util.List;

import java.io.File;

public class RegistroUsuario implements Task {

    private List<InfoRegistro> info;

    public RegistroUsuario(List<InfoRegistro> info) {
        this.info = info;
    }

    public static RegistroUsuario aute(List<InfoRegistro> info) {
        return Instrumented.instanceOf(RegistroUsuario.class).withProperties(info);
    }

    String correo = RandomStringUtils.random(2, true, false);
    String gmail = "@gmail.com";
    String documento = RandomStringUtils.random(2, false, true);

    @Override
    public <T extends Actor> void performAs(T actor) {
        System.out.println(info.get(0).getCorreo_electronico() + correo + gmail);
        String dominio = info.get(0).getCorreo_electronico() + correo + gmail;
        System.out.println("prueba dominio" + dominio);
        String rutaAbsoluta = new File(Constantes.ruta_foto).getAbsolutePath();
        actor.attemptsTo(
                Click.on(REGISTRO),
                Click.on(INPUT_NOMBRE),
                Enter.theValue(info.get(0).getNombre()).into(INPUT_NOMBRE),
                Click.on(INPUT_APELLIDO),
                Enter.theValue(info.get(0).getApellido()).into(INPUT_APELLIDO),
                Click.on(INPUT_CORREO),
                Enter.theValue(dominio).into(INPUT_CORREO),
                Click.on(INPUT_PASSWORD),
                Enter.theValue(info.get(0).getContrasena()).into(INPUT_PASSWORD),
                Click.on(INPUT_TELEFONO),
                Enter.theValue(info.get(0).getTelefono()).into(INPUT_TELEFONO),
                Click.on(INPUT_DIRECCION),
                Enter.theValue(info.get(0).getDireccion()).into(INPUT_DIRECCION),
                Click.on(SELECT_TIPO_DOCUMENTO),
                SelectFromOptions.byVisibleText("Cedula de ciudadania").from(SELECT_TIPO_DOCUMENTO),
                Click.on(INPUT_NUMERO_DOCUMENTO),
                Enter.theValue(info.get(0).getNumero_documento() + documento).into(INPUT_NUMERO_DOCUMENTO),
                SendKeys.of(rutaAbsoluta).into(INPUT_FOTO),
                Scroll.to(BTN_SUCCESS),
                Click.on(SELECT_CENTRO),
                SelectFromOptions.byVisibleText("CEET").from(SELECT_CENTRO),
                Click.on(INPUT_FICHA),
                Enter.theValue(info.get(0).getFicha_aprendiz()).into(INPUT_FICHA),
                Click.on(BTN_REGISTRO),
                Click.on(CERRAR_MODAL_REGISTRO),
                Scroll.to(MENU),
                Scroll.to(LOGIN),
                WaitUntil.the(LOGIN, isVisible()).forNoMoreThan(5).seconds(),
                Click.on(LOGIN),
                Click.on(INPUT_USUARIO),
                Enter.theValue(dominio).into(INPUT_USUARIO),
                Click.on(INPUT_CLAVE),
                Enter.theValue(info.get(0).getContrasena()).into(INPUT_CLAVE),
                Click.on(BTN_SUCCESS),
                Click.on(CERRAR_MODAL),
                WaitUntil.the(TITLE_DASH, isVisible()).forNoMoreThan(5).seconds(),
                Click.on(PERFIL),
                Click.on(VER_PERFIL),
                WaitUntil.the(INFO_NOMBRE, isVisible()).forNoMoreThan(10).seconds()
        );


        theActorInTheSpotlight().remember(SesionVariable.nombre.toString(), info.get(0).getNombre());
        theActorInTheSpotlight().remember(SesionVariable.documento.toString(), info.get(0).getNumero_documento() + documento);
        theActorInTheSpotlight().remember(SesionVariable.correo.toString(), dominio);
    }
}
