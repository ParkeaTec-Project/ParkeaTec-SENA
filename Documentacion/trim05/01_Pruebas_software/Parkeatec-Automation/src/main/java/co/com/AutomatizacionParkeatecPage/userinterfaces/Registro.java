package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class Registro extends PageObject {

    public static Target FORM = Target.the("formulario").located(By.xpath("//*[@id=\"root\"]/div"));

    public static Target REGISTRO = Target.the("Click enlace registro").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/a[1]"));

    public static Target INPUT_NOMBRE = Target.the("Ingreso nombre usuario").located(By.xpath("//*[@id=\"root\"]/div/form/div[1]/div[1]/input"));

    public static Target INPUT_APELLIDO = Target.the("Ingreso apellido usuario").located(By.xpath("//*[@id=\"root\"]/div/form/div[1]/div[2]/input"));

    public static Target INPUT_CORREO = Target.the("Ingreso correo usuario").located(By.xpath("//*[@id=\"root\"]/div/form/div[2]/div[1]/input"));

    public static Target INPUT_PASSWORD = Target.the("Ingreso password usuario").located(By.xpath("//*[@id=\"root\"]/div/form/div[2]/div[2]/input"));

    public static Target INPUT_TELEFONO = Target.the("Ingreso telefono usuario").located(By.xpath("//*[@id=\"root\"]/div/form/div[3]/div[1]/input"));

    public static Target INPUT_DIRECCION = Target.the("Ingreso direccion usuario").located(By.xpath("//*[@id=\"root\"]/div/form/div[3]/div[2]/input"));

    public static Target SELECT_TIPO_DOCUMENTO = Target.the("Seleccion tipo de documento").located(By.xpath("//*[@id=\"root\"]/div/form/div[4]/div[1]/select"));

    public static Target INPUT_NUMERO_DOCUMENTO = Target.the("Ingreso numero de documento usuario").located(By.xpath("//*[@id=\"root\"]/div/form/div[4]/div[2]/input"));

    public static Target INPUT_FOTO = Target.the("Ingreso foto usuario").located(By.cssSelector("input[type=file]"));

    public static Target SELECT_CENTRO = Target.the("Seleccion centro de formacion").located(By.xpath("//*[@id=\"root\"]/div/form/div[5]/div[2]/select"));

    public static Target INPUT_FICHA = Target.the("Ingreso numero ficha usuario").located(By.xpath("//*[@id=\"root\"]/div/form/div[6]/div/input"));

    public static Target BTN_REGISTRO = Target.the("Click boton de registro").located(By.xpath("//*[@id=\"root\"]/div/form/button"));


    public static Target CERRAR_MODAL_REGISTRO = Target.the("Click boton cerrar modal").located(By.xpath("/html/body/div[3]/div/div/div[1]/button"));

    //public static Target SCROLL_NAV = Target.the("Scroll nav").located(By.xpath("//*[@id=\"root\"]"));

    public static Target LOGIN = Target.the("Click enlace login").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/a[2]"));

    public static Target VER_PERFIL = Target.the("Click enlace ver perfil").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/div/a[1]"));

    public static Target INFO_NOMBRE = Target.the("Informacion del nombre del usuario").located(By.xpath("//*[@id=\"Nombre completo\"]"));

    public static Target INFO_DOCUMENTO = Target.the("Informacion del nombre del usuario").located(By.xpath("//*[@id=\"Numero documento\"]"));

    public static Target INFO_CORREO = Target.the("Informacion del nombre del usuario").located(By.xpath("//*[@id=\"Correo Electronico\"]"));

    public static Target QR_CODE = Target.the("Codigo Qr del usuario").located(By.xpath("//*[@id=\"root\"]/section/div/div/div[2]/div/div/img"));

}
