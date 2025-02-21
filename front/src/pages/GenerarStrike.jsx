import React, { useState } from 'react';

const StrikeForm = () => {
  // State to hold the input form data
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    nombre: '',
    documentos: '',
    ficha: '',
    motivo: '',
    quienPoneStrike: '',
  });

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log the form data to the console
    console.log('Strike registrado:', formData);

    // Reset form after submitting
    setFormData({
      fecha: '',
      hora: '',
      nombre: '',
      documentos: '',
      ficha: '',
      motivo: '',
      quienPoneStrike: '',
    });
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Registrar Strike al Aprendiz</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label htmlFor="fecha" style={labelStyle}>Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="hora" style={labelStyle}>Hora:</label>
          <input
            type="time"
            id="hora"
            name="hora"
            value={formData.hora}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="nombre" style={labelStyle}>Nombre del Aprendiz:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="documentos" style={labelStyle}>Documentos del Aprendiz:</label>
          <input
            type="text"
            id="documentos"
            name="documentos"
            value={formData.documentos}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="ficha" style={labelStyle}>Ficha del Aprendiz:</label>
          <input
            type="text"
            id="ficha"
            name="ficha"
            value={formData.ficha}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="motivo" style={labelStyle}>Motivo del Strike:</label>
          <textarea
            id="motivo"
            name="motivo"
            value={formData.motivo}
            onChange={handleInputChange}
            required
            style={textareaStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="quienPoneStrike" style={labelStyle}>Persona que pone el Strike:</label>
          <input
            type="text"
            id="quienPoneStrike"
            name="quienPoneStrike"
            value={formData.quienPoneStrike}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Registrar Strike</button>
      </form>

      {/* Optionally, show the submitted strike data */}
      <div style={{ marginTop: '20px' }}>
        <h2>Datos del Strike Registrado:</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  textAlign: 'center',
  color: '#333',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#333',
};

const inputStyle = {
  padding: '10px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '5px',
};

const textareaStyle = {
  padding: '10px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '5px',
  height: '100px',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  color: '#fff',
  backgroundColor: '#4CAF50',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginTop: '20px',
};



export default StrikeForm;
