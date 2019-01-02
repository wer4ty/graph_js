// 0. Graph object represent as adjscensy list
 
let G = [
	{v: '0', neiborhoods: [ {n:'1', w:4}, {n:'2', w:8}] },
	{v: '1', neiborhoods: [ {n:'2', w:1}, {n:'3', w:8}] },
	{v: '2', neiborhoods: [ {n:'1', w:1},  {n:'3', w:3}] },
	{v: '3', neiborhoods: [] },
];

// helper functions
function search_in_array(arr, name) {
	for (let i =0; i<arr.length; i++) {
		if (arr[i].v == name) return i;
	}
	return -1;
}

function arr_minus_arr(arr1, arr2) {
	let res = [];
	for (let i=0; i< arr1.length; i++) {
		if ( arr2.indexOf(arr1[i]) == -1 ) {
			res.push(arr1[i]);
		}
	}
	return res;
}

function remove_from_arr(arr, v) {
	let ind = arr.indexOf(v);
	if (ind != -1) {
		let t = arr[arr.lenght-1];
		arr[arr.lenght-1] = arr[ind];
		arr[ind] = t;
		arr.pop();
	}
	return arr;
}

function copy_arr1_to_arr2(arr1, arr2) {
	for (let i=0; i<arr1.length; i++) {
		arr2.push(arr1[i]);
	}
	return arr2;
}

// 1. Ford Fulkerson Algorithm (Flow Network Problem)

function Ford_Fulkerson(s,t) {
	// 0. Temporary set of all vertices only names
	let Vertices = [];
	for (let i=0; i< G.length; i++) {
		Vertices.push(G[i].v);
	}
	
	// 1. Init
	
	let N = [], Nf = [];
	for (let i=0; i< G.length; i++) {
		N[i] = {v : G[i].v, neiborhoods: []};
		let not_neiborhoods = [], neiborhoods_names = [G[i].v];
		G[i].neiborhoods.forEach(function(e){
			N[i].neiborhoods.push( {n:e.n, c:e.w, f:0} );
			neiborhoods_names.push(e.n);
		});
		not_neiborhoods = arr_minus_arr(Vertices, neiborhoods_names);
		
		not_neiborhoods.forEach(function(e){
			N[i].neiborhoods.push( {n:e, c:0, f:0} );
		});
	}
	
	copy_arr1_to_arr2(N, Nf);
	//console.log(N);
	//console.log(Nf);
		
	// 3. Find Path in Nf from s to t (BFS with improvment)
	// start index -> 0, destination index -> last elementh in array Nf
	function findPath(start, destination) {
		let Q = [], G_tag = [], path = [];
		let destination_index = -1;
		
		Nf.forEach(function(vertex){
			let v_tag = {v: vertex.v, neiborhoods:vertex.neiborhoods, color:'W', d:Infinity, pi:undefined};
			G_tag.push(v_tag); 
			});
		
		G_tag[0].d = 0;
		G_tag[0].color = 'G';
		Q.push(G_tag[0]);
		
		while (Q.length > 0) {
			let u = Q.shift();
			u.neiborhoods.forEach(function(ver){ 
				let t_ind = search_in_array(G_tag, ver.n);
				let t = G_tag[t_ind];
				let t_capacity = ver.c;
				
				if (t.color === 'W' && t_capacity > 0) {
					t.color = 'G';
					t.d = u.d + 1;
					t.pi = u.v;
					Q.push(t); 
					
					
					if (t.v == destination.v) {
						let x = t;
						while (true) {
							let x_ind = search_in_array(G_tag, x.pi);
							path.push(x.v);
							if (x_ind != -1) {
								x = G_tag[x_ind];
							}
							else {
								break;
							}
						}
					}
				}
			});
			u.color = 'B';
		}
	return 	path;	
	}
	
	
	//4. find bottle neck edge in Path with minimum capacity
	function find_min_capacity_edge(path) {
		let c_min = Infinity;
		for (let i=0; i < path.length-1; i++) {
			let v1 = path[i+1];
			let v2 = path[i];
			
			E.forEach(function(e){
				if (e.v1 == v1 && e.v2 == v2) {
					if (e.w < c_min)  c_min = e.w;
				}
			});
		}
	return c_min;
	}
	
	// dependly on previous calculate flow rebild edges in network Nf
	function rebild_Nf() {
	
	}
	
	let P = [];
	//while (true) {
		
		P = findPath(s,t);
		if (P.length > 0) {
			console.log(P);
			
			let cf_P = find_min_capacity_edge(P);
			console.log(cf_P);
			
			for (let i=0; i < P.length-1; i++) {
			let v1 = P[i+1];
			let v2 = P[i];
			
						
			}
			
		}
		
		//else { break;}
	//}
	
}


$(function() {
	Ford_Fulkerson(G[0], G[G.length-1]);
});

