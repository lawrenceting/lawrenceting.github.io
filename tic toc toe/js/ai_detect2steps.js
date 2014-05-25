// to detect whether the opponent will win in 2 moves

var needBlock_x;
var needBlock_y;

function ai_detect2steps(grid)
{
	var counter = 0;
	
	for (var y = 1; y < NUMBER_ROWS - 1; y++) 
	{
		for (var x = 0; x < NUMBER_COLS; x++) 
		{
			if (grid[y][x] == 0)
			{
				grid[y][x] = alternativeTurn;
				needBlock_y = new Array(); //reset array
				needBlock_x = new Array(); //reset array
					needBlock_y[0] = y;
					needBlock_x[0] = x;
				
				for (var i = 1; i < NUMBER_ROWS - 1; i++) 
				{
					for (var j = 0; j < NUMBER_COLS; j++) 
					{
						if (grid[i][j] == 0)
						{
							grid[i][j] = alternativeTurn;
							
							if (threeOfaKind_ai(grid) == true)
							{
								counter++;
								needBlock_y[counter] = i;
								needBlock_x[counter] = j;
							}
							grid[i][j] = 0; //
						}
					}
				}
				grid[y][x] = 0; // 
				
				if (counter == 2)
				{	
					log("x: " + needBlock_x);
					log("y: " + needBlock_y);
					log("counter : " + counter);
					return counter; 
				}
				counter = 0; 
			}
		}
	}
	return false;
}