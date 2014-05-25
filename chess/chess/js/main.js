//Shortcut for $(document).ready
$(function() {
	init();
	console.log("Main Init Called");
	
	$("#SetFen").fadeOut('slow').fadeIn('slow').fadeOut('slow').fadeIn('slow');
	console.log("FilesBrd[0]:" + FilesBrd[21] + " RanksBrd[0]:" + RanksBrd[21]);

});

function InitFilesRanksBrd() {
	
	for(var index = 0; index < BRD_SQ_NUM; ++index) {
		FilesBrd[index] = SQUARES.OFFBOARD;
		RanksBrd[index] = SQUARES.OFFBOARD;
	}
	
	for(var rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
		for(var file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			var sq = FR2SQ(file,rank);
			FilesBrd[sq] = file;
			RanksBrd[sq] = rank;
		}
	}
	
	console.log("FilesBrd[0]:" + FilesBrd[0] + " RanksBrd[0]:" + RanksBrd[0]);
	console.log("FilesBrd[21]:" + FilesBrd[21] + " RanksBrd[21]:" + RanksBrd[21]);
	console.log("FilesBrd[22]:" + FilesBrd[22] + " RanksBrd[22]:" + RanksBrd[22]);
	console.log("FilesBrd[23]:" + FilesBrd[23] + " RanksBrd[23]:" + RanksBrd[23]);
	
	console.log(
		"FilesBrd[SQUARES.A1]:" + FilesBrd[SQUARES.A1] + 
		" RanksBrd[SQUARES.A1]:" + 	RanksBrd[SQUARES.A1] + 
		" Square Number:" + FR2SQ(FilesBrd[SQUARES.A1],RanksBrd[SQUARES.A1])
	);
		
	console.log(
		"FilesBrd[SQUARES.E8]:" + FilesBrd[SQUARES.E8] + 
		" RanksBrd[SQUARES.E8]:" + 	RanksBrd[SQUARES.E8] + 
		" Square Number:" + FR2SQ(FilesBrd[SQUARES.E8],RanksBrd[SQUARES.E8])
	);
}

function init() {
	console.log("init() called");
	InitFilesRanksBrd();
}

$(document).ready(
	function(){

	}
);

document.write("main.js");