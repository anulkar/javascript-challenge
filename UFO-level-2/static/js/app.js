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

    // Get a reference to the table heading to display the search result count
    var ufoSearchResult = d3.select("#ufo-count");

    // Store the count of UFOs in the dataset
    var ufoCount = ufoSightings.length;

    // Display results in the table
    if (ufoCount === 0)
      {
        ufoSearchResult.text("Sorry, could not find any UFOs..try searching again!");
        // Remove all rows so we can display all data from scratch based on user input 
        d3.selectAll("td").remove();
      }
    else
      {
        ufoSearchResult.text("Total UFO Sightings: " + ufoCount);
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

  // Grab all the states from the dataset
  var states = ufoSightings.map(function(ufo) {
    return ufo.state.toUpperCase();
  });
  // De-dup the states, sort and save to a new array
  states = Array.from(new Set(states)).sort();
  // Populate the State dropdown filter with the new array of values
  stateFilter.selectAll("option").data(states).enter().append("option").text(function(state) {return state;});

  // Grab all the countries from the dataset
  var countries = ufoSightings.map(function(ufo) {
    return ufo.country.toUpperCase();
  });
  // De-dup the countries, sort and save to a new array
  countries = Array.from(new Set(countries)).sort();
  // Populate the Country dropdown filter with the new array of values
  countryFilter.selectAll("option").data(countries).enter().append("option").text(function(country) {return country;});

  // Grab all the shapes from the dataset
  var shapes = ufoSightings.map(function(ufo) {
    return ufo.shape;
  });
  // De-dup the shapes, sort and save to a new array
  shapes = Array.from(new Set(shapes)).sort();
  // Populate the Shape dropdown filter with the new array of values
  shapeFilter.selectAll("option").data(shapes).enter().append("option").text(function(shape) {return shape;});
}

/*
1. Listen for the `Search UFOs` button click event
2. Search through the date/time column of the ufoSightings object to find rows that match user input.
*/
filterTableButton.on("click", function(){
  // Select all the form-control input elements
  var dateInputElement = d3.select("#datetime");
  var cityInputElement = d3.select("#city-filter");
  var stateInputElement = d3.select("#state-filter");
  var countryInputElement = d3.select("#country-filter");
  var shapeInputElement = d3.select("#shape-filter");

  // Get the value property of all the form-control elements
  var dateInputValue = dateInputElement.property("value");
  var cityInputValue = cityInputElement.property("value");
  var stateInputValue = stateInputElement.property("value");
  var countryInputValue = countryInputElement.property("value");
  var shapeInputValue = shapeInputElement.property("value");
  
  // Filter the ufoSightings object based on the user input
  var filteredUFOSightings = ufoSightings.filter(function(ufo) {
    if (dateInputValue === "" && cityInputValue === "")
      {
       return (ufo.state.toUpperCase() === stateInputValue.toUpperCase() && 
       ufo.country.toUpperCase() === countryInputValue.toUpperCase() 
       && ufo.shape === shapeInputValue);
      }
    else
      if (dateInputValue === "")
        {
          return (ufo.city.toUpperCase() === cityInputValue.toUpperCase() && 
          ufo.state.toUpperCase() === stateInputValue.toUpperCase() && ufo.country.toUpperCase() === countryInputValue.toUpperCase() 
          && ufo.shape === shapeInputValue);
        }
      else
        {
          return (ufo.datetime === dateInputValue && ufo.state.toUpperCase() === stateInputValue.toUpperCase() && 
          ufo.country.toUpperCase() === countryInputValue.toUpperCase() && ufo.shape === shapeInputValue);
        }
  });

  // Call function to display the filtered data
  displayUFOSightings(filteredUFOSightings);
});

// Display all available UFO Sightings data by default
displayUFOSightings(ufoSightings);

// Populate the dropdown list filters with default values based on available data 
populateDropdowns(ufoSightings);