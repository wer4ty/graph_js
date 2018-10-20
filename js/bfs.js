// 1. Graph object represent as list of members
 
let G = [
	{"name": 's', "neighbors": ['a', 'b', 'c'] },
	{"name": 'a', "neighbors": ['b', 'd'] },
	{"name": 'b', "neighbors": ['c', 'd'] },
	{"name": 'c', "neighbors": ['d', 'e'] },
	{"name": 'd', "neighbors": ['a', 'f', 'g'] },
	{"name": 'e', "neighbors": ['d', 'g'] },
	{"name": 'f', "neighbors": ['a'] },
	{"name": 'g', "neighbors": ['f'] }
];


//2. Algorithms BFS (Bread First Search)  
//get 2 parameters graph G and node s
function bsf(G, s) {

	// 2.1 Create simple API of queue for algorithms needs
	let Q = {
    	values : [],
    	enqueue : function(obj) { values.unshift(obj); },
    	dequeue : function() { if (values.lenth === 0) { return null; }
    	else return  values.shift(); }
	}


	// 2.2 Init
	let d = [];
	let color = [];
	let pi = [];
	for (var i =0; i<G.length; i++) {
		d[i] = Infinity;
		color[i] = 'G' // gray
		pi[i] = null;
	}

	
}


bsf(G, G[0]);