// 0. Graph object represent as matrix

let V = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
let E = [ 
	{edge: "a-b", w: 4},
	{edge: "a-c", w: 8},
	{edge: "b-c", w: 9},
	{edge: "b-d", w: 7},
	{edge: "a-e", w: 7},
	{edge: "c-e", w: 7},
	{edge: "c-f", w: 1},
	{edge: "d-e", w: 2},
	{edge: "e-f", w: 6},
	{edge: "d-g", w: 4},
	{edge: "f-g", w: 2}
]	
	
 
let G = {vertises: V, edges: E};


// 1. Kruskal Algorithm (MST Problem)

function Kruskal() {
		let T = [];
		let DSS = [];
		
		// 1. sort edges to increasing order
		function insertion_sort() {	
			let t, j, key;
			for (let i = 1; i < G.edges.length; i++) {
				j = i-1;
				key = G.edges[i].w;
				while (j >= 0 && G.edges[j].w > key) {
					t = G.edges[j+1];
					G.edges[j+1] = G.edges[j];
					G.edges[j] = t;
					j--;
				}
				
			}
		}
		
		
		
		// 2. init DSS structure and base functionality of DSS
		function init_DSS() {
			V.forEach(function(v) {
				DSS.push({name: v, set:[v]});
			});
		}
		
		function find(u) {
			for (let i =0; i<DSS.length; i++) {
				for (let j=0; j < DSS[i].set.length; j++) {
					if (u === DSS[i].set[j]) { return DSS[i]; }
				}
			}
		}
		
		function merge(u,v) {
			v.set.forEach(function(t){
				u.set.push(t);
			});
			let i = DSS.indexOf(v);
			let t = DSS[DSS.length-1];
			DSS[i] = t;
			DSS[DSS.length-1] = v;
			DSS.pop();
			
		}
		
		insertion_sort();
		init_DSS();
		
		// 3. Main loop of algorithm
		G.edges.forEach(function(e) {
			let spl = e.edge.split('-');
			let a = find(spl[0]);
			let b = find(spl[1]);
			
			if (a.name != b.name) {
				T.push(e);
				merge(a,b);
			}
		});
		
		console.log(T);
		return T;
		
		
		
		
}


$(function() {
	Kruskal();
});
