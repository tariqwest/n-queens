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



window.findNRooksSolution = function(n, possibility) {
  var solution = false;
  var board = new Board(possibility);
  if(!board.hasAnyColConflicts()){
    solution = board;
    //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  var findRowPossibilities = function(){
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



  var findBoardPossibilities = function(n, rowPossibilities) {
    var boardPossibilities = [];

    function findBoardPossibility(rowsLeft, result){
      // when you cover all the rows
      // push to the boardPossibilities
      if (rowsLeft === 0) {
        boardPossibilities.push(result);
        return;
      }

      rowPossibilities.forEach(function(row){
        //result.push(row);
        //concat returns the entire array
        findBoardPossibility(rowsLeft-1, result.concat([row]))
      })
    }

    findBoardPossibility(n, []); // give it a starting point

    return boardPossibilities;
  }

  var possibilities = findBoardPossibilities(n, findRowPossibilities(n));

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
  var solution = false;
  var board = new Board(possibility);
  if(!board.hasAnyQueensConflicts()){
    solution = board;
    //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

    var findRowPossibilities = function(){
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



  var findBoardPossibilities = function(n, rowPossibilities) {
    var boardPossibilities = [];

    function findBoardPossibility(rowsLeft, result){
      // when you cover all the rows
      // push to the boardPossibilities
      if (rowsLeft === 0) {
        boardPossibilities.push(result);
        return;
      }

      rowPossibilities.forEach(function(row){
        //result.push(row);
        //concat returns the entire array
        findBoardPossibility(rowsLeft-1, result.concat([row]))
      })
    }

    findBoardPossibility(n, []); // give it a starting point

    return boardPossibilities;
  }

  var possibilities = findBoardPossibilities(n, findRowPossibilities(n));

  for(var i=0; i<possibilities.length; i++){
    if(findNQueensSolution(n, possibilities[i]) !== false){
      solutionCount++;
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount; 
};
