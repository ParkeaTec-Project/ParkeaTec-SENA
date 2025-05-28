package co.com.AutomatizacionParkeatecPage.models;

public class CredencialesInicioSesion {

    private String usuario;

    private String clave;

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public CredencialesInicioSesion(String usuario, String clave) {
        this.usuario = usuario;
        this.clave = clave;
    }
}
