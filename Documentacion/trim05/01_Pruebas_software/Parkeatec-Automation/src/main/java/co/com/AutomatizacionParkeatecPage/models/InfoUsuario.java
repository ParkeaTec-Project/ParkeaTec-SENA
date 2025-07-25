package co.com.AutomatizacionParkeatecPage.models;

public class InfoUsuario {

    private String documento;

    private String nombre;

    private String apellido;

    private String telefono;

    private String direccion;

    private String correo;

    private String password;

    private String centro_formacion;

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCentro_formacion() {
        return centro_formacion;
    }

    public void setCentro_formacion(String centro_formacion) {
        this.centro_formacion = centro_formacion;
    }

    public InfoUsuario(String documento, String nombre, String apellido, String telefono, String direccion, String correo, String password, String centro_formacion) {
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.direccion = direccion;
        this.correo = correo;
        this.password = password;
        this.centro_formacion = centro_formacion;
    }
}
