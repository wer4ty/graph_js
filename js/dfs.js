// 0. Graph object represent as list of members
 
let G = [
	{"name": 'a', "neighbors": ['d', 'g'] },
	{"name": 'b', "neighbors": ['a'] },
	{"name": 'c', "neighbors": ['b'] },
	{"name": 'd', "neighbors": ['g', 'h'] },
	{"name": 'e', "neighbors": ['f', 'h'] },
	{"name": 'f', "neighbors": ['c', 'e'] },
	{"name": 'g', "neighbors": ['d'] },
	{"name": 'h', "neighbors": ['g'] }
];

let G_no_circle = [
	{"name": 'a', "neighbors": ['b', 'c'] },
	{"name": 'b', "neighbors": ['c', 'd', 'e'] },
	{"name": 'c', "neighbors": ['e', 'f'] },
	{"name": 'd', "neighbors": ['e'] },
	{"name": 'e', "neighbors": ['f'] },
	{"name": 'f', "neighbors": [] }
];

let time, hasCircle = false;

let E = [];

//1. Algorithms DFS (Depth First Search)  
//get 1 parameters graph G and node s
function dsf(G) {

	// 1.1 Init
	for (let i =0; i<G.length; i++) {
		G[i].d = 0;
		G[i].f = 0;
		G[i].color = 'W' // white
		G[i].pi = null;
	}

	time = 0;

	// 1.2 Alrorithms cycle
	G.forEach(function(v) {
		if (v.color == 'W') {
		DFS_Visit(G, v);
		}
	});
}

// 1.3 Recursively function DFS_Visit
function DFS_Visit(G,u) {
	u.color = 'G'; // gray
	time++;
	u.d = time;

	u.neighbors.forEach(function(v) {
		let tmp = search(G, v);
		edgeType(u, tmp);
		if (tmp.color == 'W') {
			tmp.pi = u;
			DFS_Visit(G, tmp);
		}
	});

	u.color = 'B';
	time++;
	u.f = time;
}

//search in array helper function
function search(arr, value) {
	for (let i =0; i<arr.length; i++) {
		if (arr[i].name === value) {
			return arr[i];
		}
	}
	return null;
}

function sorting_via_f(G) {
	for(let i=0; i<G.length; i++) {
		for(let j=i; j<G.length; j++) {
			if (G[i].f < G[j].f ) {
				let tmp = G[j];
				G[j] = G[i];
				G[i] = tmp;
			}
		}
	}
}

// determine edge type on runtime
function edgeType(u,v) {
	let edge =  {name:"("+u.name+","+v.name+")", type: "None"};

	if (v.color == 'W')  { edge.type = "Tree"; }
	else if (v.color == 'G') {
	 edge.type =  "Backward"; 
	 hasCircle = true;
	 console.log(edge);
	}
	else if (v.color == 'B') { edge.type =   "Forward/Default";  }

	if (search(E, "("+u.name+","+v.name+")") === null) { E.push(edge); }
}

function topologicalSort(G) {
	console.log("Topological Sort:");
	dsf(G);
	sorting_via_f(G);

	for(let i=0; i<G.length; i++) {
		console.log(G[i].name);
	}
}

$(function() {
	dsf(G_no_circle);
	console.log("Result graph G after DFS");
	console.log(G_no_circle);
	console.log(E);

	if (hasCircle) { console.log("Graph G has a circle") }
	else {
		console.log("Graph G has not  a circle");
		topologicalSort(G_no_circle);
	} 
});
