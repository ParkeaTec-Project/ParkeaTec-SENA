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



}
