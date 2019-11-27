// bug report................
// cells not getting selected after restore is triggered

var algo = 0;
var nodes = [];
var cl = 0;
adj = {}; // adjacency list with key as cell_address a.k.a c_name (5-6) and value is a list of it's children
// travelling = [];

window.test = function(e)
{
	algo = e.value;
	console.log(algo);
}

function vanish()
{
	document.querySelector(".dropdown").style.display="none";
	document.querySelector(".initiate").remove();
}


function check_limit(x, y)
{
	if(x>=0 && x<23 && y>=0 && y<60)
		return true;
	else
		return false;
}

function create_neighbours(x, y, c_name)
{
	var del_X = [-1, 0, 1, 0];
	var del_Y = [0, 1, 0, -1];
	var children = [];

	for(var idx = 0; idx<4; idx++)
	{
		if(check_limit((x + del_X[idx]), (y + del_Y[idx])))
		{
			var store_x = x + del_X[idx];
			var store_y = y + del_Y[idx];
			var child = store_x.toString()+"-"+store_y.toString();
			// adj[x.toString()+"-"+y.toString()].push(child);
			// console.log(child);
			children.push(child);
		}
	}
	adj[c_name] = children;
}


function restore()
{
  	document.querySelector("#restore_btn").remove();
  	nodes = [];
  	for(var x=0; x<23;x++)
  	{
    		for(var y=0; y<60;y++)
    		{
    			var children = [];
			var r = x.toString();
	   		var c = y.toString();
	   		var c_name = r+"-"+c;
	   		var cell = document.getElementById(c_name);
	   		// console.log(adj[c_name]);
	   		cell.style.background = "cyan";
	   		cell.setAttribute("class", "unvisited");
    		}
  	}
  	document.querySelector(".dropdown").style.display="inline-block";
  	var btn = document.createElement("button");
  	var obj = document.body.appendChild(btn);
 	obj.innerHTML = "initiate";
  	btn.setAttribute("onclick", "deal()");
  	btn.setAttribute("class", "initiate");
  	cl = 0;
}

function replenish()
{
  	var btn = document.createElement("button");
  	var obj = document.body.appendChild(btn);
  	obj.innerHTML = "restore";
  	btn.setAttribute("id", "restore_btn");
  	btn.setAttribute("onclick", "restore()");
}

function deal()
{
  	algo_obj = new path_finding();

  	if(nodes.length !=2 && algo == 0)
  	{
    		alert("select starting , ending cells and an algo");
    		return;
  	}

  	else if(nodes.length!=2)
  	{
    		alert("select starting and ending cells");
    		return;
 	}

  	else if(algo==0)
  	{
    		alert("select an algo");
    		return;
  	}

  	else if(algo==1)
  	{
  		travelling = [];
	 	vanish();
	 	algo_obj.dfs(nodes[0]);
	 	// for(var t=0; t<travelling.length; t++)
	 	// {
	 	// 	console.log(travelling[t]);
	 	// 	// print travveling array such that their is an interval of 2s and the node which you just visited is colored yellow.......
	 	// }
	 	algo_obj.trace();
	 	replenish();
  	}

  	else if(algo==2)
  	{
   	 	vanish();
	 	algo_obj.bfs();
	 	replenish();
  	}

  	else if(algo==3)
  	{
    		vanish();
		algo_obj.dk();
	 	replenish();
  	}
}



//initialises the table after fuck it is pressed.....
function myFunction()
{
  	var btn = document.createElement("button");
  	var obj = document.body.appendChild(btn);
  	obj.innerHTML = "initiate";
  	btn.setAttribute("onclick", "deal()");
  	btn.setAttribute("class", "initiate");
  	document.querySelector("#start_up").remove();
  
  	var table = document.getElementById("myTable");
  	for(var x=0; x<23;x++)
  	{
		var row = table.insertRow(x);
		for(var y=0; y<60;y++)
    		{
	   		var cell = row.insertCell(y);
	   		cell.style.width = "15px";
	   		cell.style.height = "15px";
	   		cell.style.background = "cyan";
	   		var r = x.toString();
	   		var c = y.toString();
	   		var c_name = r+"-"+c;
	   		cell.setAttribute("class", "unvisited");
	   		cell.setAttribute("id", c_name);
	   		cell.setAttribute("onclick", "lit_up(\""+ c_name + "\")");
	   		create_neighbours(x, y, c_name);
	   		// console.log(adj[c_name]+" "+c_name);
    		}
  	}
}


function lit_up(i_d)
{
  	cl = cl + 1;
  	if(cl<3)
  	{
    		var cell_obj = document.getElementById(i_d);
    		if(cl==1)
    		{
	 		cell_obj.style.background = "red";
	 		nodes.push(i_d);
    		}

    		else if(cl==2)
    		{
	 		cell_obj.style.background = "black";
	 		nodes.push(i_d);
    		}
  	}
  	else
  	{
    		cl = 3;
  	}

  	for(var x=0; x<nodes.length; x++)
  	{
	 	console.log(nodes[x]+" ");
  	}
}

class path_finding
{

	parent = {};
	constructor()
	{
		this.found = false;
	}
	
  	dfs(src)
  	{
		var x = document.getElementById(src);

		if(src==nodes[1])
		{
			this.found = true;
			console.log(11111);
			return;
		}

		x.setAttribute("class", "visited");//changing class of src from unvisited to visited
		var address = x.getAttribute("id");
		// setTimeout(function(){
		// 	x.style.background = "yellow";
		// }, 6) //the coloring is lagging and two adjacent cells are not colored with an interval if 2 sec........
		// x.style.background = "yellow";
		for(var idx=0; idx<adj[address].length; idx++)
		{
			var child = adj[address][idx];
			// console.log(child);
			if(document.getElementById(child).getAttribute("class") == "unvisited")
			{
				// travelling.push(child);
				console.log(child);
				parent[child] = src;
				this.dfs(child);
				if(this.found)
					return;
			}
		}
		// console.log("dfs, bitches!!!");
  	}


 //  	void dfs(ll src)
	// {
	// 	used[src] = true;
	// 	for(ll children:adj[src])
	// 	{
	// 		if(!used[children])
	// 		{
	// 			cout<<children<<endl;
	// 			parent[children] = src;
	// 			dfs(children);
	// 		}
	// 	}
	// }

  	bfs()
  	{
    		console.log("bfs, bitches!!!");
  	}

  	dk() 
  	{
    		console.log("dk, bitches!!!");
  	}

  	trace()
  	{
  		var sell = nodes[1];
  		var object = document.getElementById(sell);
  		while(sell!=nodes[0])
  		{
  			object = document.getElementById(sell);
  			setTimeout(function(){object.style.background = "green";}, 5000); //colors not retracing the path!!!
  			console.log(":::"+sell);
  			sell = parent[sell];
  		}
  	}
}