package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;



public class VerReservas extends PageObject {

    public static Target CLICK_PERFIL = Target.the("click en boton perfil").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/a"));

    public static Target CLICK_VERRESERVAS = Target.the("CLick en el boton ver perfil").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/div/a[2]"));

    public static Target VALIDACION_PAGRESERVA = Target.the("Abrir la pagina de mis reservas").locatedBy("//span[text()='Activa']");

}
