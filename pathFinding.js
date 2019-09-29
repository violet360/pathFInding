var algo = 0;
var nodes = [];
var cl = 0;

window.test = function(e) {
  algo = e.value;
  console.log(algo);
}



function vanish()
{
  document.querySelector(".dropdown").style.display="none";
  document.querySelector(".initiate").remove();
}

function restore()
{
  document.querySelector("#restore_btn").remove();
  nodes = [];
  for(var x=0; x<23;x++)
  {
    for(var y=0; y<60;y++)
    {
        var r = x.toString();
        var c = y.toString();
        var c_name = r+"-"+c;
        var cell = document.getElementById(c_name);
        cell.style.background = "cyan";
    }
  }
  document.querySelector(".dropdown").style.display="inline-block";
  var btn = document.createElement("button");
  var obj = document.body.appendChild(btn);
  obj.innerHTML = "initiate";
  btn.setAttribute("onclick", "deal()");
  btn.setAttribute("class", "initiate");
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
  algo_obj = new path_finding(nodes[0], nodes[1]);

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
      vanish();
      algo_obj.dfs();
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

function myFunction()
{

  var btn = document.createElement("button");
  var obj = document.body.appendChild(btn);
  obj.innerHTML = "initiate";
  btn.setAttribute("onclick", "deal()");
  btn.setAttribute("class", "initiate");
  
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
        cell.setAttribute("class", "hh");
        cell.setAttribute("id", c_name);
        cell.setAttribute("onclick", "lit_up(\""+ c_name + "\")");
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



class path_finding {
  constructor(start, end) {
    this.start = nodes[0];
    this.end = nodes[1];
  }
  dfs() 
  {
    console.log("dfs, bitches!!!");
  }

  bfs() 
  {
    console.log("bfs, bitches!!!");
  }

  dk() 
  {
    console.log("dk, bitches!!!");
  }
}