// src/pages/Dashboard.jsx
import React from "react";

function Dashboard() {
  const username = localStorage.getItem("username") || "Usuario";

  // Simulación de datos
  const libres = 12;
  const reservados = 5;
  const ocupados = 8;

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = "/login"; // Ajusta según tus rutas
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hola, {username} 👋</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-xl text-center shadow">
          <h2 className="text-sm font-semibold text-green-700">Libres</h2>
          <p className="text-2xl font-bold text-green-600">{libres}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl text-center shadow">
          <h2 className="text-sm font-semibold text-yellow-700">Reservados</h2>
          <p className="text-2xl font-bold text-yellow-600">{reservados}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl text-center shadow">
          <h2 className="text-sm font-semibold text-red-700">Ocupados</h2>
          <p className="text-2xl font-bold text-red-600">{ocupados}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

