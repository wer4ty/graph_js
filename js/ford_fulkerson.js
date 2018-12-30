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
	let flow1 = [], flow2 = [], cf1 = [], cf2 = [];
	
	E.forEach(function(e){
		flow1.push( {v1: e.v1, v2: e.v2, val: 0} );
		flow2.push( {v1: e.v2, v2: e.v1, val: 0} );
		cf1.push( {v1: e.v1, v2: e.v2, val: e.w} );
		cf2.push( {v1: e.v2, v2: e.v1, val: -e.w} );
	});
	
	let N = [], Nf = [];
	G.forEach(function(v){ Nf.push(v); N.push(v); });

	// 3. Find Path in Nf from s to t (BFS with improvment)
	// start index -> 0, destination index -> last elementh in array Nf
	function findPath(start, destination) {
		let Q = [], G_tag = [], path = [];
		let destination_index = -1;
		
		Nf.forEach(function(vertex){
			let v_tag = {v: vertex.v, neiborhoods:vertex.neiborhoods, color:'W', d:Infinity, pi:undefined}
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
				
				if (t.color === 'W') {
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
			
			
			flow1.forEach(function(f){ 
				if (f.v1 == v1 && f.v2 == v2) {
				f.val = f.val + cf_P; 
				}
			});
			
			flow2.forEach(function(f){ 
				if (f.v2 == v1 && f.v1 == v2) {
				f.val = f.val - cf_P; 
				}
			});
			
			cf1.forEach(function(f){ 
				if (f.v1 == v1 && f.v2 == v2) {
				f.val = f.val - cf_P; 
				}
			});
			
			cf2.forEach(function(f){ 
				if (f.v2 == v1 && f.v1 == v2) {
				f.val =f.val + cf_P; 
				}
			});
						
			}
			console.log(cf1);
		}
		
		//else { break;}
	//}
	
}


$(function() {
	Ford_Fulkerson(G[0], G[G.length-1]);
});

