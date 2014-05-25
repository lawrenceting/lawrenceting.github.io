/**
 * Function is called when end game link is clicked
 * @param grid(Multidimensional array of strings) board state
 */
function endGame(grid)
{
    // TODO: Write code to find out who is the winner. Display result

	if (threeOfaKind(grid) == true)
	{
		log("----------------------");
		log("Player " + currentTurn + " Wins!!!");
		gameState = "end";
	}

	if (slotCounter == 9 && threeOfaKind(grid) != true)
	{
		log("----------------------");
		log("It's a Draw!!!");
	}
}