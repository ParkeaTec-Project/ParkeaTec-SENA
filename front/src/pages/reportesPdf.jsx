import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportarReportesPDF = (reservasDiarias, vehiculosTipo, puestosUsados, usuariosFrecuentes) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Reportes del Parqueadero', 14, 20);

  doc.setFontSize(12);
  doc.text('Reservas por Día:', 14, 30);
  autoTable(doc, {
    startY: 35,
    head: [['Día', 'Total Reservas']],
    body: reservasDiarias.map(r => [
      new Date(r.dia).toLocaleDateString(),
      r.total
    ])
  });

  const afterReservasY = doc.lastAutoTable.finalY + 10;
  doc.text('Tipo de Vehículo más Usado:', 14, afterReservasY);
  autoTable(doc, {
    startY: afterReservasY + 5,
    head: [['Tipo', 'Total']],
    body: vehiculosTipo.map(v => [v.tipo_vehiculo, v.total])
  });

  const afterVehiculosY = doc.lastAutoTable.finalY + 10;
  doc.text("Puestos más usados", 14, afterVehiculosY);
  autoTable(doc, {
    startY: afterVehiculosY + 5,
    head: [["Espacio", "Veces Usado"]],
    body: puestosUsados.map((p) => [p.numero_espacio, p.veces_usado]),
  });

  const afterPuestosY = doc.lastAutoTable.finalY + 10;
  doc.text("Usuarios más frecuentes", 14, afterPuestosY);
  autoTable(doc, {
    startY: afterPuestosY + 5,
    head: [["Nombre", "Apellido", "Reservas"]],
    body: usuariosFrecuentes.map((u) => [u.nombre, u.apellido, u.total_reservas]),
  });

  doc.save("reporte_parqueadero.pdf");
};

export default exportarReportesPDF;
