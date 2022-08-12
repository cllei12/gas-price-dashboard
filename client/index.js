// set default values
const PORT = 4999; // server's local port
var inputStart = document.getElementById("start");
var inputEnd = document.getElementById("end");

var cities, states, line_names;
var desp, scope, col, start, end;

function selectedSearchValue() {
  // get selected values {scope, desp, col} from the form
  let selectedValues = {
    scope: "",
    desp: "",
    states: "",
    cities: "",
  };

  let formHtmlIds = {
    scope: "#scope-bs",
    desp: "#desp-bs",
    states: "#states-bs",
    cities: "#cities-bs",
  };

  let loadValues = function (htmlID) {
    let values = Array.from($(htmlID).find(":selected")).map(function (item) {
      return $(item).val();
    });
    return values;
  };

  Object.keys(selectedValues).forEach((key) => {
    selectedValues[key] = loadValues(formHtmlIds[key]);
  });
  console.log("selected Values", selectedValues);

  let scope = selectedValues["scope"][0];
  let desp = selectedValues["desp"][0];
  let col = "";

  if (selectedValues["scope"] == "US") {
    line_names = ["US"];
  } else if (selectedValues["scope"] == "states") {
    line_names = selectedValues["states"];
  } else if (selectedValues["scope"] == "cities") {
    line_names = selectedValues["cities"];
  }
  col = line_names.join(",");

  console.log("values for api query", { scope, desp, col });
  return { scope, desp, col };
}

const scopeSelect = document.getElementById("scope-bs");
scopeSelect.addEventListener("change", (event) => {
  let selectValue = event.target.value;
  console.log(selectValue);
  if (selectValue == "US") {
    document.getElementById("states-bs").disabled = true;
    document.getElementById("cities-bs").disabled = true;
  } else if (selectValue == "states") {
    document.getElementById("states-bs").disabled = false;
    document.getElementById("cities-bs").disabled = true;
  } else {
    document.getElementById("states-bs").disabled = true;
    document.getElementById("cities-bs").disabled = false;
  }
});

function setSearchValue(desp, scope, col, start, end) {
  let searchValue = `desp=${desp}&scope=${scope}&col=${col}&start=${start}&end=${end}`;
  return searchValue;
}
function loadData(data) {
  // use returned data from DB to 'dates' and 'prices' for line chart
  let dates = [];
  let prices = {};

  line_names.forEach((name) => {
    prices[name] = [];
  });

  data.forEach((element) => {
    line_names.forEach((name) => {
      prices[name].push(element[name]);
    });
    dates.push(element["date"].substring(0, 10));
  });

  return { dates, prices };
}
async function fetchData() {
  // get selected values in the form and update line_names array
  let selectedValues = selectedSearchValue();
  scope = selectedValues.scope;
  desp = selectedValues.desp;
  col = selectedValues.col;
  var start = inputStart.value;
  var end = inputEnd.value;
  // update api url
  let searchValue = setSearchValue(desp, scope, col, start, end);

  // retrieve data via api
  url = `http://localhost:${PORT}/gasoline?` + searchValue;
  let response = await fetch(url);
  const data = await response.json();

  let { dates, prices } = await loadData(data["data"]);

  let element = document.getElementById("content");
  let hidden = element.getAttribute("hidden");

  if (hidden) {
    element.removeAttribute("hidden");
  }
  myLineChart(dates, prices);
  generate_table(dates, prices);
}

function generate_table(dates, prices) {
  $("#table").empty();

  var tbl = document.getElementById("table");
  var tblBody = document.createElement("tbody");
  // console.log(prices);
  let keys = Object.keys(prices);
  let size = dates.length;

  var tblHead = document.createElement("thead");
  var row = document.createElement("tr");
  var header = document.createElement("th");
  var headerText = document.createTextNode("Date");
  header.appendChild(headerText);
  row.appendChild(header);
  for (var i = 0; i < keys.length; i++) {
    var header = document.createElement("th");
    var headerText = document.createTextNode(keys[i]);
    header.appendChild(headerText);
    row.appendChild(header);
  }
  tblHead.appendChild(row);
  tbl.appendChild(tblHead);
  for (var i = 0; i < size; i++) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellText = document.createTextNode(dates[i]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    for (var j = 0; j < keys.length; j++) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(prices[keys[j]][i]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
}

// plot line chart - config for line chart
const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

const CHARTJS_COLORS = [
  "rgb(54, 162, 235)",
  "rgb(201, 203, 207)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
];

const COLOR_SPECTRAL = [
  "#3288bd",  "#d53e4f",  "#fdae61", "#abdda4", "#5e4fa2",
   "#f46d43", "#66c2a5",   "#9e0142", "#fee08b", "#e6f598",
];

// var of line chart -> Chart class
var myChart;

function createDatasets(prices) {
  // create datasets including data for each lines
  let datasets = [];

  for (let i = 0; i < line_names.length; i++) {
    let line_name = line_names[i];
    datasets.push({
      label: line_name,
      backgroundColor: COLOR_SPECTRAL[i],
      borderColor: COLOR_SPECTRAL[i],
      data: prices[line_name],
    });
  }

  return datasets;
}

function myLineChart(dates, prices) {
  const data = {
    labels: dates,
    datasets: createDatasets(prices),
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: "Gasoline Price Graph",
        },
        legend: {
          display: true,
        },
      },

      interaction: {
        intersect: false,
        mode: "index",
      },

      scales: {
        y: {
          grid: {
            drawBorder: true,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 20,
            color: "#ccc",
            font: {
              size: 11,
              // family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#ccc",
            padding: 20,
            font: {
              size: 11,
              // family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    },
  };

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(document.getElementById("myChart"), config);
}
