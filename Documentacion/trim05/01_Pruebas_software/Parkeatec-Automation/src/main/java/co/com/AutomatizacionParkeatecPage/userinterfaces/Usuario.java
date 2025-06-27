package co.com.AutomatizacionParkeatecPage.userinterfaces;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class Usuario extends PageObject {

    public static Target TITLE = Target.the("click en boton perfil").located(By.xpath("//*[@id=\"root\"]/div/div/div[1]"));

    public static Target CLICK_PERFIL = Target.the("click en boton perfil").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/a"));

    public static Target CLICK_USUARIOS = Target.the("click en boton ver usuarios").located(By.xpath("//*[@id=\"basic-navbar-nav\"]/div/div[3]/div/a[6]"));

    public static Target INPUT_DOCUMENTO = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"nroDocumento\"]"));

    public static Target INPUT_NOMBRE = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"nombre\"]"));

    public static Target INPUT_APELLIDO = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"apellido\"]"));

    public static Target INPUT_TELEFONO = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"telefono\"]"));

    public static Target INPUT_DIRECCION = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"direccion\"]"));

    public static Target INPUT_CORREO = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"correo\"]"));

    public static Target INPUT_PASSWORD = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"contraseña\"]"));

    public static Target INPUT_CENTRO = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"centroFormacion\"]"));

    public static Target BTN_CREAR = Target.the("Scroll vista formulario").located(By.xpath("//*[@id=\"root\"]/div/div/button/a"));

    public static Target BTN_REGISTRO = Target.the("Scroll btn registro").located(By.xpath("//*[@id=\"root\"]/div/form/button"));

    public static Target TEXTO_REGISTRO = Target.the("Scroll texto registro").located(By.xpath("//*[@id=\"root\"]/div/h2"));

    public static Target TITLE_DASH = Target.the("titulo principal").located(By.xpath("//*[@id=\"root\"]/div/div/div[1]"));

    public static Target SELECT_DOCUMENTO = Target.the("titulo principal").located(By.xpath("//*[@id=\"tipoDocumento\"]"));

    public static Target SELECT_ROL = Target.the("titulo principal").located(By.xpath("//*[@id=\"rol\"]"));

    public static Target MODAL_REGISTRO = Target.the("btn cerrar").located(By.xpath("/html/body/div[3]/div/div/div[1]/button"));

    public static Target NOMBRE = Target.the("btn cerrar").located(By.xpath("//*[@id=\"root\"]/div/table/tbody/tr[1]/td[1]"));

    public static Target APELLIDO = Target.the("btn cerrar").located(By.xpath("//*[@id=\"root\"]/div/table/tbody/tr[1]/td[2]"));

    public static Target CORREO = Target.the("btn cerrar").located(By.xpath("//*[@id=\"root\"]/div/table/tbody/tr[1]/td[3]"));



}
