// 0. Graph object represent as matrix
 
let G = [
	{v: 's', neiborhoods: [ {n:'a', w:10}, {n:'b', w:5}] },
	{v: 'a', neiborhoods: [ {n:'b', w:2}, {n:'c', w:1}] },
	{v: 'b', neiborhoods: [ {n:'a', w:3}, {n:'c', w:9}, {n:'d', w:2}] },
	{v: 'c', neiborhoods: [ {n:'d', w:4}] },
	{v: 'd', neiborhoods: [ {n:'s', w:7}, {n:'c', w:6}] }
];


// helper functions
		function search_in_array(arr, name) {
			for (let i =0; i<arr.length; i++) {
				if (arr[i].v == name) return i;
			}
			return -1;
		}

// 1. Dijkstra Algorithm (Shortest Path Problem)

function Dijkstra(s) {
	
		// 1. Init
		let d = [];
		let S = [], Q=[];
		
		for (let i=0; i<G.length; i++) {
			let k = G[i].v;
			d.push({v: k, val: Infinity, pi: undefined });
		}
		
		let init_ind = search_in_array(d, s.v);
		d[init_ind].val = 0;
		
		s.neiborhoods.forEach(function(obj) {
			let ind = search_in_array(d,obj.n);
			if ( ind != -1 ) {
				d[ind].val = obj.w;
				d[ind].pi = s.v;
			}
		});
		
		// build heap (not real heap)
		for (let i =1; i< d.length; i++) {
			Q.push(d[i]);
		}
		
		function extractMin() {
			let min = Q[0].val, ind = 0, minV=Q[0];
			for (let i =0; i< Q.length; i++) {
				if (min > Q[i].val) { min = Q[i].val; minV = Q[i]; ind = i; }
			}
			
			let t = Q[Q.length-1];
			Q[Q.length-1] = Q[ind];
			Q[ind] = t;
			Q.pop();
			
			return minV;
		}
		
		// 2. Relax Function
		function relax(u,v) {
			let ind_x = search_in_array(d,v.n);
			let ind_y = search_in_array(d, u.v);
			if (d[ind_x].val > v.w + d[ind_y].val) {
				d[ind_x].val = v.w + d[ind_y].val;
				d[ind_x].pi = u.v;
			}
		}
		
		// 3. Main Loop
		while (Q.length > 0) {
			let u = extractMin();
			S.push(u.v);
			
			let ind = search_in_array(G, u.v);
			if (ind != -1) {
				G[ind].neiborhoods.forEach(function(v){
					relax(G[ind], v);
				});
			}
		}
	
	console.log(d);
	console.log(S);
	
	return d;
}


//$(function() {
	Dijkstra(G[0]);
//});

// reload each 5 seconds
/*setInterval(function(){
	window.location.href = window.location.href;
}, 50000);*/
