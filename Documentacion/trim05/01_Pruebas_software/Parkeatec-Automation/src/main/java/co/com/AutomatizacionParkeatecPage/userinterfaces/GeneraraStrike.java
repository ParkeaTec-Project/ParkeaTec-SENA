package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class GeneraraStrike extends PageObject {
    public static Target TITLE_DASH = Target.the("Titulo inicial").located(By.xpath("//*[@id=\"root\"]/div/div/div[1]"));
    public static Target PARKING_LOT = Target.the("Titulo inicial").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[2]/a"));
    public static Target SEE_PARKING = Target.the("Titulo inicial").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[2]/div/a[1]"));
    public static Target CLOSE_MODAL = Target.the("Titulo inicial").located(By.xpath("/html/body/div[3]/div/div/div[1]/button"));
    public static Target SELECT_PARKING = Target.the("Titulo inicial").located(By.xpath("//*[@id=\"root\"]/section/div[1]/div[2]/div[1]/div"));
    public static Target REGISTER_NEWS = Target.the("Titulo inicial").located(By.xpath("/html/body/div[3]/div/div/div[2]/button[2]"));
    public static Target INPUT_NEWS = Target.the("Titulo inicial").located(By.xpath("//*[@id=\"root\"]/div/form/div/textarea"));
    public static Target SEND_NEWS = Target.the("Titulo inicial").located(By.xpath("//*[@id=\"root\"]/div/form/button"));
    public static Target VIEW_PROFILE = Target.the("Titulo inicial").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/a"));
    public static Target VIEW_NEWS = Target.the("Titulo inicial").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/div/a[4]"));
    public static Target NEWS = Target.the("Titulo inicial").located(By.xpath("//*[@id=\"root\"]/section/div/table/tbody/tr[1]/td[4]"));
}
