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

