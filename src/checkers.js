var board, currentPlayer;

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
};

var attemptMove = function(row1, col1, row2, col2) {
  // in order for a move to be valid
  // must move forward (*unless a king)
  // must be an empty space
  // must be diagonal
  // must be current players piece
  if (currentPlayer == 'wht') {
    if (board[row1][col1] == currentPlayer) {
      if (board[row2][col2] == ' X ') {
        if (row2 - row1 == 1) {
          if (col2 - col1 == 1 || col1 - col2 == 1) {
            makeMove(row1, col1, row2, col2);
          }
        } 
        else if (row2 - row1 == 2) {
          if (col2 - col1 == 2) {
            //check if piece in between
            if (board[row1 + 1][col1 + 1] == 'red') {
              makeMove(row1, col1, row2, col2);
              removePiece(row1 + 1, col1 + 1);
            }
          } 
          else if (col1 - col2 == 2) {
            //check if piece in between
            if (board[row1 + 1][col1 - 1] == 'red') {
              makeMove(row1, col1, row2, col2);
              removePiece(row1 + 1, col1 - 1);
            }
          }
        }
      }
    }
  }
  else {
    if (board[row1][col1] == currentPlayer) {
      if (board[row2][col2] == ' X ') {
        if (row2 - row1 == -1) {
          if (col2 - col1 == 1 || col1 - col2 == 1) {
            makeMove(row1, col1, row2, col2);
          }
        } 
        else if (row2 - row1 == -2) {
          if (col2 - col1 == 2) {
            //check if piece in between
            if (board[row1 - 1][col1 + 1] == 'wht') {
              makeMove(row1, col1, row2, col2);
              removePiece(row1 - 1, col1 + 1);
            }
          } 
          else if (col1 - col2 == 2) {
            //check if piece in between
            if (board[row1 - 1][col1 - 1] == 'wht') {
              makeMove(row1, col1, row2, col2);
              removePiece(row1 - 1, col1 - 1);
            }
          }
        }
      }
    }
  }
};

var makeMove = function(row1, col1, row2, col2) {
  // must change the location of the piece and also change current player
  board[row2][col2] = currentPlayer;
  board[row1][col1] = ' X ';
  changePlayer();
};

var removePiece = function(row, col) {
  board[row][col] = " X ";
};

var changePlayer = function() {
  if (currentPlayer == 'wht') {
    currentPlayer = 'red';
  } else {
    currentPlayer = 'wht';
  }
};