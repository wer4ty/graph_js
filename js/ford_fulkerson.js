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
		for (let i=path.length-1; i >= 0; i--) {
			let v1 = path[i+1];
			let v2 = path[i];
			
			for(let i=0; i<N.length; i++) {
				if (v1 === N[i].v) {
					for(let j=0; j<N[i].neiborhoods.length; j++) {
						if (v2 === N[i].neiborhoods[j].n) {
							if (c_min > N[i].neiborhoods[j].c) {
								c_min = N[i].neiborhoods[j].c;
							}
						}
					}
				}
			}
			
		}
	return c_min;
	}

	// 5. update flow in root flow network via changing f in N
	function update_f_in_N(path, Cf_P) {
		for (let i=path.length-1; i >= 0; i--) {
			let v1 = path[i+1];
			let v2 = path[i];
			
			for(let i=0; i<N.length; i++) {
				for(let j=0; j<N[i].neiborhoods.length; j++) {

					// "+" -->
					if (v1 === N[i].v && v2 === N[i].neiborhoods[j].n) {
						N[i].neiborhoods[j].f = N[i].neiborhoods[j].f + Cf_P;
					}

					// "-" -->
					if (v2 === N[i].v && v1 === N[i].neiborhoods[j].n) {
						N[i].neiborhoods[j].f = N[i].neiborhoods[j].f - Cf_P;
					}
				}
			}
		}
	}

	// 6. update capacity in recedual flow network via changing c in Nf
	function update_c_in_Nf(path, Cf_P) {
		for (let i=path.length-1; i >= 0; i--) {
			let v1 = path[i+1];
			let v2 = path[i];
			
			for(let i=0; i<Nf.length; i++) {
				for(let j=0; j<Nf[i].neiborhoods.length; j++) {

					// "-" -->
					if (v1 === Nf[i].v && v2 === Nf[i].neiborhoods[j].n) {
						Nf[i].neiborhoods[j].c = Nf[i].neiborhoods[j].c - Cf_P;
					}

					// "-" -->
					if (v2 === Nf[i].v && v1 === Nf[i].neiborhoods[j].n) {
						Nf[i].neiborhoods[j].c = Nf[i].neiborhoods[j].c + Cf_P;
					}
				}
			}
		}
	}
		
	let P = [], fMax = 0;
	while (true) {
		
		P = findPath(s,t);
		if (P.length > 0) {
			
			let cf_P = find_min_capacity_edge(P);
			fMax += cf_P;

			update_f_in_N(P, cf_P);
			update_c_in_Nf(P, cf_P);
			
		}
		
		else { break;}
	}
	console.log(fMax);
	return fMax;
	
}


$(function() {
	Ford_Fulkerson(G[0], G[G.length-1]);
});

