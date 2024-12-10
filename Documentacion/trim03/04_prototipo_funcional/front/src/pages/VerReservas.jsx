import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const ParkGrid = () => {
  const [selectedSpot, setSelectedSpot] = useState(null); // Track selected parking spot
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    spotNumber: ''
  }); // Data for the reservation form
  const [qrCode, setQrCode] = useState(''); // To store the QR code data
  const [parkingSpots, setParkingSpots] = useState([  // Convert to state
    { spot: 1, available: true },
    { spot: 2, available: false, name: 'Juan', date: '2024-12-10', time: '14:00' },
    { spot: 3, available: true },
    { spot: 4, available: true, name: 'Maria', date: '2024-12-11', time: '10:00' },
    { spot: 5, available: true },
    { spot: 6, available: true, name: 'Juan', date: '2024-12-10', time: '14:00' },
    { spot: 7, available: true },
    { spot: 8, available: false, name: 'Maria', date: '2024-12-11', time: '10:00' },
    { spot: 9, available: true },
    { spot: 10, available: true, name: 'Juan', date: '2024-12-10', time: '14:00' },
    { spot: 11, available: true },
    { spot: 12, available: false, name: 'Maria', date: '2024-12-11', time: '10:00' },
    { spot: 13, available: true },
    { spot: 14, available: true, name: 'Juan', date: '2024-12-10', time: '14:00' },
    { spot: 15, available: true },
    { spot: 16, available: true, name: 'Maria', date: '2024-12-11', time: '10:00' },
    { spot: 17, available: true },
    { spot: 18, available: false, name: 'Juan', date: '2024-12-10', time: '14:00' },
    { spot: 18, available: true },
    { spot: 19, available: false, name: 'Maria', date: '2024-12-11', time: '10:00' },
    { spot: 20, available: true },
    { spot: 21, available: true, name: 'Juan', date: '2024-12-10', time: '14:00' },
    { spot: 22, available: true },
    { spot: 23, available: true, name: 'Maria', date: '2024-12-11', time: '10:00' },
    { spot: 24, available: true },
    // Agrega más spots aquí según lo necesites
  ]);

  // Handle selecting a parking spot
  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
    setFormData({ ...formData, spotNumber: spot.spot });
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

    // Update the parking spot with reservation details
    const updatedSpots = parkingSpots.map(spot =>
      spot.spot === formData.spotNumber
        ? { ...spot, available: false, name: formData.name, date: formData.date, time: formData.time }
        : spot
    );

    // Update the parkingSpots state with the new reservation
    setParkingSpots(updatedSpots);  // Corrected: update the state
  };

  return (
    <div>
      <h1>Reserva de Parqueadero</h1>

      {/* Parking grid */}
      <div style={gridStyle}>
        {parkingSpots.map((spot) => (
          <div
            key={spot.spot}
            style={{
              ...spotStyle,
              backgroundColor: spot.available ? 'green' : 'red',
            }}
            onClick={() => handleSpotClick(spot)}
          >
            <span>🚗</span>
            <br />
            <span>{spot.spot}</span>
          </div>
        ))}
      </div>

      {/* Reservation Details */}
      {selectedSpot && (
        <div style={formStyle}>
          <h2>Detalles de la Reserva</h2>

          {selectedSpot.available ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
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
          ) : (
            <div>
              <p>Este parqueadero ya está reservado.</p>
              <p>Reservado por: {selectedSpot.name}</p>
              <p>Fecha: {selectedSpot.date}</p>
              <p>Hora: {selectedSpot.time}</p>
            </div>
          )}
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
