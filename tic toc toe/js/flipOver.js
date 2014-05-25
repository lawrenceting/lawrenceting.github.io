/**
 * Function that flips
 */
function flipOver(grid) 
{	
	for (var y = 1; y < NUMBER_ROWS - 1; y++) 
	{
		for (var x = 0; x < NUMBER_COLS; x++) 
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