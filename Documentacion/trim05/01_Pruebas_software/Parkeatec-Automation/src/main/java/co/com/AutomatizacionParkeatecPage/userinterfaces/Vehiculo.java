package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class Vehiculo extends PageObject {

    public static Target CLICK_PERFIL = Target.the("click en boton perfil").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/a"));

    public static Target CLICK_VEHICULO = Target.the("click en boton vehiculo").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/div/a[3]"));

    public static Target TEXTO_VEHICULO = Target.the("titulo vehiculo").located(By.xpath("//*[@id=\"root\"]/section/div/div/div/div/div/div/div[1]/div[1]"));

    public static Target BTN_VEHICULO = Target.the("titulo vehiculo").located(By.xpath("//*[@id=\"root\"]/section/div/div/div/div/div/div/div[1]/button[1]"));

    public static Target IMG_VEHICULO = Target.the("qr").located(By.xpath("//img[@alt='Foto del vehiculo']"));
}


