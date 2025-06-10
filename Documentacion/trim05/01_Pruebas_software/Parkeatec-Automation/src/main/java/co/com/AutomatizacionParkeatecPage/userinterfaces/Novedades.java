package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class Novedades extends PageObject {
    public static Target TITLE_DASH = Target.the("Titulo inicial").located(By.xpath("//*[@id=\"root\"]/div/div/div[1]"));
    public static Target PROFILE_SECTION = Target.the("Seleccionar la opcion").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/a"));
    public static Target SEE_NEWS = Target.the("Seleccionar la opcion").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/div/a[4]"));
    public static Target MY_NEWS = Target.the("Seleccionar la opcion").located(By.xpath("//*[@id=\"root\"]/section/div/h2"));
}
