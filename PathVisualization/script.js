const COLS = 20;
const ROWS = 20;

/**
 *
 */
class Node {
    constructor(row, col) {
        this.seen = false;
        this.obstacle = false;
        this.row = row;
        this.col = col;
    }
}

// Create a COLS x ROWS grid
// Represent the grid as a 2-dimensional array
var grid = [];
for (var row = 0; row < ROWS; row++) {
     grid[row] = [];
  for (var col = 0; col < COLS; col++) {
    grid[row][col] = new Node(row, col);
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
$("#grid").append(g);    // add the grid to html.


// stores nodes to track
var queue = [];
var end = null;

let stepInterval;
// keep stepping
function search() {
    if (queue.length > 0 && end != null) {
        stepInterval = setInterval(step(), 20000);
    }
}

function step() {
    // do one step of the BFS operation
    var current = queue[0];
    for (var i = -1; i < 1; i++) {
        for (var j = -1; j < 1; j++) {
            if (i != 0 && j != 0) {
                var newRow = current.row;
                var newCol = current.col;
            }
        }
    }
    // if end is reached, stop the interval

    clearInterval(stepInterval);
}


function reset() {
    // clear everything
    queue = [];
    end = null;
    for (var row = 0; row < ROWS; row++) {
        grid[row] = [];
        for (var col = 0; col < COLS; col++) {
            grid[row][col].obstacle = false;
            grid[row][col].obstacle = true;
        }
    }
}