// 0. Graph object represent as list of members
 
let G = [
	{"name": 'a', "neighbors": ['d', 'g'], "v_ind": 0 },
	{"name": 'b', "neighbors": ['a'], "v_ind": 1 },
	{"name": 'c', "neighbors": ['b'], "v_ind": 2 },
	{"name": 'd', "neighbors": ['g', 'h'], "v_ind": 3 },
	{"name": 'e', "neighbors": ['f', 'b', 'h'], "v_ind": 4 },
	{"name": 'f', "neighbors": ['c', 'e'], "v_ind": 5 },
	{"name": 'g', "neighbors": ['d'], "v_ind": 6 },
	{"name": 'h', "neighbors": ['g'], "v_ind": 7 }
];

let G_no_circle = [
	{"name": 'a', "neighbors": ['b', 'c'], "v_ind": 0 },
	{"name": 'b', "neighbors": ['c', 'd', 'e'], "v_ind": 1 },
	{"name": 'c', "neighbors": ['e', 'f'], "v_ind": 2 },
	{"name": 'd', "neighbors": ['e'], "v_ind": 3 },
	{"name": 'e', "neighbors": ['f'], "v_ind": 4 },
	{"name": 'f', "neighbors": [], "v_ind": 5 }
];

let time, hasCircle = false;
let sc_components = []
let E = [];

$(function() {
	//GSCC(G);

	viz();

	// controls
	$("#start").click(function(){
		reset();
		rebildGraphViaUserChanges();
		dfs(G); 
	});

});


//1. Algorithms DFS (Depth First Search)  
//get 1 parameters graph G and node s
function dfs(G) {

	// 1.1 Init
	for (let i =0; i<G.length; i++) {
		G[i].d = 0;
		G[i].f = 0;
		G[i].color = 'W' // white
		G[i].pi = null;

		repeaintAll(G[i].v_ind, "#fff", "#000", "#aaa");
	}
	insertIntoTable("DFS");
		
	time = 0;

	// 1.2 Alrorithms cycle
	G.forEach(function(v) {
		if (v.color == 'W') {
		DFS_Visit(G, v);
		}
	});

	console.log(G);
}

// 1.3 Recursively function DFS_Visit
function DFS_Visit(G,u) {
	u.color = 'G'; // gray
	time++;
	u.d = time;
	repeaint(u.v_ind, "#777", "#000", "#777");

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
	insertIntoTable("DFS");
	repeaint(u.v_ind, "#333", "#fff", "#333");
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
				G_T.push({"name": v, "neighbors":[u.name], "pi": undefined});
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

	function myDFS_Visit(G,t,w) {
	t.color = 'G'; // gray
	time++;
	t.d = time;

	t.neighbors.forEach(function(v) {
		let tmp = search(G, v);
		if (tmp.color == 'W') {
			tmp.pi = t;
			sc_components[w].push(tmp.name);
			myDFS_Visit(G, tmp, w);
		}
	});

	t.color = 'B';
	time++;
	t.f = time;
}

	let w = -1;
	G.forEach(function(v) {
	
		let t = search(G_T, v.name);
		if (t.color == 'W') {
			w++;
			sc_components[w] = [t.name];
			myDFS_Visit(G_T, t, w);
		}
	});

	console.log("Strongly connected Components: ",sc_components);
	
}