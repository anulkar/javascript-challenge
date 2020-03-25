// Initialize tableData from data.js
var ufoSightings = data;

// Select the button
var filterTableButton = d3.select("#filter-btn");

/* 
Function to display UFO Sightings data in an HTML table
By default all available data is displayed, unless user applies a filter
1. Use d3 to append one table row `tr` for each ufoSightings object
2. Use `Object.entries` to append a cell to the table row for each value in the ufoSighting object 
3. Use d3 to update each cell's text with ufoSightings values (date, city, state, country, shape, duration and comments)
*/
function displayUFOSightings(ufoSightings)
  {
    // Get a reference to the table body
    var tbody = d3.select("tbody");

    // Remove all rows so we can display all data from scratch based on user input 
    d3.selectAll("td").remove();

    ufoSightings.forEach((ufo) => 
      {
        var row = tbody.append("tr");
        Object.entries(ufo).forEach(([key, value]) => 
          {
            var cell = row.append("td");
            if (key == "state" || key == "country")
              {
              // Convert state and country abbreviations to upper case
              cell.text(value.toUpperCase());
              }
            else
              {
              cell.text(value);
              }
          });
      });
  }

/* 
Function to populate the State, Country and Shape dropdown filters
*/
function populateDropdowns(ufoSightings)
{
  // Get a reference to the state, country and shape dropdown lists
  var stateFilter = d3.select("#state-filter");
  var countryFilter = d3.select("#country-filter");
  var shapeFilter = d3.select("#shape-filter");

  var states = ufoSightings.map(function(ufo) {
    return ufo.state.toUpperCase();
  });
  states = Array.from(new Set(states)).sort();
  stateFilter.selectAll("option").data(states).enter().append("option").text(function(state) {return state;});

  var countries = ufoSightings.map(function(ufo) {
    return ufo.country.toUpperCase();
  });
  countries = Array.from(new Set(countries)).sort();
  countryFilter.selectAll("option").data(countries).enter().append("option").text(function(country) {return country;});

  var shapes = ufoSightings.map(function(ufo) {
    return ufo.shape;
  });
  shapes = Array.from(new Set(shapes)).sort();
  shapeFilter.selectAll("option").data(shapes).enter().append("option").text(function(shape) {return shape;});

  
}

/*
1. Listen for the `Filter Table` button click event
2. Search through the date/time column of the ufoSightings object to find rows that match user input.
*/
filterTableButton.on("click", function(){
  // Select all the form-control input elements
  var dateInputElement = d3.select("#datetime");
  var cityInputElement = d3.select("#city");
  var stateInputElement = d3.select("#state");
  var countryInputElement = d3.select("#country");
  var shapeInputElement = d3.select("#shape");

  // Get the value property of all the form-control elements
  var dateInputValue = dateInputElement.property("value");
  var cityInputValue = cityInputElement.property("value");
  var stateInputValue = stateInputElement.property("value");
  var countryInputValue = countryInputElement.property("value");
  var shapeInputValue = shapeInputElement.property("value");
  
  console.log(dateInputValue + "," + cityInputValue + "," + stateInputValue + "," + countryInputValue + "," + shapeInputValue)

  // Filter the ufoSightings object based on the datetime user input
  var filteredUFOSightings = ufoSightings.filter(ufo => ufo.datetime === dateInputValue);

  // Call function to display the filtered data
  displayUFOSightings(filteredUFOSightings);
});

// Display all available UFO Sightings data by default
displayUFOSightings(ufoSightings);
populateDropdowns(ufoSightings);