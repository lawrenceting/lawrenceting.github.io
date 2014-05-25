var grid;

$(document).ready(function(){
    $("a[href=#restart]").click(function(event)
	{
        onRestart(grid);
        return true;
    });

    $("a[href=#skip]").click(function(event)
	{
        skipTurn();
        return true;
    });

    $("a[href=#end]").click(function(event)
	{
        endGame(grid);
        return true;
    });

    $("img").click(function(event)
	{
        imageClicked(event, grid);
        return true;
    });

    grid = new Array(NUMBER_COLS);
				  
    for(var currentCol = 0; currentCol < NUMBER_COLS; currentCol++) 
	{
        grid[currentCol] = new Array(NUMBER_ROWS);
    }

    onLoad(grid);
});



