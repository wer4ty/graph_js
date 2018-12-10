// 0. Graph object represent as list of members
 
let G = [
	{"name": 'a', "neighbors": ['d', 'g'] },
	{"name": 'b', "neighbors": ['a'] },
	{"name": 'c', "neighbors": ['b'] },
	{"name": 'd', "neighbors": ['g', 'h'] },
	{"name": 'e', "neighbors": ['f', 'h'] },
	{"name": 'f', "neighbors": ['c', 'e'] },
	{"name": 'g', "neighbors": ['d'] },
	{"name": 'h', "neighbors": ['g'] },
];

let time;

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

// determine edge type on runtime
function edgeType(u,v) {
	if (v.color == 'W') { E.push({name:"("+u.name+","+v.name+")", type: "Tree"}); }
	else if (v.color == 'G') { E.push({name:"("+u.name+","+v.name+")", type: "Backward"}); }
	else if (v.color == 'B') { E.push({name:"("+u.name+","+v.name+")", type: "Forward/Default"}); }
}

$(function() {
	dsf(G);
	console.log(G);
	console.log(E);
});
