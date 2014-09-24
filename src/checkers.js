var board, currentPlayer, turns;

var resetBoard = function () {
  board = [
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    ['wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X '],
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X '],
    [' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ', 'red'],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ']
  ];

  currentPlayer = 'wht'
  turns = 0;
};

var attemptMove = function(row1, col1, row2, col2) {
  // in order for a move to be valid
  // must move forward (*unless a king)
  // must be an empty space
  // must be diagonal
  // must be current players piece
  if (currentPlayer == 'wht' && board[row1][col1] == currentPlayer
      && board[row2][col2] == ' X ') 
  {
    if (row2 - row1 == 1 && (col2 - col1 == 1 || col1 - col2 == 1)) {
      makeMove(row1, col1, row2, col2);
    } 
    else if (row2 - row1 == 2) {
      if (col2 - col1 == 2 && board[row1 + 1][col1 + 1] == 'red') {
        removePiece(row1 + 1, col1 + 1);
        makeMove(row1, col1, row2, col2);
      } 
      else if (col1 - col2 == 2 && board[row1 + 1][col1 - 1] == 'red') {
        removePiece(row1 + 1, col1 - 1);
        makeMove(row1, col1, row2, col2);
      } 
      else {
        // invalid move
        $(document).trigger('invalidMove', 'Invalid Move. Try Again.');
      }
    } 
    else {
      // invalid move
      $(document).trigger('invalidMove', 'Invalid Move. Try Again.');
    }
  } 
  // row1 = 6 col1 = 3 row2 = 4 col2 = 1
  else if (currentPlayer == 'red' && board[row1][col1] == currentPlayer
      && board[row2][col2] == ' X ') 
  {
    if (row2 - row1 == -1 && (col2 - col1 == 1 || col1 - col2 == 1)) {
      makeMove(row1, col1, row2, col2);
    } 
    else if (row2 - row1 == -2) {
      if (col2 - col1 == 2 && board[row1 - 1][col1 + 1] == 'wht') {
        removePiece(row1 - 1, col1 + 1);
        makeMove(row1, col1, row2, col2);
      } 
      else if (col1 - col2 == 2 && board[row1 - 1][col1 - 1] == 'wht') {
        removePiece(row1 - 1, col1 - 1);
        makeMove(row1, col1, row2, col2);
      }
      else {
        // invalid move
        $(document).trigger('invalidMove', 'Invalid Move. Try Again.');
      }
    }
    else {
      $(document).trigger('invalidMove', 'Invalid Move. Try Again.');
    }
  } else {
    $(document).trigger('invalidMove', 'Invalid Move. Try Again.');
  }
};



var makeMove = function(row1, col1, row2, col2) {
  // must change the location of the piece and also change current player
  board[row2][col2] = currentPlayer;
  board[row1][col1] = ' X ';
  turns++;
  changePlayer();
  $(document).trigger('boardChange', [board, turns, currentPlayer]);
};

var removePiece = function(row, col) {
  var taken = board[row][col];
  board[row][col] = " X ";
  $(document).trigger('pieceTaken', [currentPlayer, taken, row, col])
};

var changePlayer = function() {
  if (currentPlayer == 'wht') {
    currentPlayer = 'red';
  } else {
    currentPlayer = 'wht';
  }
};