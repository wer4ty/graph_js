// 0. Graph object represent as matrix
 
let G = [
	{v: 's', neiborhoods: [ {n:'a', w:16}, {n:'c', w:13}] },
	{v: 'a', neiborhoods: [ {n:'b', w:12}, {n:'c', w:10}] },
	{v: 'b', neiborhoods: [ {n:'c', w:9},  {n:'t', w:20}] },
	{v: 'c', neiborhoods: [ {n:'a', w:4},  {n:'d', w:14}] },
	{v: 'd', neiborhoods: [ {n:'b', w:7},  {n:'t', w:4}] },
	{v: 't', neiborhoods: [] }
];

// helper functions
function search_in_array(arr, name) {
	for (let i =0; i<arr.length; i++) {
		if (arr[i].v == name) return i;
	}
	return -1;
}

// 1. Ford Fulkerson Algorithm (Flow Network Problem)

function Ford_Fulkerson(s,t) {
	
	// 1. Bild set of edges
	let E = [];
	for (let i=0; i< G.length; i++) {
		G[i].neiborhoods.forEach(function(e){
			E.push({v1: G[i].v, v2: e.n, w: e.w});
		});
	}
	
	// 2. Init
	let f = [];
	E.forEach(function(e){
		f.push( {v1: e.v1, v2: e.v2, c: 0} );
		f.push( {v1: e.v2, v2: e.v1, c: 0} );
	});
	
	let N = [], Nf = [];
	G.forEach(function(v){ Nf.push(v); N.push(v); });

	// 3. Find Path in Nf from s to t
	// start index -> 0, destination index -> last elementh in array Nf
	function findPath(start, destination) {
		let path = [], Q = [];
		
		for ( let i=0; i<Nf.length-1; i++) {
			path.push(Nf[i]);
			
			while(path.length > 0) {
				for ( let i=0; i<Nf.length-1; i++) {
			}
		}
		
	}
	
	findPath(s,t);
}


$(function() {
	Ford_Fulkerson(G[0], G[length-1]);
});
