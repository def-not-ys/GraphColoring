const Queue = require('./Queue.js');

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

    constructor(n, maxDegree) {
        this._adjList = [];
        this._maxDegree = maxDegree;
        this.generateGraph(n, maxDegree)
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
        
        if (src.val === dest.val) {
            return; // loopless graph
        }

        var srcKey = this.findVertexByVal(src.val);
        var destKey = this.findVertexByVal(dest.val);

        if (!this.hasEdge(srcKey, destKey, src, dest)) {

            if (srcKey < 0) {
                this.addVertex(src);
                // console.log("source vertex", src.val, "not found");
            }
            if (destKey < 0) {
                this.addVertex(dest);
                // console.log("dest vertex", dest.val, "not found")
            }

            this._adjList[srcKey].value.push(dest);
            this._adjList[destKey].value.push(src);

            // console.log("added edge ", src.val, " to ",  dest.val);
        }
    }

    hasEdge(srcKey, destKey, src, dest) {
        if(srcKey >= 0 && destKey >= 0) {
            var edges = this.findEdgeByVertex(src);

            for (var i = 0; i < edges.length; i++) {
                var v = edges[i];
                if (v.val === dest.val) {
                    return true;
                }
            }
        } 
        return false;
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

    // generate a graph with n random distinct value[0, n-1], default color vertices, returns the graph
    generateGraph(n, maxDegree) {
        var m = 0;
        // generate n vertices and add them to graph 
        for (var i = 0; i < n; i++) {
            vertex = new Vertex(i);
            vertex.color = -1;
            this.addVertex(vertex);       
        }
        // generate edges between vertices and add them to graph 
        for (var entry in this.adjList) {
            var d = randomInteger(1, maxDegree); // connected graph 

            // console.log("degree:", d);

            var vertex = this.adjList[entry].key;
            for (var i = 1; i <= d; i++) {
                var x = randomInteger(0, n-1);
                var neighbourKey = this.findVertexByVal(x); // choose a random vertex
                var neighbour = this.adjList[neighbourKey].key;

                if (this.findEdgeByVertex(neighbour).length < maxDegree) {
                    this.addEdge(vertex, neighbour);
                    m++;
                }            

                if (this.findEdgeByVertex(vertex).length >= maxDegree) {
                    break;
                }
            }
        }

        console.log("generated graph with", n, "vertices and", m , "edges");
    }

    // solve coloring problem in graph, returns unsolvable if unsolvable 
    solve() { 
        let queue = new Queue();
        var start = this.adjList[0].key;
        queue.enqueue(start);

        while (!queue.isEmpty()) {
            var vertex = queue.dequeue().data;
            var edges = this.findEdgeByVertex(vertex);
            var colors = generateColors(this._maxDegree);

            // console.log("reset colors: ", colors);

            for (var e in edges) {
                if (edges[e].color >= 0) {
                    colors.delete(edges[e].color);
                    // console.log("delete neighbouts'color: ", edges[e].color);
                } else {
                    queue.enqueue(edges[e]);
                }
            }

            // console.log("after checking neighbouts'colors: ", colors);

            console.assert(colors.size > 0);

            // const it = colors.values();
            // console.log(it.next.value);

            // console.log(Array.from(colors));

            vertex.color = Array.from(colors)[0];
                    
        }

        console.log("graph solved!")

        this.printGraph();

    }

}
// generate random integer in [min, max]
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generates a set of colors with d distinct colors
function generateColors(d) {
    let set = new Set();   
    for (var i = 0; i < d; i++) {
        set.add(i);
    }
    return set;
}


let graph = new Graph(500,400);
graph.solve();

