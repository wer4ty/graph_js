// 0. Graph object represent as list of members
 
 
// TODO Edit graph by user 
// check array nodes and edges why they do not update after changes
 
let G = [
	{"name": 's', "neighbors": ['a', 'b', 'c'], "v_ind": 0 },
	{"name": 'a', "neighbors": ['b', 'd'], "v_ind": 1 },
	{"name": 'b', "neighbors": ['c', 'd'], "v_ind": 2 },
	{"name": 'c', "neighbors": ['d', 'e'], "v_ind": 3 },
	{"name": 'd', "neighbors": ['a', 'f', 'g'], "v_ind": 4 },
	{"name": 'e', "neighbors": ['d', 'g'], "v_ind": 5 },
	{"name": 'f', "neighbors": ['a'], "v_ind": 6 },
	{"name": 'g', "neighbors": ['f'], "v_ind": 7 }
];

$(function() {

	viz();
		
	// controls
	$("#start").click(function(){
		reset();
		rebildGraphViaUserChanges();
		let startNodeName = prompt("Enter name of start vertice ?"); 
		startNode = search(G, startNodeName);
		if (startNode != null) {
			 bsf(G, startNode); 
		}
		else {
			alert("Not found vertice "+startNodeName+" in current graph");
		}
	});
	
	
	
});

//2. Algorithms BFS (Bread First Search)  
//get 2 parameters graph G and node s
function bsf(G, s) {
	
	// 2.1 Create simple API of queue for algorithms needs
	let Q = {
    	values : [],
    	enqueue : function(obj) { Q.values.unshift(obj); },
    	dequeue : function() { if (Q.values.lenth === 0) { return null; }
    	else return  Q.values.pop(); }
	}


	// 2.2 Init
	for (let i =0; i<G.length; i++) {
		G[i].d = Infinity;
		G[i].color = 'W' // white
		G[i].pi = null;

		repeaintAll(G[i].v_ind, "#fff", "#000", "#aaa");	
	}
	insertIntoTable("BFS");
	
	
	s.d = 0;
	s.color = 'G'; // gray
	Q.enqueue(s);

	let t_ind = search(G, s.name);
	repeaint(t_ind.v_ind, "#777", "#000", "#777");

	let steps = 1;
	// 2.3 Alrorithms cycle
	while (Q.values.length != 0) {
		let u = Q.dequeue();
		u.neighbors.forEach(function(v) {
			let tmp_node = search(G, v);
			if (tmp_node.color == 'W') {
				tmp_node.d = u.d + 1;
				tmp_node.pi = u;
				tmp_node.color = 'G';
				Q.enqueue(search(G, v));

				repeaint(tmp_node.v_ind, "#777", "#000", "#777");
				
			}
		});
		u.color = 'B';
		steps += 1;

		let pi_name;
		if (u.pi == null) { pi_name = "NIL"; }
		else { pi_name = u.pi.name; }
		repeaint(u.v_ind, "#333", "#fff", "#333");
		insertIntoTable("BFS");
	}
	console.log(G);
	finish_flag = true;
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