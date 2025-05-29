package co.com.AutomatizacionParkeatecPage.models;

public class InfoRegistro {

    private String nombre;

    private String apellido;

    private String correo_electronico;

    private String contrasena;

    private String telefono;

    private String direccion;

    private String tipo_documento;

    private String numero_documento;

    private String foto_usuario;

    private String centro_formacion;

    private String ficha_aprendiz;


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

    public String getCorreo_electronico() {
        return correo_electronico;
    }

    public void setCorreo_electronico(String correo_electronico) {
        this.correo_electronico = correo_electronico;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
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

    public String getNumero_documento() {
        return numero_documento;
    }

    public void setNumero_documento(String numero_documento) {
        this.numero_documento = numero_documento;
    }

    public String getFoto_usuario() {
        return foto_usuario;
    }

    public void setFoto_usuario(String foto_usuario) {
        this.foto_usuario = foto_usuario;
    }

    public String getFicha_aprendiz() {
        return ficha_aprendiz;
    }

    public void setFicha_aprendiz(String ficha_aprendiz) {
        this.ficha_aprendiz = ficha_aprendiz;
    }

    public InfoRegistro(String nombre, String apellido, String correo_electronico, String contrasena, String telefono, String direccion, String tipo_documento, String numero_documento, String foto_usuario, String centro_formacion, String ficha_aprendiz) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo_electronico = correo_electronico;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.direccion = direccion;
        this.tipo_documento = tipo_documento;
        this.numero_documento = numero_documento;
        this.foto_usuario = foto_usuario;
        this.centro_formacion = centro_formacion;
        this.ficha_aprendiz = ficha_aprendiz;
    }
}
