const links = document.querySelectorAll("a");
const sections = document.querySelectorAll(".section-info")
const span = document.querySelector(".span");
const nav1 = document.querySelector(".nav1");
const nav2 = document.querySelector(".nav2");
const nav3 = document.querySelector(".nav3");
const icons = document.querySelectorAll(".item-nav-report i");
const textReport = document.querySelectorAll(".text-report");

links.forEach(link => {
    link.addEventListener("click", () => {
        const sectionId = link.id.replace('btn-', '');
        sections.forEach(section => {
            section.classList.remove("active");
            if (section.id === sectionId) {
                section.classList.add("active");
                // span.classList.add("mov-40");
            }
        });
    });
});

// function resetIcons() {
//     icons.forEach(icon => icon.classList.add('icon-active'));
//     textReport.forEach(text => text.classList.add('icon-active'));
// }

nav1.addEventListener("click", () => {
    span.classList.remove("mov-40");
    span.classList.remove("mov-60");

    nav1.querySelector('i').classList.add('icon-inactive');
    nav1.querySelector('.text-report').classList.add('icon-inactive');
    nav1.querySelector('i').classList.remove('icon-active');
    nav1.querySelector('.text-report').classList.remove('icon-active');

    nav2.querySelector('i').classList.add('icon-active');
    nav2.querySelector('.text-report').classList.add('icon-active');
    nav2.querySelector('i').classList.remove('icon-inactive');
    nav2.querySelector('.text-report').classList.remove('icon-inactive');

    nav3.querySelector('i').classList.add('icon-active');
    nav3.querySelector('.text-report').classList.add('icon-active');
    nav3.querySelector('i').classList.remove('icon-inactive');
    nav3.querySelector('.text-report').classList.remove('icon-inactive');


})

nav2.addEventListener("click", () => {
    span.classList.add("mov-40");
    span.classList.remove("mov-60");

    nav1.querySelector('i').classList.add('icon-active');
    nav1.querySelector('.text-report').classList.add('icon-active');
    nav1.querySelector('i').classList.remove('icon-inactive');
    nav1.querySelector('.text-report').classList.remove('icon-inactive');

    nav2.querySelector('i').classList.add('icon-inactive');
    nav2.querySelector('.text-report').classList.add('icon-inactive');
    nav2.querySelector('i').classList.remove('icon-active');
    nav2.querySelector('.text-report').classList.remove('icon-active');

    nav3.querySelector('i').classList.add('icon-active');
    nav3.querySelector('.text-report').classList.add('icon-active');
    nav3.querySelector('i').classList.remove('icon-inactive');
    nav3.querySelector('.text-report').classList.remove('icon-inactive');

})

nav3.addEventListener("click", () => {
    span.classList.add("mov-60");

    nav1.querySelector('i').classList.add('icon-active');
    nav1.querySelector('.text-report').classList.add('icon-active');
    nav1.querySelector('i').classList.remove('icon-inactive');
    nav1.querySelector('.text-report').classList.remove('icon-inactive');

    nav2.querySelector('i').classList.add('icon-active');
    nav2.querySelector('.text-report').classList.add('icon-active');
    nav2.querySelector('i').classList.remove('icon-inactive');
    nav2.querySelector('.text-report').classList.remove('icon-inactive');

    nav3.querySelector('i').classList.add('icon-inactive');
    nav3.querySelector('.text-report').classList.add('icon-inactive');
    nav3.querySelector('i').classList.remove('icon-active');
    nav3.querySelector('.text-report').classList.remove('icon-active');
});


// calendario
flatpickr("#fechaInicio", {
    dateFormat: "Y-m-d",
    onChange: function (selectedDates, dateStr, instance) {
        // Aquí puedes hacer algo al seleccionar la primera fecha
    }
});

flatpickr("#fechaFin", {
    dateFormat: "Y-m-d",
    onChange: function (selectedDates, dateStr, instance) {
        // Aquí puedes hacer algo al seleccionar la segunda fecha
    }
});



// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChartbarra);
google.charts.setOnLoadCallback(drawChartColumn);
google.charts.setOnLoadCallback(drawChartArea);
google.charts.setOnLoadCallback(drawCurveTypes);
google.charts.setOnLoadCallback(drawChartCirculeIngresos);
google.charts.setOnLoadCallback(drawChartAreaIngresos);
google.charts.setOnLoadCallback(drawChartBarIngresos);

