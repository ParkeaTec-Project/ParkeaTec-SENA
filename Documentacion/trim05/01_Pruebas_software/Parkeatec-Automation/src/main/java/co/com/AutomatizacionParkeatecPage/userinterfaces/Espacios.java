package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class Espacios extends PageObject {

    public static Target PARQUEADERO = Target.the("Link parqueadero").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[2]/a"));

    public static Target ESPACIOS = Target.the("Link parqueadero").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[2]/div/a[1]"));

    public static Target ESPACIO_1 = Target.the("Link parqueadero").located(By.xpath("//*[@id=\"root\"]/section/div[1]/div[2]/div[1]/div"));

    public static Target ESPACIO_2 = Target.the("Link parqueadero").located(By.xpath("//*[@id=\"root\"]/section/div[1]/div[2]/div[2]/div"));

    public static Target ESPACIO_3 = Target.the("Link parqueadero").located(By.xpath("//*[@id=\"root\"]/section/div[1]/div[2]/div[3]/div"));

    public static Target BTN_RESERVA = Target.the("Click boton reserva").located(By.xpath("/html/body/div[3]/div/div/div[2]/button"));

    public static Target BTN_PERFIL = Target.the("Click boton perfil").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/a"));

    public static Target BTN_VERRESERVA = Target.the("Click boton ver reservas").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/div/a[2]"));

    public static Target BTN_CANCELARRESERVA = Target.the("click boton cancelar reserva").located(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div/div[2]/div/div[3]/button"));

    public static Target CERRAR_MODALRESERVA = Target.the("click cerrar modal").located(By.xpath("//*[@id=\"root\"]/section/div[2]/div/button"));


}
