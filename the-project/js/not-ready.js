function getConnections(x,y) {
	
	var CNS = [[x,y]]; //connections
	var NBS; //neighbours

	for(var z = 0; z < getFilled(); z++){

		var trackX = CNS[CNS.length-1][0];
	    var trackY = CNS[CNS.length-1][1];
		var NBS = getNeighbours(NBS, trackX, trackY);
		var newNBS = [];

	    if (NBS.length == 0 || NBS.length == 1){
	    	log("Not enough neighbours.");
	    	return [];	    	
	    } else if (NBS.length > 1){

			//modify to if for every connection, because it result in neighbour = 0 - test square
			for(var i = 0; i < NBS.length; i++) {
				for(var j = 0; j < CNS.length; j++) {

					if (NBS[i][0] == CNS[j][0] &&  NBS[i][1] == CNS[j][1]){
						
						break;

					} else if (j == CNS.length - 1) {

						newNBS.push([NBS[i][0], NBS[i][1]]);						
					}
				}
		    }
		    log(z + " - " + newNBS.length + " " + "neighbours: " + printNeighbour(newNBS, trackX, trackY));
			log(z + " - " + newNBS.length + " " + "neighbours: " + printArr(newNBS));						

			
			if (newNBS.length == 0) {

				CNS = CNS.sort();
				log("No more neighbours.");

				var BenchX = CNS[CNS.length-1][0];
				var BenchY = CNS[CNS.length-1][1];

				//test top layer
				if (CNS[0][0] == BenchX-1){return [];}

				//test if in-between contains not currenTurn and 0
				for (var i = CNS[0][0]+1; i < BenchX; i++) {
					var newCNS = [];
					var inBetween = false;	

					//get all connections with same x
					for (var j = 0; j < CNS.length; j++) {
						if (CNS[j][0] == i) {
							newCNS.push([CNS[j][0], CNS[j][1]]);
						}
					}

					//
					if (newCNS.length == 0 || newCNS.length == 1) {
						return [];
					} else if (newCNS.length > 1) {

						if (newCNS[newCNS.length-1][1] == newCNS[0][1]+1) {continue;}

						for (var m = newCNS[0][1]+1; m < newCNS[newCNS.length-1][1]; m++) {
							if ((grid[i][m] != currentTurn) && (grid[i][m] != 0)) {
								inBetween = true;
								log("inBetween = true");
								break;
							}
						}
						if (inBetween == true) {break;}
					}
				}
				if (inBetween == false) {return [];}


				//test last of last 2nd layer from bottom = last array
				var newCNS = [];
				for(var i = 0; i < CNS.length; i++) {
					if (CNS[i][0] == BenchX-1){
						newCNS.push([CNS[i][0], CNS[i][1]]);
					}
				}

				if (newCNS.length == 0 || newCNS.length == 1) {
					return [];
				} else if (newCNS.length > 1) {

					var TestY = newCNS[newCNS.length-1][1];
					
					if ((TestY-1 == BenchY) || (TestY == BenchY) || (TestY+1 == BenchY)) { //top left	
						return CNS;
					} else {
						return [];
					}
				}
			}

	    	CNS = CNS.concat(newNBS); 		    
	    }
	}
}
//---------------------------------------------------------------------------
function getNeighbours(neighbours, trackX, trackY) {
 	var neighbours = [];
 	//top left
	if (grid[trackX-1][trackY-1] == currentTurn){neighbours.push([trackX-1, trackY-1]);}
	//top
	if (grid[trackX-1][trackY] == currentTurn){neighbours.push([trackX-1, trackY]);}
	//top right
	if (grid[trackX-1][trackY+1] == currentTurn){neighbours.push([trackX-1, trackY+1]);}
	//left
	if (grid[trackX][trackY-1] == currentTurn){neighbours.push([trackX, trackY-1]);}
    //right
	if (grid[trackX][trackY+1] == currentTurn){neighbours.push([trackX, trackY+1]);}
	//bottom left
	if (grid[trackX+1][trackY-1] == currentTurn){neighbours.push([trackX+1, trackY-1]);}
	//bottom
	if (grid[trackX+1][trackY] == currentTurn){neighbours.push([trackX+1, trackY]);}
	//bottom right
	if (grid[trackX+1][trackY+1] == currentTurn){neighbours.push([trackX+1, trackY+1]);}
	return neighbours;
}
//---------------------------------------------------------------------------
function printArr(arr) {
    var theStr = "";
    for(var i = 0; i < arr.length; i++){
        theStr += "(" + arr[i][0] + "," + arr[i][1] + ") ";
    }
    return theStr;
}
//---------------------------------------------------------------------------
function printNeighbour(neighbours, trackX, trackY) {
    var theStr = "";
    for(var i = 0; i < neighbours.length; i++){

        if ((trackX-1 == neighbours[i][0]) && (trackY-1 == neighbours[i][1])){
            theStr += "(T-L) ";
            continue;
        }
        if ((trackX-1 == neighbours[i][0]) && (trackY == neighbours[i][1])){
            theStr += "(T) ";
            continue;
        }
        if ((trackX-1 == neighbours[i][0]) && (trackY+1 == neighbours[i][1])){
            theStr += "(T-R) ";
            continue;
        }
        if ((trackX == neighbours[i][0]) && (trackY-1 == neighbours[i][1])){
            theStr += "(L) ";
            continue;
        }
        if ((trackX == neighbours[i][0]) && (trackY+1 == neighbours[i][1])){
            theStr += "(R) ";
            continue;
        }
        if ((trackX+1 == neighbours[i][0]) && (trackY-1 == neighbours[i][1])){
            theStr += "(B-L) ";
            continue;
        }
        if ((trackX+1 == neighbours[i][0]) && (trackY == neighbours[i][1])){
            theStr += "(B) ";
            continue;
        }
        if ((trackX+1 == neighbours[i][0]) && (trackY+1 == neighbours[i][1])){
            theStr += "(B-R) ";
            continue;
        }
    }
    return theStr;
}