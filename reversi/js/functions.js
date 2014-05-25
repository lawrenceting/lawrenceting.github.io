
/**
 * Function is called when the page has loaded
 * @param grid(Multidimensional array of strings) board state
 * @pre grid has been initialised as a blank multidimensional array
 */
function onLoad(grid) 
{
    if(DEBUG_ENABLED == true) 
	{
        $("#debug").show();
    } 
	else 
	{
        $("#debug").hide();
    }
    $("#dialog").hide();

    onRestart();
}

/**
 * Function is called when restart link is clicked
 * @param grid(Multidimensional array of strings) board state
 */
function onRestart() 
{
    // TODO: Set the initial game state here
	grid = [[4,4,4,4,4,4,4,4],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,1,2,0,0,0],
			[0,0,0,2,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[4,4,4,4,4,4,4,4]];

	flipOver(grid);
	resetScore();
	hint.default_value = false;
	clearDebug()
	log("----------------------");
	log("New Game");	
	log("----------------------");
}

/**
 * Function that flips
 */
function flipOver(grid) 
{	
	for (var y = 0; y < NUMBER_COLS; y++) 
	{
		for (var x = 0; x < NUMBER_ROWS; x++) 
		{
			if(grid[y][x] == 0)
			{
				setSlotType(x, y, "empty");				
			}
			if(grid[y][x] == 1)
			{
				setSlotType(x, y, "black");				
			}
			if(grid[y][x] == 2)
			{
				setSlotType(x, y, "white");				
			}
		}
	}
}

/**
 * Function sets the contents of a slot
 * @param x(int) represents the xth horizontal slot
 * @param y(int) represents the yth vertical slot
 * @param type(string) type of item to fill the space with
 * @pre   x is between 0-7 inclusive and y is between 0-7 inclusive
 * @pre   type is either "empty", "black" or "white"
 */
function setSlotType(x, y, type) 
{
    var elementId = "slot" + (y) + "x" + x;
    var img = document.getElementById(elementId);
	
    if(type == "empty") {
        img.src = "images/empty.png";
    } else if(type == "black") {
        img.src = "images/black.png";
    } else if(type == "white") {
        img.src = "images/white.png";
    } else if(type == "hint_white") {
        img.src = "images/hint_white.png";
    } else if(type == "hint_black") {
        img.src = "images/hint_black.png";
    }
}

/**
 * Function is called when restart link is clicked which resets the scores
 */
function resetScore()
{
	currentTurn = 1; 	//player status - playe's turn
	alternativeTurn = 2;
	counterP1 = 2;
	counterP2 = 2;
	
	document.getElementById("playerTurn").innerHTML=" Player <b>" + currentTurn + "</b>\'s turn ";
	
	document.getElementById("playerScore1").innerHTML="<myStyle> = 2" + " </myStyle></span>";
	document.getElementById("playerScore2").innerHTML="<myStyle> = 2" + " </myStyle></span>";
	
	playerScore(grid);	
}

/**
 * Function is called when skip turn link is clicked
 */
function skipTurn() 
{
    // TODO: Skip the current turn
	if(currentTurn == 1)
	{
		currentTurn = 2; 
		alternativeTurn = 1;
		document.getElementById("playerTurn").innerHTML = "Player <b>" + currentTurn + "</b>\'s turn ";
		log("Current Turn: Player " + currentTurn);
		flipOver(grid);
		verifyMoves(grid);
		return currentTurn;
	}
	if(currentTurn == 2)
	{
		currentTurn = 1; 
		alternativeTurn = 2;
		document.getElementById("playerTurn").innerHTML = "Player <b>" + currentTurn + "</b>\'s turn ";
		log("Current Turn: Player " + currentTurn);
		flipOver(grid);
		verifyMoves(grid);
		return currentTurn;
	}	
}

/**
 * Function that counts and show player's score
 */
function playerScore(grid)
{
	counterP1 = 0;
	counterP2 = 0;
	
	for (var i = 1; i < NUMBER_COLS - 1; i++)
	{
		for (var j = 0; j < NUMBER_ROWS; j++)
		{
			if (grid[i][j] == 1)
			{
				counterP1 += 1;
			}
			else if (grid[i][j] == 2)
			{
				counterP2 += 1;
			}
		}
	}
	document.getElementById("playerScore1").innerHTML = "<myStyle> = " + counterP1 + " </myStyle></span> ";
	document.getElementById("playerScore2").innerHTML = "<myStyle> = " + counterP2 + " </myStyle></span> ";

		
	return (counterP1 + counterP2);
}

/**
 * Function is called when end game link is clicked
 * @param grid(Multidimensional array of strings) board state
 */
function endGame() 
{
    // TODO: Write code to find out who is the winner. Display result
	if (counterP1 > counterP2)
	{
		log("Player 1 Wins!");
		alert("Player 1 Wins!");
	}
	if (counterP1 < counterP2)
	{
		log("Player 2 Wins!");
		alert("Player 2 Wins!");
	}
	if (counterP1 == counterP2)
	{
		log("It's a Draw!!!");
		alert("It's a Draw!!!");
	}
	log("----------------------");
}

/**
 * Function that determines the Valid moves
 */
function isValidMove(x, y, grid)
{
	counterDir = getDir(x, y, grid);
	
	if (grid[y][x] == 0)
	{
		for (var i = 0; i < 8; i++)
		{
			if(counterDir[i] > 0)
			{
				return true;
			}
		}
	}
	return false;	
}

/**
 * Function is called when image is clicked
 * @param eventObject(object) Object contain details about image clicked
 * @param grid(Multidimensional array of strings) board state
 * @pre assumes that image has id in format slot[0-7]x[0-7]
 */
function imageClicked(event, grid) 
{
    var id = event.target.id;
    var x = parseInt(id.charAt(6));
    var y = parseInt(id.charAt(4));
	
	if (isValidMove(x, y, grid) == true)
	{
		slotClicked(x, y, grid);
	}
	else 
	{
		log("Wrong Move!!!");
		log("----------------------");
		alert("Wrong Move!!!");
	}
}


/**
 * Function that alerts player if there are no moves left
 */
function alertPlayer()
{
	var skipCounter = 0;
	
	for (var a = 0; a < 2 ; a++) 
	{
		if (verifyMoves(grid) == false) /*no moves available*/
		{
			skipTurn();
			skipCounter++;
		}
	}
	if (skipCounter == 2)
	{
		log("No moves left for both players!!!");
		alert("No moves left for both players!!!");
		endGame();
	}
	if (skipCounter == 1)
	{
		log("No moves left, Player " + currentTurn + "'s turn!!!");
		alert("No moves left, Player " + currentTurn + "'s turn!!!");
	}
}
