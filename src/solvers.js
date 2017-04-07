/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


var _findRowPossibilities = function(n){
  var rowPossibilities = [];

  // Produce all posibilities of placing of placing 1 in a row of size n
  for(var i=0; i<n; i++){
    var row = [];
    for(var j=0; j<n; j++){
      row.push(0);
    }
    row[i] = 1; 
    rowPossibilities.push(row);
  }

  return rowPossibilities;
}

var _findBoardPossibilities = function(n, rowPossibilities) {
var boardPossibilities = [];

function findBoardPossibility(rowsLeft, board){
  // Push board to boardPossibilities when it has n rows
  if (rowsLeft === 0) {
    boardPossibilities.push(board);
    return;
  }

  // Find possible combinations for successive rows up to n rows
  rowPossibilities.forEach(function(row){
    findBoardPossibility(rowsLeft-1, board.concat([row]))
  })
}

findBoardPossibility(n, []);

return boardPossibilities;
}


window.findNRooksSolution = function(n, possibility) {
  
  // generate identity matrix for n-dimension
  var identity = [];
  for(var i=0; i<n; i++){
      var row = [];
      for(var j=0; j<n; j++){
        row.push(0);
      }
      row[i] = 1; 
      identity.push(row);
  }

  var possibility = possibility || identity;

  var solution = false;
  var board = new Board(possibility);
  if(!board.hasAnyColConflicts()){
    solution = possibility;
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var possibilities = _findBoardPossibilities(n, _findRowPossibilities(n));

  for(var i=0; i<possibilities.length; i++){
    if(findNRooksSolution(n, possibilities[i]) !== false){
      solutionCount++;
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};






// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, possibility) {
  // generate identity matrix for n-dimension

  var possibility = possibility || 0;

  var solution = false;
  var board = new Board(possibility);
  if(!board.hasAnyQueensConflicts()){
    solution = possibility;
    //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  }

  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  var possibilities = _findBoardPossibilities(n, _findRowPossibilities(n));

  for(var i=0; i<possibilities.length; i++){
    if(findNQueensSolution(n, possibilities[i]) !== false){
      solutionCount++;
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount; 
};
