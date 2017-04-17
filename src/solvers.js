/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

var findSolution = function(currentRow, n, board, conflictType, incrementCount) {
  if (currentRow === n) {
    incrementCount();
    return;
  }

  // For each possible column in current row
  for(var i=0; i<n; i++){
    // Place a piece
    board.togglePiece(currentRow, i);

    // If piece placement doesn't result in a conflict, proceed to next row
    if(!board[conflictType]()){
      findSolution(currentRow + 1, n, board, conflictType, incrementCount);
    }

    // Undo current piece placement before trying the next
    board.togglePiece(currentRow, i);
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution = undefined;
  var board = new Board({n:n});

  findSolution(0, n, board, 'hasAnyRooksConflicts', function(){ 
    solution = _.map(board.rows(), function(row){
      return row.slice();
    });
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  findSolution(0, n, board, 'hasAnyRooksConflicts', function(){ solutionCount++; });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, possibility) {
  var solution = undefined;
  var board = new Board({n:n});

  if(n === 2 || n === 3){
    return board.rows();
  }

  findSolution(0, n, board, 'hasAnyQueensConflicts', function(){ 
    solution = _.map(board.rows(), function(row){
      return row.slice();
    });
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  findSolution(0, n, board, 'hasAnyQueensConflicts', function(){ solutionCount++; });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
