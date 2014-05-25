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
	grid = [[4,4,4],
			[0,0,0],
			[0,2,0],
			[0,0,1],
			[4,4,4]];
	
	flipOver(grid);
	slotCounter = 0;
	currentTurn = 2;

	clearDebug();
	log("----------------------");
	log("New Game");	
	log("----------------------");
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
        img.src = "images/o.png";
    } else if(type == "white") {
        img.src = "images/x.png";
    } else if(type == "hint_white") {
        img.src = "images/hint_white.png";
    } else if(type == "hint_black") {
        img.src = "images/hint_black.png";
    }
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
	
	if (grid[y][x] == 0)
	{
		slotClicked(x, y, grid);
	}
	else 
	{
		log("Wrong Move!!!");
		log("----------------------");
	}
}

