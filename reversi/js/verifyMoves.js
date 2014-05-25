/**
 * Function counts the available moves
 */
function verifyMoves(grid) 
{
	var counter = 0;
	var x_array = new Array();
	var y_array = new Array();
	
	for (var y = 1; y < NUMBER_COLS - 1; y++)
	{
		for (var x = 0; x < NUMBER_ROWS; x++)
		{
			if (grid[y][x] == 0)
			{
				y_array[counter] = y;
				x_array[counter] = x;
				counter++;
			}
		}
	}
	
	var result = new Array(counter);
	
	for(var i = 0;  i < counter; i++) 
	{
        result[i] = isValidMove(x_array[i], y_array[i], grid);
		
		if (hint.default_value == true)
		{	
			if (result[i] == true)
			{
				if (currentTurn == 1)
					setSlotType(x_array[i], y_array[i], "hint_black");
				if (currentTurn == 2)
					setSlotType(x_array[i], y_array[i], "hint_white");
			}
		}	
	}
	
	for(var i = 0;  i < counter; i++) 
	{		
		if (result[i] == true)
			return true;
	}
	return false;	
}