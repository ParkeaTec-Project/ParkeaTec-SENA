import React, { useState } from "react";

function CrearUsuario() {
    const [formData, setFormData] = useState({
        id_documento: "",
        nombre: "",
        apellido: "",
        telefono: "",
        direccion: "",
        correo: "",
        contraseña: "",
        foto_usuario: "",
        centro_formacion: "",
        ficha_aprendiz: "",
        firma_usuario: "",
        foto_documento: "",
        foto_carnet: "",
        id_tipo_documento: "",
        rol_id: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ 
            ...formData,
            [name]: value
        });
    };

    const tipoDocumentoOptions = [
        { id: 1, nombre: "Cedula de ciudadania" },
        { id: 2, nombre: "Cedula de extranjeria" },
        { id: 3, nombre: "Tarjeta de identidad" }
    ];

    const rolOptions = [
        { id: 1, nombre: "Administrador" },
        { id: 2, nombre: "Vigilante" },
        { id: 3, nombre: "Usuario" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch("http://localhost:4000/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(response.ok) {
                alert("Usuario Creado");
                console.log("Usuario Creado");
            } else {
                alert("Error", data.message);
            }
        } catch (error) {
            console.log("Error al conectar con el servidor", error);
            alert("Error al conectar con el servidor")
        }
    };

    return (
        <form onSubmit={ handleSubmit }>
            <label htmlFor="nroDocumento">Nro Documento</label>
            <input name="id_documento" id="nroDocumento" value={ formData.id_documento } onChange={ handleChange }/>

            <label htmlFor="nombre">Nombre</label>
            <input name="nombre" id="nombre" value={ formData.nombre } onChange={ handleChange }/>

            <label htmlFor="apellido">Apellido</label>
            <input name="apellido" id="apellido" value={ formData.apellido } onChange={ handleChange }/>

            <label htmlFor="telefono">Telefono</label>
            <input name="telefono" id="telefono" value={ formData.telefono } onChange={ handleChange }/>

            <label htmlFor="direccion">Direccion</label>
            <input name="direccion" id="direccion" value={ formData.direccion } onChange={ handleChange }/>

            <label htmlFor="correo">Correo</label>
            <input name="correo" id="correo" value={ formData.correo } onChange={ handleChange }/>

            <label htmlFor="contraseña">Contraseña</label>
            <input name="contraseña" id="contraseña" value={ formData.contraseña } onChange={ handleChange }/>

            <label htmlFor="fotoUsuario">Foto usuario</label>
            <input name="foto_usuario" id="fotoUsuario" value={ formData.foto_usuario } onChange={ handleChange }/>

            <label htmlFor="centroFormacion">Centro de Formacion</label>
            <input name="centro_formacion" id="centroFormacion" value={ formData.centro_formacion } onChange={ handleChange }/>

            <label htmlFor="ficha">Ficha</label>
            <input name="ficha_aprendiz" id="ficha" value={ formData.ficha_aprendiz } onChange={ handleChange }/>

            <label htmlFor="firma">Firma Usuario</label>
            <input name="firma_usuario" id="firma" value={ formData.firma_usuario } onChange={ handleChange }/>

            <label htmlFor="fotoDocumento">Foto del documento</label>
            <input name="foto_documento" id="fotoDocumento" value={ formData.foto_documento } onChange={ handleChange }/>

            <label htmlFor="fotoCarnet">Foto del Carnet</label>
            <input name="foto_carnet" id="fotoCarnet" value={ formData.foto_carnet } onChange={ handleChange }/>

            <label htmlFor="tipoDocumento">Tipo de documento</label>
            <select name="id_tipo_documento" id="tipoDocumento" value={ formData.id_tipo_documento } onChange={ handleChange }>
                <option>Selecciona tu documento</option>
                { tipoDocumentoOptions.map((doc) => (
                    <option key={ doc.id } value={ doc.id }> { doc.nombre } </option>
                )) }
            </select>

            <label htmlFor="rol">Rol</label>
            <select name="rol_id" id="rol" value={ formData.rol_id } onChange={ handleChange }>
                <option>Selecciona un rol</option>
                {rolOptions.map((rol) => (
                    <option key={rol.id} value={rol.id}> {rol.nombre} </option>
                ))}
            </select>

            <button type="submit">Crear usuario</button>
        </form>
    )
}

export default CrearUsuario;