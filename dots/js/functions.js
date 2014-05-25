/**
 * Function is called when slot on play field is selected
 * @param x(int) represents the xth horizontal slot
 * @param y(int) represents the yth vertical slot
 * @param grid(Multidimensional array of strings) board state
 * @pre   x is between 0-7 inclusive and y is between 0-7 inclusive
 */
function addImage(id) {
    if (($("#" + id).attr("src") != "images/o.png") && ($("#" + id).attr("src") != "images/x.png")){
        if(currentTurn == 1) {
            imageChangeRotate(
                "#" + id, 
                "src", 
                "images/o.png", 0
            );
        
        } else if(currentTurn == 2) {
            imageChangeRotate(
                "#" + id, 
                "src", 
                "images/x.png", 0
            );
        } 
    log("Clicked " + id + " "); 
    } else {
       log("Cell already filled.");
    }
}
//---------------------------------------------------------------------------
function endGame() {
    // TODO: Write code to find out who is the winner. Display result
    
	log("End game.");
}
//---------------------------------------------------------------------------
function getFilled() {
    var counter = 0;

    for(var x = 0; x < NUMBER_ROWS; x++) {
        for(var y = 0; y < NUMBER_COLS; y++) {
            if (grid[x][y] == currentTurn) {
                counter += 1;
            }
        }
    }
    return counter;
    //log("Player " + currentTurn + " has " + counter + " cell(s) filled.")
}
//---------------------------------------------------------------------------
/**
 * Function is called when image is clicked
 * @param eventObject(object) Object contain details about image clicked
 * @param grid(Multidimensional array of strings) board state
 * @pre assumes that image has id in format slot[0-7]x[0-7]
 */
function getPlot(id) {    
    // Find x co-ordinate
    var x = "";
    for(var i = 3; i < id.length; i++) {
        var testNum = parseInt(id.charAt(i));
        if(!isNaN(testNum)){
            x +=  testNum;
        } else {
            break;
        }
    }

    // Find y co-ordinate
    var y = "";
    for(i = i + 1; i < id.length; i++) {
        var testNum = parseInt(id.charAt(i));
        if(!isNaN(testNum)){
            y +=  testNum;
        } else {
            break;
        }
    }
    var arr = [parseInt(x),parseInt(y)];
    log("x: " + arr[0] + " y: " + arr[1]);
    return arr;
}
//---------------------------------------------------------------------------
function imageChangeRotate(id, attr, img, angle) {
   $(id)
        .attr(attr, img)
        .css("-ms-transform", "").css("-ms-transform", "rotate(" + angle + "deg")
        .css("-o-transform", "").css("-o-transform", "rotate(" + angle + "deg")
        .css("transform", "").css("transform", "rotate(" + angle + "deg")
        .css("-webkit-transform", "").css("-webkit-transform", "rotate(" + angle + "deg");
}
//---------------------------------------------------------------------------
function modifyGrid(x,y) { 
    grid[x][y] = currentTurn;
    //log(grid);
}
//---------------------------------------------------------------------------
/**
 * Function is called when the page has loaded
 * @param grid(Multidimensional array of strings) board state
 * @pre grid has been initialised as a blank multidimensional array
 */
function onLoad(grid) {
    if(DEBUG_ENABLED == true) {
        $("#debug").show();
    } 
	else {
        $("#debug").hide();
    }
    onRestart();
}
//---------------------------------------------------------------------------
/**
 * Function is called when restart link is clicked
 * @param grid(Multidimensional array of strings) board state
 */
function onRestart() {
    // TODO: Set the initial game state here
    for(var x = 0; x < NUMBER_ROWS; x++) {
        for(var y = 0; y < NUMBER_COLS; y++) {
            grid[x][y]=0;
        }
    }
	resetBoard();
	currentTurn = 1;
    log("New game.");
	log("Player " + currentTurn + "'s turn.");
}
//---------------------------------------------------------------------------
function playerTurn() {
        if(currentTurn == 1) {
            currentTurn = 2
        
        } else if(currentTurn == 2) {
            currentTurn = 1;
        } 
    log("Player " + currentTurn + "'s turn.");
}
//---------------------------------------------------------------------------
function resetBoard() {
    for(var x = 0; x < NUMBER_ROWS; x++) {
        for(var y = 0; y < NUMBER_COLS; y++) {
            imageChangeRotate(
                "#" + "img" + x + "x" + y, 
                "src",
                "images/blank.png", 0);
        }
    }
}
//---------------------------------------------------------------------------
/**
 * Function is called when skip turn link is clicked
 */
function skipTurn() {
    // TODO: Skip the current turn
	if(currentTurn == 1){
		currentTurn = 2; 
		
	} else if(currentTurn == 2){
		currentTurn = 1; 
	}
	log("Player " + currentTurn + "'s turn.");
	return currentTurn;
}
//---------------------------------------------------------------------------
function surround(connections) {

    if (connections.length >= 4) {

        for(var i = 0; i < connections.length; i++) {

            var x = connections[i][0];
            var y = connections[i][1];

            if(currentTurn == 1){
                imageChangeRotate(
                    "#" + "img" + x + "x" + y, 
                    "src",
                    "images/o_surround.png", 0);
                
            } else if(currentTurn == 2){
                imageChangeRotate(
                    "#" + "img" + x + "x" + y, 
                    "src",
                    "images/x_surround.png", 0);
            } 

        }        
    }
    log("Surrounded " + connections.length + ": " + printArr(connections));
}