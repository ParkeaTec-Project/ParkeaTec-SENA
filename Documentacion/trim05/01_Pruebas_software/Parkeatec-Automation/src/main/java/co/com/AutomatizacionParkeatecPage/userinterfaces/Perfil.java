package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class Perfil extends PageObject {

    public static Target CLICK_PERFIL = Target.the("click en boton perfil").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/a"));

    public static Target VER_PERFIL = Target.the("click en boton ver perfil").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/div/a[1]"));

    public static Target TEXTO_PERFIL = Target.the("click en boton ver perfil").located(By.xpath("//*[@id=\"root\"]/section/div/div/div[2]/div/div/h3"));

    public static Target QR = Target.the("qr").located(By.xpath("//img[@alt='Codigo QR del usuario']"));



}
