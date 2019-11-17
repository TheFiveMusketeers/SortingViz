const COLS = 20;
const ROWS = 20;
var queue = [];

/**
 *
 */
class Node {
    constructor(row, col) {
        this.seen = false;
        this.obstacle = false;
        this.prev = null;
        this.onpath = false;
    }
}

// Create a COLS x ROWS grid
// Represent the grid as a 2-dimensional array
var grid = [];
for (var col = 0; col < COLS; col++) {
     grid[col] = [];
  for (var row = 0; row < ROWS; row++) {
    grid[col][row] = new Node();
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

var pathStart = null;
var pathEnd = null;

document.getElementById("grid").onclick = function(event) {
    if (event.target.localName != "td") {
        return;
    }

    if (pathEnd !== null) {
        pathStart = null;
        pathEnd = null;
        reset();
    }

    if (pathStart === null) {
        pathStart = getTablePos(event.target.id);
        queue.push(pathStart);
        grid[pathStart[0]][pathStart[1]].seen = true;

        refresh();
    } else {
        pathEnd = getTablePos(event.target.id);
        refresh();
    }
}

function getTablePos(id) {
    pos = id.split('rc');
    pos[0] = Number(pos[0]);
    pos[1] = Number(pos[1]);
    return pos;
}

var g = generateGrid(ROWS,  COLS);
// console.log(g);
$("#grid").append(g);    // add the grid to html.


let stepInterval;
// keep stepping
function search() {
    if (queue.length > 0 && pathEnd != null) {
        stepInterval = setInterval(step, 100);
    }
}

function step() {
    // do one step of the BFS operation
    if (queue.length === 0) {
        clearInterval(stepInterval);
    }
    var current = queue.shift();
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if ((i !== 0 && j === 0) ||
                (i === 0 && j !== 0)) {
                var newCol = current[0] + i;
                var newRow = current[1] + j;
                if (newCol === pathEnd[0] && newRow === pathEnd[1]) {
                    clearInterval(stepInterval);
                    grid[pathEnd[0]][pathEnd[1]].prev = current;
                    displayPath(grid[current[0]][current[1]]);
                }
                // in bounds and not seen, and not obstacle
                if (0 <= newCol && newCol < grid.length &&
                        0 <= newRow && newRow < grid[newCol].length &&
                        !grid[newCol][newRow].seen && !grid[newCol][newRow].obstacle) {
                    console.log(newCol + " " + newRow);
                    queue.push([newCol, newRow]);
                    grid[newCol][newRow].prev = current;
                    grid[newCol][newRow].seen = true;
                }
            }
        }
    }

    refresh();
}

function refresh() {
    for (var x = 0; x < COLS; x++) {
        for (var y = 0; y < ROWS; y++) {
            if (grid[x][y].onpath) {
                color = "purple"
            } else if (grid[x][y].seen) {
                color = "gray";
            } else if (grid[x][y].obstacle) {
                color = "black"
            } else {
                color = "white"
            }

            if (pathStart !== null && x === pathStart[0] && y === pathStart[1]) {
                color = "green"
            } else if (pathEnd !== null && x === pathEnd[0] && y === pathEnd[1]) {
                color = "red"
            }

            document.getElementById(x + "rc" + y).style.backgroundColor = color;
        }
    }
}

function displayPath(current) {
    while (current.prev != null) {
        // change color
        console.log(current);
        current.onpath = true;
        current = grid[current.prev[0]][current.prev[1]];
    }
}

function reset() {
    // clear everything
    pathStart = null;
    pathEnd = null;
    queue = [];
    for (var col = 0; col < COLS; col++) {
        grid[col] = [];
        for (var row = 0; row < ROWS; row++) {
            grid[col][row] = new Node();
        }
    }
}
