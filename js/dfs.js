// 0. Graph object represent as list of members
 
let G = [
	{"name": 'a', "neighbors": ['d', 'g'] },
	{"name": 'b', "neighbors": ['a'] },
	{"name": 'c', "neighbors": ['b'] },
	{"name": 'd', "neighbors": ['g', 'h'] },
	{"name": 'e', "neighbors": ['f', 'b', 'h'] },
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
let wood = [];
let E = [];

//1. Algorithms DFS (Depth First Search)  
//get 1 parameters graph G and node s
function dfs(G) {

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
	}
	else if (v.color == 'B') { edge.type =   "Forward/Default";  }

	if (search(E, "("+u.name+","+v.name+")") === null) { E.push(edge); }
}

function topologicalSort(G) {
	console.log("Topological Sort:");
	dfs(G);
	sorting_via_f(G);

	for(let i=0; i<G.length; i++) {
		console.log(G[i].name);
	}
}

// Algorithm Kosaraju-Sharir (Divide Graph to Strongly Connected Component)

function GSCC() {
	dfs(G);

	let G_T = [];

	G.forEach(function(u){
		u.neighbors.forEach(function(v){
			let t = search(G_T, v);
			if (t == null) {
				G_T.push({"name": v, "neighbors":[u.name]});
			}
			else {
				t.neighbors.push(u.name); 
			}
		});
	});

	sorting_via_f(G);

	let G2 = [];
	for(let i=0; i<G.length; i++) {
		G[i].color = 'W';
		G_T[i].color = 'W';
	}
	time = 0;

	function myDFS_Visit(G,u) {
	let t = search(G_T, u.name);
	t.color = 'G'; // gray
	time++;
	t.d = time;

	t.neighbors.forEach(function(v) {
		let tmp = search(G, v);
		if (tmp.color == 'W') {
			tmp.pi = t;
			DFS_Visit(G, tmp);
		}
	});

	t.color = 'B';
	time++;
	t.f = time;
}

	G.forEach(function(v) {
		if (v.color == 'W') {
		myDFS_Visit(G_T, v);
		}
	});

	console.log(G_T);
}


$(function() {
	GSCC(G);
	// dsf(G_no_circle);
	// console.log("Result graph G after DFS");
	// console.log(G_no_circle);
	// console.log(E);

	// if (hasCircle) { console.log("Graph G has a circle") }
	// else {
	// 	console.log("Graph G has not  a circle");
	 //	topologicalSort(G_no_circle);
	// } 
});