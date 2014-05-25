function PCEINDEX(pce, pceNum) {
	return (pce * 10 + pceNum);
}

var GameBoard = {};

GameBoard.pieces = new Array(BRD_SQ_NUM);
GameBoard.side = COLOURS.WHITE;
GameBoard.fiftyMove = 0; //player can claim a draw if both players have made 50 moves (=100) 							and ot has not been a pawn move or capture

GameBoard.hisPly = 0; //maintain count of every move made in the game
GameBoard.ply = 0; 
GameBoard.castlePerm = 0; //can castle if the king and rook has never moved BUT cannot be used 							if attacked

GameBoard.material = new Array(2); // WHITE,BLACK material of pieces
GameBoard.pceNum = new Array(13); // indexed by Pce
GameBoard.pList = new Array(14 * 10);

/*

loop (pieces[])
if(piece on sq == Side tomove)
then genmoves() for piece on sq


sqOfpiece = PlistArray[index];

index?

wP * 10 + wPNum -> 0 based index of num of pieces(GameBoard.pceNum)
wN * 10 + wNnum

say we have 4 white pawns GameBoard.pceNum[wP] = 4

for(pceNum = 0; pceNum < GameBoard.pceNum[wP]; ++pceNum) {
	sq = PlistArray[wP * 10 + pceNum]

}

sq1 = PlistArray[wP * 10 + 0]
sq2 = PlistArray[wP * 10 + 1]
sq3 = PlistArray[wP * 10 + 2]
sq4 = PlistArray[wP * 10 + 3]

wP 10 -> 19
*/

document.write("board.js");