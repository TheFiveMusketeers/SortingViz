var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let stepInterval;

class Graph {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 750;
        this.height= 350;
        this.elements = [109, 109, 109, 109, 109, 121, 64, 60, 23, 147, 127, 184, 11, 166, 71, 115, 158, 10, 85, 98, 37, 15, 12, 195, 21, 151, 50, 138, 179, 167, 173, 180, 183, 65, 120, 190, 144, 72, 39, 62, 47, 84, 57, 77, 63, 181, 104, 175, 56, 154, 145, 89, 55, 153, 116, 97, 58, 126, 3, 139, 24, 100, 199, 27, 163, 140, 76, 137, 161, 66, 132, 200, 101, 92, 90, 29, 52, 8, 129, 152, 130, 54, 13, 107, 136, 160, 196, 171, 133, 75, 59, 83, 146, 20, 188, 103, 157, 53, 26, 78];
    }

    draw(ctx, colorMap) {
        ctx.clearRect(0, 0, c.width, c.height);

        var gap = (this.width / this.elements.length) / 10;
        if (gap < 1) { gap = 1; }
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

function Reset() {
    graph = new Graph();
    selection = new SelectionSort();
    clearInterval(stepInterval);
    graph.draw(ctx, null);
}

function Start() {
    stepInterval = setInterval(SelectionStep, 0, selection);
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


let graph;
let selection;

Reset();
