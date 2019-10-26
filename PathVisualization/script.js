// Create a 4x4 grid
// Represent the grid as a 2-dimensional array
var gridSize = 4;
var grid = [];
for (var i=0; i<gridSize; i++) {
  grid[i] = [];
  for (var j=0; j<gridSize; j++) {
    grid[i][j] = 'Empty';
  }
}

function generateGrid(r, c) {
    var grid = "<table>";
    for (var row = 0; row < r; row++) {
        grid += "<tr>";
        for (var col = 0; col < c; col++) {
            grid += '<td id="' + row + 'r' + 'c' + col + '"' + '></td>';
        }
        grid += "</tr>";
    }
    grid += "</table>";
    return grid;
}

var g = generateGrid(20, 20);
console.log(g);
// $("#container").append(g);
$("#grid").append(g);    // add the grid to html.

// Think of the first index as "distance from the top row"
// Think of the second index as "distance from the left-most column"

// This is how we would represent the grid with obstacles above
// grid[0][0] = "Start";
// grid[2][2] = "Goal";
//
// grid[1][1] = "Obstacle";
// grid[1][2] = "Obstacle";
// grid[1][3] = "Obstacle";
// grid[2][1] = "Obstacle";
