package co.com.AutomatizacionParkeatecPage.models;

public class FormularioMoto {

    private String firma_usuario;

    private String foto_documento;

    private String foto_carnet;

    private String placa_vehiculo;

    private String modelo;

    private String marca;

    private String color;

    private String vencimiento_soat;

    private String observacion;

    private String foto_placa;

    private String foto_vehiculo;

    private String foto_licencia;

    private String foto_tarprop;

    private String foto_soat;

    private String foto_tecno;

    public String getFirma_usuario() {
        return firma_usuario;
    }

    public void setFirma_usuario(String firma_usuario) {
        this.firma_usuario = firma_usuario;
    }

    public String getFoto_documento() {
        return foto_documento;
    }

    public void setFoto_documento(String foto_documento) {
        this.foto_documento = foto_documento;
    }

    public String getFoto_carnet() {
        return foto_carnet;
    }

    public void setFoto_carnet(String foto_carnet) {
        this.foto_carnet = foto_carnet;
    }

    public String getFoto_placa() {
        return foto_placa;
    }

    public void setFoto_placa(String foto_placa) {
        this.foto_placa = foto_placa;
    }

    public String getPlaca_vehiculo() {
        return placa_vehiculo;
    }

    public void setPlaca_vehiculo(String placa_vehiculo) {
        this.placa_vehiculo = placa_vehiculo;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getFoto_licencia() {
        return foto_licencia;
    }

    public void setFoto_licencia(String foto_licencia) {
        this.foto_licencia = foto_licencia;
    }

    public String getFoto_soat() {
        return foto_soat;
    }

    public void setFoto_soat(String foto_soat) {
        this.foto_soat = foto_soat;
    }

    public String getFoto_tarprop() {
        return foto_tarprop;
    }

    public void setFoto_tarprop(String foto_tarprop) {
        this.foto_tarprop = foto_tarprop;
    }

    public String getFoto_tecno() {
        return foto_tecno;
    }

    public void setFoto_tecno(String foto_tecno) {
        this.foto_tecno = foto_tecno;
    }

    public String getFoto_vehiculo() {
        return foto_vehiculo;
    }

    public void setFoto_vehiculo(String foto_vehiculo) {
        this.foto_vehiculo = foto_vehiculo;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public String getVencimiento_soat() {
        return vencimiento_soat;
    }

    public void setVencimiento_soat(String vencimiento_soat) {
        this.vencimiento_soat = vencimiento_soat;
    }

    public FormularioMoto (String vencimiento_soat, String marca, String color, String placa_vehiculo, String observacion, String firma_usuario, String foto_documento, String foto_tecno, String foto_vehiculo,
                           String foto_carnet, String foto_licencia, String foto_placa, String foto_tarprop, String foto_soat, String modelo)
    {
        this.color = color;
        this.firma_usuario = firma_usuario;
        this.foto_carnet = foto_carnet;
        this.foto_documento = foto_documento;
        this.foto_licencia = foto_licencia;
        this.foto_placa = foto_placa;
        this.foto_soat = foto_soat;
        this.foto_tarprop = foto_tarprop;
        this.foto_tecno = foto_tecno;
        this.foto_vehiculo = foto_vehiculo;
        this.marca = marca;
        this.modelo = modelo;
        this.observacion = observacion;
        this.placa_vehiculo = placa_vehiculo;
        this.vencimiento_soat = vencimiento_soat;

    }
}
