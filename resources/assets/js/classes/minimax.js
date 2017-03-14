import Tile from './tile';
import NewTile from './newTile';
import Board from './board';
import { boardValues } from './minimax/boardValues';

class Minimax {

  constructor(board, player) {
    this.board = board;
  }

  bestMove(player) {
    let start = this.getTime();
    let depth = 8;
    let alpha = -Infinity;
    let beta = Infinity;

    let opponent = player == 1 ? 2 : 1;
    this.counter = 0;

    let moves = Minimax.generateMoves(this.board, player);
    var bestValue = { total: -Infinity, move: false };

    for(let i in moves) {
        let move = moves[i];
        this.board.doMove(move.row, move.column, player);
        let score = this.minimax(this.board, opponent, depth-1, alpha, beta);

        if(score >= bestValue.total) {
          bestValue.total = score;
          bestValue.move = move;
        }

        // alpha beta prunning
        alpha = Math.max(alpha, bestValue.total);
        if(beta <= alpha) {
          break;
        }

        this.board.undoMove(move, player);
      }
      console.log('searched number of nodes: ' , this.counter);
      return bestValue.move;
  }

  minimax(board, player, depth, alpha, beta) {

    if(depth == 0) {
      return this.evaluateBoard(board, player);
    }

    let moves = Minimax.generateMoves(board, player);
    if(player == 2) {
      var maximumScore = -Infinity;

      for(let i in moves) {
        let move = moves[i];
        board.doMove(move.row, move.column, 2);

        maximumScore = Math.max(maximumScore, this.minimax(board, 1, depth-1));
        board.undoMove(move, player);

        // alpha beta prunning
        alpha = Math.max(alpha, maximumScore);
        if(beta <= alpha) {
          break;
        }
      }
      return maximumScore;

    } else if(player == 1){
      var minimumScore = Infinity;

      for(let i in moves) {
        let move = moves[i];
        board.doMove(move.row, move.column, 1);

        minimumScore = Math.min(minimumScore, this.minimax(board, 2, depth-1));
        board.undoMove(move, player);

        // alpha beta prunning
        beta = Math.min(alpha, minimumScore);
        if(beta <= alpha) {
          break;
        }
      }

      return minimumScore;
    }

  }

  evaluateBoard(board){
    this.counter ++;
    let total = this.diskSquares(board, board.currentPlayer);
    return total;
  }

  diskSquares(board, player) {
    let tiles = board.tiles;
    let currentPlayer = player;
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
    let validTiles = [];
    for(let i in board.tiles) {
      let tile = board.tiles[i];
      if(tile.isValid(board.tiles, player)) {
        validTiles.push(tile);
      }
    }


    return validTiles;
    // return board.tiles.filter((tile) => {
    //   return tile.isValid(board.tiles, player);
    // });
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
    // console.log('player ', player, ' did a move');
    let rows = [];

    for(let i = 0; i < 8; i++) {
        let row = '|' + i + '| ' ;
        let column = '';
        for(let j = 0; j < 8; j++) {
          column += board.tiles[((i * 8) + j)].value;
        }
        row += column;
        rows.push(row);
    }
    for(let i in rows) {
      console.log(rows[i]);
    }
    // console.log('next move is for player: ', player);
  }

}

export default Minimax;