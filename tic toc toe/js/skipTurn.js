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
		log("Current Turn: Player " + currentTurn);
		return currentTurn;
	}
	if(currentTurn == 2)
	{
		currentTurn = 1; 
		alternativeTurn = 2;
		log("Current Turn: Player " + currentTurn);
		return currentTurn;
	}	
}