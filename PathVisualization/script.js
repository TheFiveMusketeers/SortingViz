const WIDTH = 20;
const HEIGHT = 10;
var queue = [];

/**
 *
 */
class Node {
    constructor() {
        this.seen = false;
        this.obstacle = false;
        this.prev = null;
        this.onpath = false;
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(o) {
        if (o instanceof Position) {
            return this.x === o.x && this.y === o.y;
        } else {
            return false;
        }
    }
}

function generateGrid() {
    var grid = "<table>";
    for (var y = 0; y < HEIGHT; y++) {
        grid += "<tr>";
        for (var x = 0; x < WIDTH; x++) {
            grid += '<td id="' + x + "rc" + y + '"' + '></td>';
        }
        grid += "</tr>";
    }
    grid += "</table>";
    return grid;
}

var pathStart = null;
var pathEnd = null;

var dragStart = null;

document.getElementById("grid").onmousedown = function(event) {
    console.log("down");
    if (event.target.localName != "td") {
        return;
    }

    dragStart = getTablePos(event.target.id);
    document.getElementById("grid").onmousemove = mouseDrag;
}

function mouseDrag(event) {
    console.log("move");
    if (event.target.localName != "td") {
        return;
    }

    pos = getTablePos(event.target.id);
    if (!pos.equals(dragStart)) {
        nodeAt(pos).obstacle = true;
        nodeAt(dragStart).obstacle = true;
        refresh();
    }
}

document.getElementById("grid").onmouseup = function(event) {
    console.log("up");
    if (event.target.localName != "td") {
        return;
    }

    pos = getTablePos(event.target.id);

    document.getElementById("grid").onmousemove = null;

    if (!pos.equals(dragStart)) {
        // finish drag
        dragStart = null;
        return
    }
    dragStart = null;

    if (pathEnd !== null) {
        pathStart = null;
        pathEnd = null;
        reset();
    }

    if (pathStart === null) {
        pathStart = pos
    } else {
        pathEnd = pos;
    }

    refresh();
}

function getTablePos(id) {
    pos = id.split('rc');
    pos[0] = Number(pos[0]);
    pos[1] = Number(pos[1]);
    return new Position(pos[0], pos[1]);
}

function nodeAt(pos) {
    return grid[pos.x][pos.y];
}

let stepInterval;
// keep stepping
function search() {
    if (pathStart !== null && pathEnd !== null) {
        queue.push(pathStart);
        nodeAt(pathStart).seen = true;
        stepInterval = setInterval(step, 100);
    }
}

function step() {
    // do one step of the BFS operation
    if (queue.length === 0) {
        clearInterval(stepInterval);
        return;
    }

    var current = queue.shift();
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if ((i !== 0 && j === 0) ||
                (i === 0 && j !== 0)) {
                var newPos = new Position(current.x + i, current.y + j);

                if (newPos.equals(pathEnd)) {
                    clearInterval(stepInterval);
                    nodeAt(pathEnd).prev = current;
                    displayPath(current);
                }
                // in bounds and not seen, and not obstacle
                if (isInBounds(newPos)) {
                    console.log(newPos.x + " " + newPos.y);

                    queue.push(newPos);
                    nodeAt(newPos).prev = current;
                    nodeAt(newPos).seen = true;
                }
            }
        }
    }

    refresh();
}

function isInBounds(pos) {
    return 0 <= pos.x && pos.x < WIDTH
        && 0 <= pos.y && pos.y < HEIGHT
        && !nodeAt(pos).seen
        && !nodeAt(pos).obstacle;
}

function refresh() {
    var currPos = new Position(0, 0);

    for (currPos.x = 0; currPos.x < WIDTH; currPos.x++) {
        for (currPos.y = 0; currPos.y < HEIGHT; currPos.y++) {
            var curr = nodeAt(currPos);

            if (currPos.equals(pathStart)) {
                color = "green";
            } else if (currPos.equals(pathEnd)) {
                color = "red";
            } else if (curr.onpath) {
                color = "purple"
            } else if (curr.seen) {
                color = "lightgray"
            } else if (curr.obstacle) {
                color = "black"
            } else {
                color = "white"
            }

            document.getElementById(currPos.x + "rc" + currPos.y).style.backgroundColor = color;
        }
    }
}

function displayPath(currentPos) {
    curr = nodeAt(currentPos);
    while (curr.prev != null) {
        console.log(curr);

        curr.onpath = true;
        curr = nodeAt(curr.prev);
    }
}

function reset() {
    // clear everything
    pathStart = null;
    pathEnd = null;
    queue = [];
    for (var x = 0; x < WIDTH; x++) {
        grid[x] = [];
        for (var y = 0; y < HEIGHT; y++) {
            grid[x][y] = new Node();
        }
    }
}

// Create a WIDTH x HEIGHT grid
// Represent the grid as a 2-dimensional array
var grid = [];
reset();

var g = generateGrid();
// console.log(g);
$("#grid").append(g);    // add the grid to html.
