package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class Moto extends PageObject {

    public static Target FORMULARIO = Target.the("Click en el boton formulario").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[1]/a"));

    public static Target LLENAR_FORMULARIO = Target.the("Click en llenar formulario").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[1]/div/a[1]"));

    public static Target INPUT_FIRMA = Target.the("Seleccionar foto firma").located(By.xpath("//*[@id=\"root\"]/div/form/div[6]/div[1]/div/input"));

    public static Target INPUT_DOCUMENTO = Target.the("Seleccionar foto documento").located(By.xpath("//*[@id=\"root\"]/div/form/div[6]/div[2]/div/input"));

    public static Target INPUT_CARNET = Target.the("Seleccionar foto carnet").located(By.xpath("//*[@id=\"root\"]/div/form/div[6]/div[3]/div/input"));

    public static Target SELECT_VEHICULO = Target.the("Seleccionar el tipo de vehiculo").located(By.xpath("//*[@id=\"root\"]/div/form/div[7]/div/select"));

    public static Target INPUT_PLACA = Target.the("Ingresar numero de placa").located(By.xpath("//*[@id=\"root\"]/div/form/div[8]/div[1]/div/input"));

    public static Target INPUT_MODELO = Target.the("Ingresar modelo de moto").located(By.xpath("//*[@id=\"root\"]/div/form/div[8]/div[2]/div/input"));

    public static Target INPUT_MARCA = Target.the("Ingresar la marca de la moto").located(By.xpath("//*[@id=\"root\"]/div/form/div[8]/div[3]/div/input"));

    public static Target INPUT_COLOR = Target.the("Ingresar el color de la moto").located(By.xpath("//*[@id=\"root\"]/div/form/div[9]/div[1]/div/input"));

    public static Target INPUT_SOAT = Target.the("Ingrese la fecha de vencimiento del soat").located(By.xpath("//*[@id=\"root\"]/div/form/div[9]/div[2]/div/input"));

    public static Target INPUT_OBSERVACION = Target.the("Observaciones del vehiculo").located(By.xpath("//*[@id=\"root\"]/div/form/div[9]/div[3]/div/input"));

    public static Target INPUT_FOTOPLACA = Target.the("Seleccionar foto placa").located(By.xpath("//*[@id=\"root\"]/div/form/div[10]/div[1]/div/input"));

    public static Target INPUT_FOTOVEHICULO = Target.the("Seleccionar foto Moto").located(By.xpath("//*[@id=\"root\"]/div/form/div[10]/div[2]/div/input"));

    public static Target INPUT_LICENCIA = Target.the("Seleccionar foto licencia").located(By.xpath("//*[@id=\"root\"]/div/form/div[11]/div[1]/div/input"));

    public static Target INPUT_TARPROP = Target.the("Seleccionar foto tarjeta de propiedad").located(By.xpath("//*[@id=\"root\"]/div/form/div[11]/div[2]/div/input"));

    public static Target INPUT_FOTOSOAT = Target.the("Seleccionar foto soat").located(By.xpath("//*[@id=\"root\"]/div/form/div[12]/div[1]/div/input"));

    public static Target INPUT_FOTOTECNO = Target.the("Seleccionar foto tecnomecanica").located(By.xpath("//*[@id=\"root\"]/div/form/div[12]/div[2]/div/input"));

    public static Target BTN_ENVIAR = Target.the("Click boton enviar").located(By.xpath("//*[@id=\"root\"]/div/form/button"));

    public static Target MSG_REGISTRO = Target.the("Mensaje de registro de vehiculo").locatedBy("//div[text()='Vehiculo registrado']");
}
