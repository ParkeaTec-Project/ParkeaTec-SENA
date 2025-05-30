package co.com.AutomatizacionParkeatecPage.models;

public class InfoBicicleta {

    private String firma_usuario;

    private String foto_documento;

    private String foto_carnet;

    private String nro_serial;

    private String foto_serial;

    private String foto_vehiculo;

    private String observacion;


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

    public String getNro_serial() {
        return nro_serial;
    }

    public void setNro_serial(String nro_serial) {
        this.nro_serial = nro_serial;
    }

    public String getFoto_serial() {
        return foto_serial;
    }

    public void setFoto_serial(String foto_serial) {
        this.foto_serial = foto_serial;
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

    public InfoBicicleta(String firma_usuario, String foto_documento, String foto_carnet, String nro_serial, String foto_serial, String foto_vehiculo, String observacion) {
        this.firma_usuario = firma_usuario;
        this.foto_documento = foto_documento;
        this.foto_carnet = foto_carnet;
        this.nro_serial = nro_serial;
        this.foto_serial = foto_serial;
        this.foto_vehiculo = foto_vehiculo;
        this.observacion = observacion;
    }
}
