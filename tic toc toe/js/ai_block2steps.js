//to block opponent from winning in 2 moves

function ai_block2steps(grid)
{
	var nB_xCopy = needBlock_x.slice();
	var nB_yCopy = needBlock_y.slice();

// Block fork by blocking the opponent's move that creates the fork
	grid[(needBlock_y[0])][(needBlock_x[0])] = currentTurn;
	
	if (ai_detect2steps(grid) == false)
	{
		log("Blocked 2 Steps Successful!!!");
		return true;
	}
	else
	{
		log("Blocked 2 Steps Fail!!!");	
		grid[(nB_yCopy[0])][(nB_xCopy[0])] = "*";
		
		var temp_y = new Array();
		var temp_x = new Array();
		
		for (;;)
		{
			if (ai_detect2steps(grid) == 2)
			{
				grid[(needBlock_y[0])][(needBlock_x[0])] = "*";
			}
			else
				break;
		}
	}
	
	// Block fork by creating 2 in a row, forcing the opponent to defend
		//needs modification
	

	//infinite loop must modify
	for (;;)
	{
		if (ai_detect2steps(grid) == 2)
		{
			temp_y[count] = needBlock_y[0];
			temp_x[count] = needBlock_x[0];
			count++;
		}
		else
			break;
	}
/*	var random = Math.ceil(Math.random()*2);
	if (random == 1)
		grid[nB_yCopy[1]][nB_xCopy[1]] = currentTurn;
	if (random == 2)
		grid[nB_yCopy[2]][nB_xCopy[2]] = currentTurn;
*/


}