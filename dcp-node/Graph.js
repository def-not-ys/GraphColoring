class Vertex {
    constructor (val) {
        this._val = val;
        this._color = null;

        console.log("created vertex!");
    }

    set val(v) {
        this._val = v;
    }
    
    get val() {
        return this._val;
    }

    set color(c) {
        this._color = c;
    }

    get color() {
        return this._color;
    }
}

class Graph {

    constructor() {
        this._adjList = {};

        console.log("created graph!");
    }

    addVertex(vertex) {
        if (!this._adjList[vertex]) {
            this._adjList[vertex] = [];
        }
    }

    addEdge(src, dest) {
        if (!this._adjList[src]) {
            this.addVertex(src);
        }
        if (!this._adjList[dest]) {
            this.addVertex(dest);
        }

        this._adjList[src].push(dest);
        this._adjList[dest].push(src);
    }

    removeEdge(src, dest) {
        this._adjList[src] = this._adjList[src].filter(v => v !== dest);
        this._adjList[dest] = this._adjList[dest].filter(v => v !== src);
    }

    removeVertex(vertex) {
        while(this._adjList[vertex]) {
            const adjacentVertex = this._adjList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this._adjList[vertex];
    }

    findVertexByVal(val) {
        // find vertex in the graph by value, return vertex
    }

}

const colors = {
    RED: 'red',
    YELLOW: 'yellow',
    BLUE: 'blue',
    GREEN: 'green'
}


// generate a graph with n random distinct value, no color vertices, returns the graph
function generateGraph(n) {
    graph = new Graph();

    // generate random vertices and add them to graph 

    // generate edges between vertices and add them to graph 
    // loopless 


    return graph;
}

// solve coloring problem in graph, return unsolvable if unsolvable 
function solve(graph) {

}

g = new Graph();
for (var i = 0; i < 10; i++) {
    vertex = new Vertex(i);
    vertex.color = colors.RED;
    console.log(vertex.val, vertex.color)

    g.addVertex(vertex);
}
