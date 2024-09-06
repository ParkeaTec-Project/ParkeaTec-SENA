const links = document.querySelectorAll("a");
const sections = document.querySelectorAll(".section-info")
const span = document.querySelector(".span");
const nav1 = document.querySelector(".nav1");
const nav2 = document.querySelector(".nav2");
const nav3 = document.querySelector(".nav3");

links.forEach(link => {
    link.addEventListener("click", () => {
        const sectionId = link.id.replace('btn-', '');
        sections.forEach(section => {
            section.classList.remove("active");
            if(section.id === sectionId) {
                section.classList.add("active");
                // span.classList.add("mov-40");
            }
        });
    });
});

nav1.addEventListener("click", () => {
    span.classList.remove("mov-40");
    span.classList.remove("mov-60");
})

nav2.addEventListener("click", () => {
    span.classList.add("mov-40");
    span.classList.remove("mov-60");
})

nav3.addEventListener("click", () => {
    span.classList.add("mov-60");
})


// calendario
flatpickr("#fechaInicio", {
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr, instance) {
        // Aquí puedes hacer algo al seleccionar la primera fecha
    }
});

flatpickr("#fechaFin", {
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr, instance) {
        // Aquí puedes hacer algo al seleccionar la segunda fecha
    }
});

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChartbarra);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Mushrooms', 3],
    ['Onions', 1],
    ['Olives', 1],
    ['Zucchini', 20],
    ['Pepperoni', 2]
  ]);

  // Set chart options
  var options = {'title':'Reporte de Ocupacion',
                 'width':400,
                 'height':300,
                 'is3D':true,
                 };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function drawChartbarra() {

     // Some raw data (not necessarily accurate)
     var data = google.visualization.arrayToDataTable([
        ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
        ['2004/05',  165,      938,         522,             998,           450,      614.6],
        ['2005/06',  135,      1120,        599,             1268,          288,      682],
        ['2006/07',  157,      1167,        587,             807,           397,      623],
        ['2007/08',  139,      1110,        615,             968,           215,      609.4],
        ['2008/09',  136,      691,         629,             1026,          366,      569.6]
      ]);

      var options = {
        title : 'Reporte de ingresos',
        vAxis: {title: 'Cups'},
        hAxis: {title: 'Month'},
        seriesType: 'bars',
        series: {5: {type: 'line'}}
      };

      var chart = new google.visualization.ComboChart(document.getElementById('barra_div'));
      chart.draw(data, options);
  }