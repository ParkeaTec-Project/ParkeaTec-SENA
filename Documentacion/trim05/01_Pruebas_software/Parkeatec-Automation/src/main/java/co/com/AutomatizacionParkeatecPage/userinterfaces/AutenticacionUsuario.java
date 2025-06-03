package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class AutenticacionUsuario extends PageObject {

    public static Target INPUT_USUARIO = Target.the("Ingreso del usuario").located(By.xpath("//*[@id=\"email\"]"));

    public static Target INPUT_CLAVE = Target.the("Ingreso del password").located(By.xpath("//*[@id=\"password\"]"));

    public static Target BTN_SUCCESS = Target.the("Click btn success").located(By.xpath("//*[@id=\"root\"]/div/form/button"));

    public static Target CERRAR_MODAL = Target.the("Click btn cerrar").located(By.xpath("/html/body/div[3]/div/div/div[1]/button"));

    public static Target DASH = Target.the("Click btn cerrar").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[1]/a"));

    public static Target MENSAJE_BIENVENIDA = Target.the("lista de trabajo").locatedBy("//*[@id=\"basic-navbar-nav\"]/div/div[3]/a");


}
