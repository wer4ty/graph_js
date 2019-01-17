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

$(function() {

	bsf(G, G[0]);
	viz();
});


//1. Visualization begin
function viz() {

  // create an array with nodes
  var nodes = new vis.DataSet([]);
  var edges = new vis.DataSet([]);

  for (let i=0; i<G.length; i++) {
  	nodes.add( {id: i, label: G[i].name} );
  }

  // create an array with edges
  for (let i=0; i<G.length; i++) {
  	for (let j=0; j<G[i].neighbors.length; j++) {
  		let to_ind = search(G, G[i].neighbors[j]);
  		edges.add( {from: i, to: to_ind.v_ind, arrows:'to'} );
  	}
  }


  // var edges = new vis.DataSet([
  //   {from: 1, to: 2, arrows:'to'},
  //   {from: 2, to: 3, arrows:{
  //     to: {
  //       enabled: true,
  //       type: 'circle'
  //     }
  //   }},
  //   {from: 3, to: 4, arrows:{
  //     to: {
  //       enabled: true,
  //       type: 'bar'
  //     }
  //   }},
  // ]);

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
	}

	s.d = 0;
	s.color = 'G'; // gray
	Q.enqueue(s);

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
			}
		});
		u.color = 'B';
		steps += 1; 
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