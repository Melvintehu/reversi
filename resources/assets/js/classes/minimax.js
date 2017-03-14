import Tile from './tile';
import NewTile from './newTile';
import Board from './board';
import { boardValues } from './minimax/boardValues';

class Minimax {

  constructor(board, player) {
    this.board = board;
    this.testBoard = new Board(board.tiles, board.currentPlayer);
  }


  bestMove(player) {
    let start = this.getTime();
    let depth = 2;
    let board  = this.cloneObject(this.testBoard.tiles, this.board.currentPlayer);

    let moves = Minimax.generateMoves(board, player);
    var bestValue = { total: -Infinity, move: false };

    for(let i in moves) {
        let move = moves[i];
        board.doMove(move.row, move.column, player);
        let score = this.minimax(board, 2, depth-1);

        if(score >= bestValue.total) {
          bestValue.total = score;
          bestValue.move = move;
        }

        board.undoMove(move, player);
      }

      return bestValue.move;
  }



  minimax(board, player, depth) {
    this.printBoard(board, player);


    if(depth == 0) {
      console.log('depth reached');
      return this.evaluateBoard(board);
    }

    let moves = Minimax.generateMoves(board, player);
    console.log('generated ', moves.length , ' moves for player: ', player);

    if(player == 2) {
      console.log('its players 2 turn');
      var maximumScore = -Infinity;

      for(let i in moves) {
        let move = moves[i];
        board.doMove(move.row, move.column, player);
        let score = this.minimax(board, 1, depth-1);
        maximumScore = Math.max(maximumScore, score);
        board.undoMove(move, player);
        console.log('boards original state');
        this.printBoard(board, player);
      }

      return maximumScore;

    } else {
      console.log('its players 1 turn');
      var minimumScore = Infinity;

      for(let i in moves) {
        let move = moves[i];
        board.doMove(move.row, move.column, player);
        let score = this.minimax(board, 2, depth-1);
        minimumScore = Math.min(minimumScore, score);
        board.undoMove(move, player);
      }

      return minimumScore;
    }

  }

  evaluateBoard(board){
    return 5;
    // return this.diskSquares(board);
  }

  diskSquares(board) {
    let tiles = board.tiles;
    let currentPlayer = board.currentPlayer;
    let opponent = currentPlayer == 1 ? 2 : 1;

    let d = 0;

    tiles.forEach((tile) => {
      if(tile.value == currentPlayer) {
        d += boardValues[tile.row][tile.column];
      } else if(tile.value == opponent) {
        d -= boardValues[tile.row][tile.column];
      }
    });

    return d;
  }

  // HIER ZIT DE FOUT
  // ER MOET GEKEKEN WORDEN OF EEN ZET VALID IS
  static generateMoves(board, player) {
    console.log('GENERATING MOVES!! FOR PLAYER: ', player );
    return board.tiles.filter((tile) => {
      return tile.isValid(board.tiles, player);
    });
  }

  cloneObject(tiles, currentPlayer) {
    return new Board(
      tiles.map((tile) => {
        let tempTile = Object.assign({}, tile);
        return new NewTile(tempTile.row, tempTile.column, tempTile.value);
      }) , currentPlayer);
    }


  getTime() {
      var d = new Date();
    return d.getTime();
  }

  printBoard(board, player) {
    console.log('printing the board');
    let rows = [];

    for(let i = 0; i < 8; i++) {
        let row = '|' + i + '| ' + board.tiles[(i * 8)].value;
        for(let j = 0; j < 8; j++) {
          row += '' + board.tiles[(i * 8 + j)].value;
        }
        rows.push(row);
    }
    for(let i in rows) {
      console.log(rows[i]);
    }
    // console.log('next move is for player: ', player);
  }

}

export default Minimax;