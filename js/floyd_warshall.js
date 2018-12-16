// 0. Graph object represent as matrix
 
let G = [
	[0,			3,			8,			Infinity,	-4],
	[Infinity,	0,			Infinity,	1,			7],
	[Infinity,	4,			0,			Infinity,	Infinity],
	[2,			Infinity,	-5,			0,			Infinity],
	[Infinity,	Infinity,	Infinity,	6,			0]
];


// 1. Floyd-Warshall Algorithm

function Floyd_Warshall(G) {
	// 1.1 Init

	let D = new Array();
	D[0] = new Array();
	D[0][1] = new Array();

	let PI = [];

	for (let i=0; i<G.length; i++) {
		for (let j=0; j<G.length; j++) {
			if (G[i][j] != Infinity) {
				D[0][i][j] = G[i][j];
				PI[i][j] = i;
			}
			else {
				D[0][i,j] = Infinity;
				PI[i,j] = "NIL";
			}
		}
	}

	// main loop algorithm
	for(let k=1; k<G.length; k++) {
		for (let i=0; i<G.length; i++) {
			for (let j=0; j<G.length; j++) {
				if(D[k-1][i][j] <= D[k-1][i][k] + D[k-1][k][j]) {
					D[k][i][j] = D[k-1][i][j];
					PI[i,j] =  i;
				}
				else {
					D[k][i][j] = D[k-1][i][k] + D[k-1][k][j];
					PI[i,j] =  i;
				}
			}
		}
	}

	console.log(D);
	return D;
}


$(function() {
	Floyd_Warshall(G);
});
