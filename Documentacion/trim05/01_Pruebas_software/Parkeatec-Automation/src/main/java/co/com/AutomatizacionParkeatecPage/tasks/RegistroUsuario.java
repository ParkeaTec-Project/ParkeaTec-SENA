package co.com.AutomatizacionParkeatecPage.tasks;

import co.com.AutomatizacionParkeatecPage.models.InfoRegistro;
import static co.com.AutomatizacionParkeatecPage.userinterfaces.Registro.*;
import co.com.AutomatizacionParkeatecPage.utils.hooks.Constantes;

import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.*;

import java.nio.file.Path;
import java.nio.file.Paths;

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

    @Override
    public <T extends Actor> void performAs(T actor) {

        String rutaAbsoluta = new File(Constantes.ruta_foto).getAbsolutePath();
        actor.attemptsTo(
                Click.on(REGISTRO),
                Click.on(INPUT_NOMBRE),
                Enter.theValue(info.get(0).getNombre()).into(INPUT_NOMBRE),
                Click.on(INPUT_APELLIDO),
                Enter.theValue(info.get(0).getApellido()).into(INPUT_APELLIDO),
                Click.on(INPUT_CORREO),
                Enter.theValue(info.get(0).getCorreo_electronico()).into(INPUT_CORREO),
                Click.on(INPUT_PASSWORD),
                Enter.theValue(info.get(0).getContrasena()).into(INPUT_PASSWORD),
                Click.on(INPUT_TELEFONO),
                Enter.theValue(info.get(0).getTelefono()).into(INPUT_TELEFONO),
                Click.on(INPUT_DIRECCION),
                Enter.theValue(info.get(0).getDireccion()).into(INPUT_DIRECCION),
                Click.on(SELECT_TIPO_DOCUMENTO),
                SelectFromOptions.byVisibleText("Cedula de ciudadania").from(SELECT_TIPO_DOCUMENTO),
                Click.on(INPUT_NUMERO_DOCUMENTO),
                Enter.theValue(info.get(0).getNumero_documento()).into(INPUT_NUMERO_DOCUMENTO),
                Scroll.to(FORM),
                SendKeys.of(rutaAbsoluta).into(INPUT_FOTO),
                //Upload.theFile(Paths.get(pathFoto.toString())).to(INPUT_FOTO),

                Click.on(SELECT_CENTRO),
                SelectFromOptions.byVisibleText("CEET").from(SELECT_CENTRO),
                Click.on(INPUT_FICHA),
                Scroll.to(FORM),
                Enter.theValue(info.get(0).getFicha_aprendiz()).into(INPUT_FICHA),
                Scroll.to(FORM),
                Click.on(BTN_REGISTRO)
        );
    }
}
