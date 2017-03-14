import Tile from './tile';
import NewTile from './newTile';
import Board from './board';
import { boardValues } from './minimax/boardValues';

class MinimaxOld {

  constructor(board, player) {
    this.board = board;
    this.testBoard = new Board(board.tiles, board.currentPlayer);
  }

  getTime() {
      var d = new Date();
    return d.getTime();
  }

  bestMove(player) {
    let start = this.getTime();

    let depth = 1;
    let board  = this.cloneObject(this.testBoard.tiles, this.board.currentPlayer);
    let moves = MinimaxOld.generateMoves(board, player);
    return moves[0];
    // let move = this.minimax(board, board.currentPlayer, depth).move;
    // console.log('MINIMAX OF THE NEW AI TOOK: ', (this.getTime() - start) / 1000, ' seconds');
    // return move;
  }

  minimax(board, player, depth) {
    let testBoard = this.cloneObject(board.tiles, board.currentPlayer);
    let moves = MinimaxOld.generateMoves(testBoard, player);

    if(depth == 0 ) {
      return { total: this.evaluateBoard(testBoard), move: false };
    }

    if(player === 2) {
      var bestValue = { total: -Infinity, move: false };

      for(let i in moves) {
        let move = moves[i];
        testBoard.doMove(move.row, move.column, player);
        let score = this.minimax(testBoard, 1, depth-1);
        // console.log('NEW score for max',score.total);

        if(score.total >= bestValue.total) {
          bestValue.total = score.total;
          bestValue.move = move;
        }

        testBoard = this.cloneObject(board.tiles, board.currentPlayer);
        // testBoard.undoMove(move.row, move.column);
      }
        // console.log('NEW bestValue for max: ', bestValue.total);
        return bestValue;
    } else {

      var bestValue = { total: Infinity, move: false };
      for(let i in moves) {
        let move = moves[i];
        testBoard.doMove(move.row, move.column, player);

        let score = this.minimax(testBoard, 2, depth-1);
        // console.log('NEW score for min',score.total);

        if(score.total <= bestValue.total) {
          bestValue.total = score.total;
          bestValue.move = move;
        }

        testBoard = this.cloneObject(board.tiles, board.currentPlayer);
        // testBoard.undoMove(move.row, move.column);
      }
      // console.log('NEW bestValue for min: ', bestValue.total);
      return bestValue;
    }

  }

  getPlayerCoins(board) {
    let coins = [
      0,
      0,
    ];
    let currentPlayer = board.currentPlayer;
    let opponent = currentPlayer == 1 ? 2 : 1;

    board.tiles.forEach((tile) => {
      if(tile.value == currentPlayer) {
        coins[0] += 1;
      } else if(tile.value == opponent) {
        coins[1] += 1;
      }
    });
    return coins;
  }

  evaluateBoard(board){
    let total = this.diskSquares(board);
    return total;
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

  static generateMoves(board, player) {
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

}

export default MinimaxOld;