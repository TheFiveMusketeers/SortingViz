var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let stepInterval;

class Graph {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 400;
        this.height= 300;
        this.elements = [20, 5, 69, 15, 92, 1, 81, 2];
    }

    draw(ctx, colorMap) {
        ctx.clearRect(0, 0, c.width, c.height);

        var gap = (this.width / this.elements.length) / 10;
        if (gap < 5) { gap = 5; }
        var barwidth = (this.width / this.elements.length);
        var maxbar = Math.max(...this.elements);
        var curr = 0;
        for(var i = 0; i < this.elements.length; i++){
            var item = this.elements[i];
            var height = item/maxbar * this.height;

            if (colorMap != null && colorMap.has(i)) {
                ctx.fillStyle = colorMap.get(i);

                console.log(colorMap);

                ctx.fillRect(this.x + i*barwidth, this.y + this.height - height, barwidth - gap, height);
            } else {
                ctx.strokeRect(this.x + i*barwidth, this.y + this.height - height, barwidth - gap, height);
            }
        }
    }
}

class SelectionSort {
    constructor() {
        this.curr = 0;
        this.inspecting = 0;
        this.min = 0;

        this.currColor = "red";
        this.inspectingColor = "green";
        this.minColor = "blue";

        this.colorMap = new Map();
    }
}

function SelectionStep(data) {
    data.colorMap.clear();
    data.colorMap.set(data.inspecting, data.inspectingColor);
    data.colorMap.set(data.min, data.minColor);
    data.colorMap.set(data.curr, data.currColor);

    graph.draw(ctx, data.colorMap);

    if (data.curr >= graph.elements.length) {
        clearInterval(stepInterval);
        graph.draw(ctx);
        return;
    }
    if (data.inspecting >= graph.elements.length) {
        var temp = graph.elements[data.curr];
        graph.elements[data.curr] = graph.elements[data.min];
        graph.elements[data.min] = temp;

        data.colorMap.clear();

        data.curr++;
        data.inspecting = data.curr;
        data.min = data.curr;

        data.colorMap.set(data.inspecting, data.inspectingColor);
        data.colorMap.set(data.min, data.minColor);
        data.colorMap.set(data.curr, data.currColor);

        return;
    }

    if (graph.elements[data.inspecting] < graph.elements[data.min]) {
        data.min = data.inspecting;
    }

    data.inspecting++;
}


var graph = new Graph();
graph.draw(ctx, null);

var selection = new SelectionSort();
stepInterval = setInterval(SelectionStep, 180, selection);