// console.log(Math.floor(Math.random(10) * 50));


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

//Reportes generales
function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    const moto = Math.floor(Math.random() * 500);
    const auto = Math.floor(Math.random() * 500);
    const bici = Math.floor(Math.random() * 500);
    data.addColumn('string', 'Tipo de Vehículo');
    data.addColumn('number', 'Ocupación');
    data.addRows([
        ['Motocicletas', moto],
        ['Automóviles', auto],
        ['Bicicletas', bici]
    ]);


    // Set chart options
    var options = {
        'title': 'Reporte de Ocupación del Parqueadero',
        'width': 500,
        'height': 250,
        'is3D': true,
        'sliceVisibilityThreshold': 0.01,  // Optional: hide slices smaller than this percentage
        'legend': { position: 'labeled' }  // Optional: display labels next to slices
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function drawChartbarra() {
    // Crear los datos de la tabla
    const enero = Math.floor(Math.random() * 2000000);
    var data = google.visualization.arrayToDataTable([
        ['Mes', 'Motocicletas', 'Automóviles', 'Bicicletas'],
        ['Enero', enero, 1200000, 150000],
        ['Febrero', 280000, 1150000, 170000],
        ['Marzo', 310000, 1300000, 160000],
        ['Abril', 290000, 1250000, 140000],
        ['Mayo', 320000, 1400000, 180000]
    ]);

    // Configurar las opciones del gráfico
    var options = {
        title: 'Reporte de Ingresos del Parqueadero en Pesos Colombianos',
        vAxis: {
            title: 'Ingresos (COP)',
            format: 'currency',  // Formato para mostrar los valores en formato monetario
            currencySymbol: 'COP' // Simbolo de moneda opcional para pesos colombianos
        },
        hAxis: { title: 'Mes' },
        seriesType: 'bars',
        'width': 500,
        'height': 250
    };

    // Dibujar el gráfico de barras
    var chart = new google.visualization.ComboChart(document.getElementById('barra_div'));
    chart.draw(data, options);
}


//Reportes de ocupacion
function drawChartColumn() {
    var data = google.visualization.arrayToDataTable([
        ['Área', 'Ocupación (%)', { role: 'style' }],
        ['Zona A', 75, '#1f77b4'],            // Color azul para Zona A
        ['Zona B', 60, '#ff7f0e'],            // Color naranja para Zona B
        ['Zona C', 85, '#2ca02c'],            // Color verde para Zona C
        ['Zona D', 40, '#d62728'],            // Color rojo para Zona D
    ]);

    // Set chart options
    var options = {
        title: 'Reporte de Ocupación del Parqueadero',
        legend: { position: 'none' },          // Oculta la leyenda
        hAxis: { title: 'Área' },              // Título del eje horizontal
        vAxis: { title: 'Ocupación (%)' },     // Título del eje vertical
        bars: 'vertical',                     // Define las barras verticales
        'width': 500,
        'height': 250,
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('column-ocupation'));
    chart.draw(data, options);
}

function drawChartArea() {
    var data = google.visualization.arrayToDataTable([
        ['Día', 'Ocupación (%)'],
        ['Lunes', 70],
        ['Martes', 65],
        ['Miércoles', 80],
        ['Jueves', 75],
        ['Viernes', 90],
        ['Sábado', 85],
        ['Domingo', 60]
    ]);

    var options = {
        title: 'Ocupación del Parqueadero a lo Largo de la Semana',
        hAxis: { title: 'Día de la Semana', titleTextStyle: { color: '#333' } },
        vAxis: { title: 'Ocupación (%)', minValue: 0, maxValue: 100 },
        areaOpacity: 0.4, // Opacidad del área debajo de la línea
        lineWidth: 2,     // Ancho de la línea
        colors: ['#1f77b4'], // Color de la línea
        'width': 500,
        'height': 250,
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_area'));
    chart.draw(data, options);
}

function drawCurveTypes() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Día');
    data.addColumn('number', 'Ocupación (%)');

    // Datos de ocupación simulados para un mes
    data.addRows([
        [1, 70], [2, 72], [3, 68], [4, 75], [5, 80], [6, 78], [7, 85],
        [8, 90], [9, 88], [10, 85], [11, 82], [12, 79], [13, 76], [14, 74],
        [15, 77], [16, 81], [17, 83], [18, 87], [19, 85], [20, 89], [21, 91],
        [22, 92], [23, 90], [24, 89], [25, 84], [26, 80], [27, 77], [28, 79],
        [29, 82], [30, 85]
    ]);

    var options = {
        title: 'Ocupación del Parqueadero a lo Largo del Mes',
        hAxis: {
            title: 'Día del Mes'
        },
        vAxis: {
            title: 'Ocupación (%)',
            minValue: 0,
            maxValue: 100
        },
        series: {
            0: { curveType: 'function' } // Suaviza la línea
        },
        pointSize: 5, // Tamaño de los puntos en la línea
        lineWidth: 2, // Ancho de la línea
        'width': 500,
        'height': 250,
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_line'));
    chart.draw(data, options);
}


//Reportes de Ingresos
function drawChartCirculeIngresos() {
    // Datos actualizados en pesos colombianos
    var data = google.visualization.arrayToDataTable([
        ['Tipo de Vehículo', 'Ingresos (COP)'],
        ['Motocicleta', 1500000],
        ['Automóvil', 4500000],
        ['Bicicleta', 1000000]
    ]);

    // Opciones del gráfico
    var options = {
        title: 'Distribución de Ingresos por Tipo de Vehículo en Pesos Colombianos',
        pieHole: 0.4,  // Gráfico de dona
        slices: {
            0: { offset: 0.1 },  // Desplazamiento de cada porción
            1: { offset: 0.1 },
            2: { offset: 0.1 }
        },
        width: 500,
        height: 250,
        pieSliceText: 'value',  // Muestra los valores numéricos en cada porción
        pieSliceTextStyle: {
            color: 'black'
        },
        pieStartAngle: 100  // Iniciar el gráfico en un ángulo específico
    };

    // Instanciar y dibujar el gráfico circular
    var chart = new google.visualization.PieChart(document.getElementById('chart_circular_ingresos'));
    chart.draw(data, options);
}

function drawChartAreaIngresos() {
    // Datos actualizados en pesos colombianos
    var data = google.visualization.arrayToDataTable([
        ['Semana', 'Ingresos (COP)'],
        ['Semana 1', 700000],
        ['Semana 2', 100000],
        ['Semana 3', 850000],
        ['Semana 4', 900000]
    ]);

    // Opciones del gráfico
    var options = {
        title: 'Ingresos Semanales Durante el Mes (COP)',
        hAxis: { title: 'Semana' },
        vAxis: { title: 'Ingresos (COP)', minValue: 0 },
        areaOpacity: 0.4,
        lineWidth: 2,
        colors: ['#1f77b4'], // Color del área
        width: 500,
        height: 250
    };

    // Instanciar y dibujar el gráfico de área
    var chart = new google.visualization.AreaChart(document.getElementById('chart_area_ingresos'));
    chart.draw(data, options);
}

function drawChartBarIngresos() {
    // Datos actualizados en pesos colombianos
    var data = google.visualization.arrayToDataTable([
        ['Tipo de Vehículo', 'Ingresos (COP)', { role: 'style' }],
        ['Motocicleta', 1500000, '#1f77b4'],  // Motocicleta con ingresos en COP
        ['Automóvil', 4500000, '#ff7f0e'],   // Automóvil con ingresos en COP
        ['Bicicleta', 500000, '#2ca02c']     // Bicicleta con ingresos en COP
    ]);

    // Opciones del gráfico
    var options = {
        title: 'Ingresos por Tipo de Vehículo (COP)',
        width: 500,
        height: 250,
        hAxis: { title: 'Tipo de Vehículo' },
        vAxis: { title: 'Ingresos (COP)', minValue: 0 },
        bars: 'vertical'
    };

    // Instanciar y dibujar el gráfico de barras
    var chart = new google.visualization.BarChart(document.getElementById('chart_bar_ingresos'));
    chart.draw(data, options);
}