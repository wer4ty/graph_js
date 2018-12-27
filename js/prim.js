// 0. Graph object represent as matrix
 
let G = [
	{v: 'a', neiborhoods: [ {n:'b', w:5}, {n:'c', w:6}, {n:'d', w:7}] },
	{v: 'b', neiborhoods: [ {n:'a', w:5}, {n:'c', w:2}, {n:'d', w:3}] },
	{v: 'c', neiborhoods: [ {n:'a', w:6}, {n:'b', w:2}, {n:'d', w:2}, {n:'e', w:1}] },
	{v: 'd', neiborhoods: [ {n:'a', w:7}, {n:'b', w:3}, {n:'c', w:2}, {n:'e', w:4}] },
	{v: 'e', neiborhoods: [ {n:'c', w:1}, {n:'d', w:4}] }
];

// 1. Prim Algorithm (MST Problem)

function Prim(s) {
	
		// 1. Init
		let d = [];
		let S = [], T = [], Q=[];
		
		for (let i=0; i<G.length; i++) {
			let k = G[i].v;
			d.push({v: k, val: Infinity, pi: undefined });	
		}
		
		S.push(s.v);
		
		s.neiborhoods.forEach(function(obj) {
			let ind = search_in_d(obj.n);
			if ( ind != -1 ) {
				d[ind].val = obj.w;
				d[ind].pi = s.v;
			}
		});
		
		for (let i =0; i< d.length; i++) {
			Q.push(d[i]);
		}

		
		// helper functions
		function search_in_d(name) {
			for (let i =0; i<d.length; i++) {
				if (d[i].v == name) return i;
			}
			return -1;
		}
		
		function search_in_G(name) {
			for (let i =0; i<G.length; i++) {
				if (G[i].v == name) return i;
			}
			return -1;
		}
		
		function extractMin() {
			let min = Q[0].val, ind = 0, minV = Q[0];
			for (let i =0; i< Q.length; i++) {
				if (min > Q[i].val) { min = Q[i].val; minV = Q[i]; ind = i; }
			}
			
			let t = Q[Q.length-1];
			Q[Q.length-1] = Q[ind];
			Q[ind] = t;
			Q.pop();
			
			return minV;
		}
		
		// 2. Main Loop
		while (Q.length > 0) {
			let u = extractMin();

			S.push(u.v);
			T.push({edge: u.pi+"-"+u.v});
			
			let p = search_in_G(u.v);
				for (let i=0; i< G[p].neiborhoods.length; i++) {
					let is_in_S = S.indexOf(G[p].neiborhoods[i].n);
					let ind = search_in_d(G[p].neiborhoods[i].n);
					if (is_in_S == -1 && v.w < d[ind]) {
						d[ind].val = G[p].neiborhoods[i].w;
						d[ind].pi = G[p].v;
					}					
				}
			console.log(d);
		}
		
		//console.log(T);
}


$(function() {
	Prim(G[0]);
});
