import React, { useState } from 'react';
import QRCode from 'react-qr-code';


const ParkGrid = () => {
  const [selectedSpot, setSelectedSpot] = useState(null); // Track selected parking spot
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    spotNumber: ''
  }); // Data for the reservation form
  const [qrCode, setQrCode] = useState(''); // To store the QR code data

  // Generate parking spots (6x4 grid)
  const parkingSpots = [];
  for (let i = 1; i <= 24; i++) {
    parkingSpots.push(i);
  }

  // Handle selecting a parking spot
  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
    setFormData({ ...formData, spotNumber: spot });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const qrData = `Reserva de Parqueadero: \nNúmero: ${formData.spotNumber}\nFecha: ${formData.date}\nHora: ${formData.time}`;
    setQrCode(qrData); // Set QR code data
  };

  return (
    <div>
      <h1>Reserva de Parqueadero</h1>

      {/* Parking grid */}
      <div style={gridStyle}>
        {parkingSpots.map((spot) => (
          <div
            key={spot}
            style={{
              ...spotStyle,
              backgroundColor: spot === selectedSpot ? 'red' : 'green',
            }}
            onClick={() => handleSpotClick(spot)}
          >
            <span>🚗</span>
            <br />
            <span>{spot}</span>
          </div>
        ))}
      </div>

      {/* Reservation Form */}
      {selectedSpot && (
        <div style={formStyle}>
          <h2>Detalles de la Reserva</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="date">Fecha:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="time">Hora:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Confirmar Reserva</button>
          </form>
        </div>
      )}

      {/* QR Code */}
      {qrCode && (
        <div style={qrContainerStyle}>
          <h3>QR Code de tu Reserva</h3>
          <QRCode value={qrCode} />
        </div>
      )}
    </div>
  );
};

// Styles for the grid and form
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: '10px',
  margin: '20px 0',
};

const spotStyle = {
  padding: '20px',
  textAlign: 'center',
  border: '2px solid #fff',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '18px',
  color: '#fff',
  transition: 'background-color 0.3s ease',
};

const formStyle = {
  marginTop: '20px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '300px',
};

const qrContainerStyle = {
  marginTop: '20px',
  textAlign: 'center',
};

export default ParkGrid;
