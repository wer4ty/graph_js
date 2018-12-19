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

	let D = [];
	let PI = [];

	D[0] = [];
	for (let i=0; i<G.length; i++) {
		D[0][i] = [];
		PI[i] = [];
		for (let j=0; j<G.length; j++) {
			if (G[i][j] != Infinity) {
				D[0][i][j] = G[i][j];
				PI[i][j] = i;
			}
			else {
				D[0][i][j] = Infinity;
				PI[i][j] = "NIL";
			}
		}
	}
	console.log(D[0]);

	// main loop algorithm
	let t1, t2,t3;

	for(let k=1; k<G.length; k++) {
		D[k] = [];
		for (let i=0; i<G.length; i++) {
			D[k][i] = [];
			for (let j=0; j<G.length; j++) {
				t1 = D[k-1][i][j];
				t2 = D[k-1][i][k];
				t3 =  D[k-1][k][j];
				if(t1 <= t2 + t3) {
					D[k][i][j] = t1;
					PI[i][j] =  i;
				}
				else {
					D[k][i][j] = t2 + t3;
					PI[i,j] =  i;
				}
			}
		}
		console.log(D[k]);
	}

	return D;
}


$(function() {
	Floyd_Warshall(G);
});
