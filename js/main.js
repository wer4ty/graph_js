// 0. Graph object represent as list of members
 
 
// TODO Edit graph by user 
// check array nodes and edges why they do not update after changes
 
let finish_flag = false, startNode;
let nodes, edges, t_head, tr;
let vis_animation = 0, table_animation = 0, tr_id = 0;
let initial_color = "#7ebde5", initial_border_color = "#72a6f9";

function reset() {
	if (finish_flag) {
		vis_animation = 0; table_animation= 0; tr_id=0;
		$("#tbody tr").remove();
		finish_flag = false;
	}
}

// 0. Rebild Graph via user changes
function rebildGraphViaUserChanges() {
	G = [];
	

	function NodeIdToLabel(id) {
		let tmp;
		nodes.forEach(function(n){
			if (n.id == id) { tmp = n.label;  return n.label; }
		});
		return tmp;
	}
	
	function searchIdInEdges(id) {
		let res = [];
		edges.forEach(function(e){
			if (e.from == id) { res.push(e.to); }
		});
		return res;
	}
	
	let obj, counter=0;
	
	nodes.forEach(function(n){  
			obj = {name: undefined, "neighbors": [], v_ind:undefined };
			obj.name = n.label;
			obj.v_ind = n.id;
			let tmp_neibors = searchIdInEdges(n.id);
			for (let j=0; j<tmp_neibors.length; j++) {
				obj.neighbors.push(NodeIdToLabel(tmp_neibors[j]));
			}
			G[counter] = obj;
			counter++;
	
	});
	console.log(G);
	tableHead();
}


//1. Visualization begin
function viz() {

// GRAPH ---------------------------------------------------------------------------------------------------------
  // create an array with nodes
   nodes = new vis.DataSet([]);
   edges = new vis.DataSet([]);

   
  for (let i=0; i<G.length; i++) {
  	nodes.add( {id: i.toString(), label: G[i].name, font: { size:  11 }, widthConstraint: { minimum: 60 }, physics: false, color:{ background:initial_color, border:initial_border_color } }
	);
  }

  // create an array with edges
  for (let i=0; i<G.length; i++) {
  	for (let j=0; j<G[i].neighbors.length; j++) {
  		let to_ind = search(G, G[i].neighbors[j]);
  		edges.add( {from: i.toString(), to: to_ind.v_ind.toString(), arrows:'to', length: 40} );
  	}
  }
  

  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };

  var options = {
	manipulation: { enabled: true,
		addNode: function(nodeData,callback) {
			var nodeName = prompt("Name of new node ?");
		  nodeData.label = nodeName;
		  nodeData.physics = false;
		  callback(nodeData);
		},
		
		addEdge: function(edgeData,callback) {
			var directed = confirm("Directed Edge ?");
		  if (directed) { edgeData.arrows = 'to'; }
		  if (edgeData.from === edgeData.to) {
			var r = confirm("Do you want to connect the node to itself?");
			if (r === true) {
			  callback(edgeData);
			}
		  }
		  else {
			callback(edgeData);
		  }
		}

	}
  };

  var network = new vis.Network(container, data, options);
  
  let parentWidth = $("#mynetwork").parent().width();
  $("#mynetwork").resizable({ maxWidth: parentWidth, minHeight: 200, minWidth: 200 });

   tableHead();
} 

function repeaint(id, color, fontColor, borderColor) {
	vis_animation++;
	setTimeout(function(){
			nodes.update({
				id: id, 
				font: { color:  fontColor },
			 	color:{ background:color, border:borderColor,highlight:{background:'red',border:'blue'}}
			 	 });
		}, vis_animation*1000);
}

function repeaintAll(id, color, fontColor, borderColor) {
			nodes.update({
				id: id, 
				font: { color:  fontColor },
			 	color:{ background:color, border:borderColor}
			 	});
}

function tableHead() {
  $("#thead tr").remove();
  t_head = "<tr><th scope='col'>#</th>";
  for (let i=0; i<G.length; i++) { 
	t_head+="<th scope='col'>"+G[i].name+"</th>";
	tr+= "<td>-<br>-</td>";	
  }
  t_head += "</tr>";
  tr += "</tr>";
  
  $("#thead").append(t_head);
}

function insertIntoTable(type) {
	$("#tbody #"+tr_id).delay(tr_id*1500).show( "highlight", 1000);

	if (type == "BFS") {
		let di, pi;
		tr_id++;
		tr = "<tr id="+tr_id+"><th scope='row'>d<br>&pi;</th>";
		for (let i =0; i<G.length; i++) {
			
			if (G[i].d == Infinity) { di = "Infinity";  }
			else { di = G[i].d; }
			if (G[i].pi == null) { pi = "Nil";  }
			else { pi = G[i].pi.name; }
			
			tr += "<td>"+di+"<br>"+pi+"</td>";
		}
		tr += "</tr>";
	}

	if (type == "DFS") {
		let di, f, pi;
		tr_id++;
		tr = "<tr id="+tr_id+"><th scope='row'>d / f<br>&pi;</th>";
		for (let i =0; i<G.length; i++) {
			
			if (G[i].d == Infinity) { di = "Infinity";  }
			else { di = G[i].d; }
			if (G[i].f == Infinity) { f = "Infinity";  }
			else { f = G[i].f; }
			if (G[i].pi == null) { pi = "Nil";  }
			else { pi = G[i].pi.name; }
			
			tr += "<td>"+di+" / "+f+" <br>"+pi+"</td>";
		}
		tr += "</tr>";
	}

	$("#tbody").prepend(tr);
}