// 0. Graph object represent as matrix
 
let G = [
	{v: 's', neiborhoods: [ {n:'a', w:2}, {n:'c', w:6}] },
	{v: 'a', neiborhoods: [ {n:'b', w:4}, {n:'c', w:3}] },
	{v: 'b', neiborhoods: [ {n:'a', w:2}, {n:'d', w:1}] },
	{v: 'c', neiborhoods: [ {n:'b', w:-3},{n:'d', w:4}] },
	{v: 'd', neiborhoods: [] }
];

// helper functions
function search_in_array(arr, name) {
	for (let i =0; i<arr.length; i++) {
		if (arr[i].v == name) return i;
	}
	return -1;
}

// 1. Bellman Ford Algorithm (Shortest Path Problem)

function Bellman_Ford(s) {
	
	// 1. Init part
	let d = [];
	G.forEach(function(vert) {
		d.push({v: vert.v, val:Infinity, pi:undefined});
	});
	
	let init_ind = search_in_array(G, s.v);
	d[init_ind].val = 0;
	
	// 2. Bild order of edges
	let E = [];
	for (let i=0; i< G.length; i++) {
		G[i].neiborhoods.forEach(function(e){
			E.push({v1: G[i].v, v2: e.n, w: e.w});
		});
	}
	
	function relax(u,v,w) {
		let ind_u = search_in_array(d, u);
		let ind_v = search_in_array(d, v);
		
		if (d[ind_v].val > d[ind_u].val + w) {
			d[ind_v].val = d[ind_u].val + w;
			d[ind_v].pi = d[ind_u].v;
		}
	}
	
	// 3. Main loop
	for (let i =0; i < G.length-1; i++) {
		E.forEach(function(e){
			relax(e.v1, e.v2, e.w);
		});
	}
	
	// 4. Final Check (if exist negative circle)
	E.forEach(function(e){
		let ind_u = search_in_array(d, e.v1);
		let ind_v = search_in_array(d, e.v2);
		
		if (d[ind_v].val > d[ind_u].val + e.w) {
			return false;
		}
	});
	
	console.log(d);
	return true;
}


$(function() {
	Bellman_Ford(G[0]);
});
