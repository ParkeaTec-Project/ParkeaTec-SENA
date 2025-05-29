package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class AutenticacionUsuario extends PageObject {

    public static Target INPUT_USUARIO = Target.the("Ingreso del usuario").located(By.xpath("//*[@id=\"email\"]"));

    public static Target INPUT_CLAVE = Target.the("Ingreso del password").located(By.xpath("//*[@id=\"password\"]"));

    public static Target BTN_SUCCESS = Target.the("Click btn success").located(By.xpath("//*[@id=\"root\"]/div/form/button"));

    public static Target MENSAJE_BIENVENIDA = Target.the("lista de trabajo").locatedBy("//a[text()='Perfil']");


}
