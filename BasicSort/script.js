var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

class Graph {
	constructor() {
    	this.x = 0;
        this.y = 0;
        this.width = 400;
        this.height= 300;
        this.elements = [1, 5, 20];
    }
    
    draw(ctx) {
    	var barwidth = width/elements.length;
        var maxbar = Math.max(...this.elements);
        var curr = 0;
        for(i = 0; i < this.elements.length; i++){
            this.drawBar(this.elements[i], i, barwidth, maxbar);
        }
    }

    drawBar(item, index, barwidth, maxbar){
        var height = item/maxbar * height;
        ctx.fillRect(x + index*barwidth, y + this.height - height, barwidth, height);
    }
}

var graph = new Graph();
graph.draw();