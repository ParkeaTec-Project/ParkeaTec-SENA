package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class Bicicleta extends PageObject {

    public static Target DASHBOARD = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"root\"]/div"));

    public static Target TITLE_DASH = Target.the("titulo principal").located(By.xpath("//*[@id=\"root\"]/div/div/div[1]"));

    public static Target FORMULARIO = Target.the("Click enlace formulario").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[1]/a"));

    public static Target LLENAR_FORMULARIO = Target.the("Click enlace llenar formulario").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[1]/div/a[1]"));

    public static Target INPUT_FIRMA = Target.the("Ingreso foto firma").located(By.xpath("//*[@id=\"root\"]/div/form/div[6]/div[1]/div/input"));

    public static Target INPUT_DOCUMENTO = Target.the("Ingreso foto documento").located(By.xpath("//*[@id=\"root\"]/div/form/div[6]/div[2]/div/input"));

    public static Target INPUT_CARNET = Target.the("Ingreso foto carnet").located(By.xpath("//*[@id=\"root\"]/div/form/div[6]/div[3]/div/input"));

    public static Target SELECT_VEHICULO = Target.the("Seleccion tipo de vehiculo").located(By.xpath("//*[@id=\"root\"]/div/form/div[7]/div/select"));

    public static Target INPUT_SERIAL = Target.the("Ingreso numero de serial del vehiculo").located(By.xpath("//*[@id=\"root\"]/div/form/div[8]/div[1]/div/input"));

    public static Target INPUT_FOTO_SERIAL = Target.the("Ingreso foto serial del vehiculo").located(By.xpath("//*[@id=\"root\"]/div/form/div[8]/div[2]/div/input"));

    public static Target INPUT_VEHICULO = Target.the("Ingreso foto del vehiculo").located(By.xpath("//*[@id=\"root\"]/div/form/div[9]/div[1]/div/input"));

    public static Target INPUT_OBSERVACION = Target.the("Ingreso observacion del vehiculo").located(By.xpath("//*[@id=\"root\"]/div/form/div[9]/div[2]/div/input"));

    public static Target BTN_ENVIAR = Target.the("Click boton enviar").located(By.xpath("//*[@id=\"root\"]/div/form/button"));

    public static Target VEHICULO = Target.the("Link vehiculos").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/div/a[3]"));

    public static Target CERRAR_MODAL = Target.the("Cerrar modal").located(By.xpath("/html/body/div[3]/div/div/div[2]/button"));

    public static Target MENU = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"root\"]/nav/div/a"));

    public static Target PRUEBA = Target.the("prueba").located(By.xpath("//*[@id=\"root\"]/nav/div/a"));

    public static Target PERFIL = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/a"));

    //public static Target TEXT_SERIAL = Target.the("informacion de placa").located(By.xpath("//*[@id=\"root\"]/section/div/div/div/div/div/div/div[1]/div[2]/p[3]"));

    //public static Target TEXT_SERIAL = Target.the("mensaje de login").locatedBy("//p[text()='123456ABC']");

    public static Target TEXT_SERIAL = Target.the("informacion de placa").locatedBy("//p[text()='123456ABC']");

    public static Target TEXT_OBSERVACION = Target.the("informacion de observacion").located(By.xpath("//*[@id=\"root\"]/section/div/div/div/div/div/div/div[1]/div[2]/p[5]"));

}
