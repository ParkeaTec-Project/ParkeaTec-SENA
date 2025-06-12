package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;


public class VerListaUsuarios extends PageObject {

    public static Target BEGIN = Target.the("Título del dashboard").located(By.xpath("//*[@id=\"root\"]/div/div/div[1]/h2"));

    public static Target BTN_PERFIL = Target.the("Click boton perfil").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/a"));

    public static Target BTN_VERUSUARIOS = Target.the("Click boton ver usuarios").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/div/a[6]"));

    public static Target VALIDACION_CORREO = Target.the("Validacion correo").located(By.xpath("//*[@id=\"root\"]/div/table/tbody/tr[1]/td[3]"));

    public static Target VALIDACION_ROL = Target.the("Validacion Rol").located(By.xpath("//*[@id=\"root\"]/div/table/tbody/tr[1]/td[4]"));

    public static Target VALIDACION_APELLIDO = Target.the("Validacion apellido").located(By.xpath("//*[@id=\"root\"]/div/table/tbody/tr[1]/td[2]"));
}
