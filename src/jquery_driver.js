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

$(document).on('ready', function() {
	var coords = {}
	var displayBoard = function () {
		resetBoard();
		$(document).find('.piece').remove();
		$('.row').find('.col').not('.empty').append('<div />');
		$('.row-a, .row-b, .row-c').find('.col')
									.not('.empty')
									.find('div')
									.attr('class', 'white piece');
		$('.row-f, .row-g, .row-h').find('.col')
									.not('.empty')
									.find('div')
									.attr('class', 'red piece');
	};

	$('.start').on('click', function() {
		displayBoard();
		$('.col').on('click', function() {
			if (coords.startRow && coords.startCol) {
				var endCol = $(this).attr('class');
				coords.endCol = parseInt(endCol.slice(-1));
				var endRow = $(this).parent().attr('class');
				coords.endRow = charToNum[endRow.slice(-1)];
				attemptMove(coords.startRow, coords.startCol, coords.endRow, coords.endCol);
				console.log('startRow: ' + coords.startRow);
				console.log('startCol: ' + coords.startCol);
				console.log('endRow: ' + coords.endRow);
				console.log('endCol: ' + coords.endCol);
				coords = {}
			} else {
				var startCol = $(this).attr('class');
				coords.startCol = parseInt(startCol.slice(-1));
				var startRow = $(this).parent().attr('class');
				coords.startRow = charToNum[startRow.slice(-1)];
			}
		});
	});

	$(document).on('boardChange', function(e, board, turns, currentPlayer) {
		console.log(board);
		for (var i = 0; i < board.length; i++) {
			for (var j = 0; j < board.length; j++) {
				var row = $('.row').parent().find('.row').get(i);
				var col = $(row).children().get(j);
				var div = $(col).has('div').find('div');
				if (board[i][j] == ' X ') {
					$(div).removeClass();
				} else if (board[i][j] == 'wht') {
					if (!$(div).hasClass('white piece')) {
						$(div).addClass('white piece');
					}
				} else {
					if (!$(div).hasClass('red piece')) {
						$(div).addClass('red piece');
					}
				}
			}
		}
	});
});