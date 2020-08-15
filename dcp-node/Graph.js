class Vertex {
    constructor (val) {
        this._val = val;
        this._color = null;
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
        this._adjList = [];
    }

    get adjList() {
        return this._adjList;
    }

    addVertex(vertex) {
        if (this.findVertexByVal(vertex.val) < 0) {
            this._adjList.push({
                key: vertex, 
                value: []
            });
        }
    }

    addEdge(src, dest) {

        var srcKey = this.findVertexByVal(src.val);
        var destKey = this.findVertexByVal(dest.val);

        if (srcKey < 0) {
            this.addVertex(src);
            console.log("source vertex", src.val, "not found");
        }
        if (destKey < 0) {
            this.addVertex(dest);
            console.log("dest vertex", dest.val, "not found")
        }

        this._adjList[srcKey].value.push(dest);
        this._adjList[destKey].value.push(src);

        console.log("added edge ", src.val, " to ",  dest.val);
    }

    removeEdge(src, dest) {
        // stub 
    }

    removeVertex(vertex) {
        // stub 
    }

    // find vertex in the graph by value, returns key in the adjacency list
    findVertexByVal(val) {
        for (var key in this._adjList) {
            // console.log( " key = ", key, ": ", this._adjList[key].value);
            if (this._adjList[key].key.val === val) {
                // console.log( "found vertex: ", val);
                return key;
            }
        }
        return -1;
    }

    // returns edge list of the given vertex
    findEdgeByVertex(vertex) {
        var key = this.findVertexByVal(vertex.val);
        if (key >= 0) {
            return this._adjList[key].value;
        } else {
            return -1;
        }
    }

    // prints graph to console
    printGraph() {
        for (var entry in this._adjList) {
            console.log(this._adjList[entry]);
        }
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
for (var i = 20; i < 30; i++) {
    vertex = new Vertex(i);
    vertex.color = colors.RED;
    g.addVertex(vertex);

    if (i !== i-5) {
        var key = g.findVertexByVal(i-2);
        if (key >= 0) {
            var adjVertexEntry = g._adjList[key];
            // console.log("vertex",i, " 's adjVertex: ", adjVertexEntry.key.val,  adjVertexEntry.value);
            g.addEdge(vertex, adjVertexEntry.key)

            if (adjVertexEntry.key.color === vertex.color) {
                adjVertexEntry.key.color = colors.BLUE;
            }
        }
    }
    
}

console.log(g.adjList.length);
// g.printGraph();
