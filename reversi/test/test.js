jsUnity.log = function (s) 
{
	document.write("<div>" + s + "</div>");
};

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


function testSuite()
{		
	function testSquare1()
	{ 
		assertEqual(isValidMove(3, 6, grid), true); 
	}


}


jsUnity.attachAssertions(); 
jsUnity.run(testSuite);