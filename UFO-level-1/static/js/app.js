// Initialize tableData from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

/* 
1. Use d3 to append one table row `tr` for each ufoSightings object
2. Use `Object.entries` to append a cell to the table row for each value in the ufoSighting object 
3. Use d3 to update each cell's text with ufoSightings values (date, city, state, country, shape, duration and comments)
*/
tableData.forEach((ufoSightings) => 
  {
    var row = tbody.append("tr");
    Object.entries(ufoSightings).forEach(([key, value]) => 
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