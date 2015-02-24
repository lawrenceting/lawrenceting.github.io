var leftpane_L = "col-md-4"
var leftpane_M = "col-md-8"
var leftpane_R = "col-md-0"

var neutral_L = "col-md-1"
var neutral_M = "col-md-10"
var neutral_R = "col-md-1"

var rightpane_L = "col-md-1"
var rightpane_M = "col-md-7"
var rightpane_R = "col-md-4"

var toggleCol = function(l, m, r){
	
	l += " toggled";
	m += " toggled";
	r += " toggled";
	
	$(".channelContainer").addClass("toggled");
	$("#sidebar-wrapper").removeClass().toggleClass(l);
	$("#player-container").removeClass().toggleClass(m);
	$("#rightpane").removeClass().toggleClass(r);
	
	if ( ~m.indexOf(neutral_M) ) { //if contain string
		
		$("#rightpane-content, #rightpane-footer").fadeOut();
		$("#sidebar-wrapper, #rightpane").fadeIn();
		$("#sidebar-wrapper").css("opacity", "0.3"); 
		
		console.log("L+R sidebar collasped.");
		
	} else if ( ~l.indexOf(leftpane_L) ) { //if contain string
		
		$("#sidebar-wrapper").css("opacity", "1").fadeIn();
		$("#rightpane").fadeOut();
		
		console.log("L sidebar expanded.");
		
	} else if ( ~r.indexOf(rightpane_R) ) { //if contain string
		
		$("#rightpane, #rightpane-content, #rightpane-footer").fadeIn();
		
		console.log("R sidebar expanded.");
	}
};
//------------------------------------------------------------------------------	
function collaspeSidebar(){
	// overwrite this function, so it will be executed only once
	collaspeSidebar = Function("");
	
	if ( !$('#sidebar-wrapper:hover, #searchbox:hover').length ) { //if sidebar is not hovered
		
		toggleCol(neutral_L, neutral_M, neutral_R);
	}
//------------------------------------------------------------------------------	
	$("#sidebar-wrapper, #searchbox").hover(
		function (e) { 
			toggleCol(leftpane_L, leftpane_M, leftpane_R); 
			
		}, function (e) { 
			toggleCol(neutral_L, neutral_M, neutral_R); 
		}
	);
//------------------------------------------------------------------------------	
	$("#rightpane").hover(
		function (e) { 
			toggleCol(rightpane_L, rightpane_M, rightpane_R); 		
			
		}, function (e) { 
			toggleCol(neutral_L, neutral_M, neutral_R); 
		}
	);
} //end function
//------------------------------------------------------------------------------

$( window ).load(function(e) { 

	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		toggleCol(neutral_L, neutral_M, neutral_R);
	});		
});
