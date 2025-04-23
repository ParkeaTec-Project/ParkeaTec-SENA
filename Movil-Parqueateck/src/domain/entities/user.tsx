export interface User {
    id?: string
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    correo: string;
    password: string;
    centro_formacion: string;
    ficha_aprendiz: string;
    // firma_usuario?: string;
    // foto_documento?: string;
    // foto_carnet?: string;
    id_tipo_documento: string;
    rol_id: string
    session_token?: string;
}