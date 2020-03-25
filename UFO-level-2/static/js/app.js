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
1. Listen for the `Filter Table` button click event
2. Search through the date/time column of the ufoSightings object to find rows that match user input.
*/
filterTableButton.on("click", function(){
  // Select the datetime form-control input element
  var dateInputElement = d3.select("#datetime");

  // Get the value property of the datetime form-control element
  var dateInputValue = dateInputElement.property("value");

  // Filter the ufoSightings object based on the datetime user input
  var filteredUFOSightings = ufoSightings.filter(ufo => ufo.datetime === dateInputValue);

  // Call function to display the filtered data
  displayUFOSightings(filteredUFOSightings);
});

// Display all available UFO Sightings data by default
displayUFOSightings(ufoSightings);