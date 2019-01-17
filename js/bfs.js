// 0. Graph object represent as list of members
 
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

let nodes, edges;
let vis_animation = 0;

$(function() {

	viz();
	bsf(G, G[0]);
	
});


//1. Visualization begin
function viz() {

  // create an array with nodes
   nodes = new vis.DataSet([]);
   edges = new vis.DataSet([]);

  for (let i=0; i<G.length; i++) {
  	nodes.add( {id: i, label: G[i].name, font: { size:  18 }, widthConstraint: { minimum: 100 } } );
  }

  // create an array with edges
  for (let i=0; i<G.length; i++) {
  	for (let j=0; j<G[i].neighbors.length; j++) {
  		let to_ind = search(G, G[i].neighbors[j]);
  		edges.add( {from: i, to: to_ind.v_ind, arrows:'to'} );
  	}
  }

  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };

  var options = {

    // Enable this to make the endpoints smaller/larger
    edges: {
      arrows: {
        to: {
          scaleFactor: 1
        }
      }
    }

  };

  var network = new vis.Network(container, data, options);
} 

function repeaint(id, color, fontColor) {
	vis_animation++;
	setTimeout(function(){
			nodes.update({
				id: id, 
				font: { color:  fontColor },
			 	color:{ background:color, border:color,highlight:{background:'red',border:'blue'}}
			 	 });
		}, vis_animation*1200);
}

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

		repeaint(i, "#fff", "#000");
	} 

	s.d = 0;
	s.color = 'G'; // gray
	Q.enqueue(s);

	let t_ind = search(G, s.name);
	repeaint(t_ind.v_ind, "#777", "#000");

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

				repeaint(tmp_node.v_ind, "#777", "#000");
			}
		});
		u.color = 'B';
		steps += 1;

		repeaint(u.v_ind, "#333", "#fff"); 
	}
	console.log(G);
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