// 0. Graph object represent as list of members
 
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

//1. Visualization begin
function vizInit(G) {
	let left = 100;
	let top = 20;
	for (let i=0; i<G.length; i++) {
		$(".container").append("<div class='node' id='"+G[i].name+"'>"+G[i].name+"</div> ");
		$("#"+G[i].name).css({"left":left, "top": top});
		left = left + 50;
		top = top + 50;
	}
} 

//2. Algorithms BFS (Bread First Search)  
//get 2 parameters graph G and node s
function bsf(G, s) {

	// 2.1 Create simple API of queue for algorithms needs
	let Q = {
    	values : [],
    	enqueue : function(obj) { Q.values.unshift(obj); },
    	dequeue : function() { if (Q.values.lenth === 0) { return null; }
    	else return  Q.values.shift(); }
	}


	// 2.2 Init
	for (let i =0; i<G.length; i++) {
		G[i].d = Infinity;
		G[i].color = 'W' // white
		G[i].pi = null;
	}

	s.d = 0;
	s.color = 'G'; // gray
	Q.enqueue(s);

	let steps = 1;
	// 2.3 Alrorithms cycle
	while (Q.values.length != 0) {
		let u = Q.dequeue();
		console.log(steps);
		console.log(G);
		u.neighbors.forEach(function(v) {
			let tmp_node = search(G, v);
			if (tmp_node.color === 'W') {
				tmp_node.d = u.d + 1;
				tmp_node.pi = u;
				tmp_node.color = 'G';
				Q.enqueue(search(G, v));
			}
		});
		u.color = 'B';
		steps += 1; 
	}
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

$(function() {

	vizInit(G);
	bsf(G, G[0]);

});
