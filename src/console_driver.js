var numToChar = ["a", "b", "c", "d", "e", "f", "g", "h"];
var charToNum = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
};

var displayBoard = function () {
  var column = [0, 1, 2, 3, 4, 5, 6, 7];
  console.log("  | " + column.join("   "));
  console.log("-----------------------------------");
  for (var i = 0; i < board.length; i++) {
    console.log(numToChar[i] + " |" + board[i].join(" "));
  }
};

var getMove = function() {
  var start = prompt("Please enter the coordinates of the piece to move seperated by a space (ie. a 4) (q to quit)");
  if (start == 'q') {
    return {
      quit: true
    }
  }
  var end = prompt("Enter the coordinates of the space to move to seperated by a space");
  start = start.split(' ');
  end = end.split(' ');
  return {
    startRow: charToNum[start[0]],
    startCol: parseInt(start[1]),
    endRow: charToNum[end[0]],
    endCol: parseInt(end[1])
  }
};

var play = function() {
  resetBoard();
  displayBoard();
  console.log("wht starts");
  var coords = getMove();
  attemptMove(coords.startRow, coords.startCol, coords.endRow, coords.endCol);
};

$(document).on('boardChange', function(e, board, turns, player) {
  displayBoard();
  console.log("There have been " + turns + " turns taken.");
  console.log("It is now " + player + "'s move");
  var coords = getMove();
  attemptMove(coords.startRow, coords.startCol, coords.endRow, coords.endCol);
});

$(document).on('invalidMove', function(e, err) {
  alert(err);
  var coords = getMove();
  attemptMove(coords.startRow, coords.startCol, coords.endRow, coords.endCol);
});

$(document).on('pieceTaken', function(e, taker, taken, row, col) {
  alert(taken + ", you had your piece taken from you by " + taker + "!!!!");
});