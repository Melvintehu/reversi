import NewTile from './newTile';

class Board {

  constructor(tiles, currentPlayer) {
    this.tiles = tiles;
    this.currentPlayer = currentPlayer;
  }

  add(tile) {
    this.tiles.push(tile);
  }

  static getTilesFromBoard(board) {
    let tiles = [];
    for( let row in board ) {
      for( let column in board[row] ) {
        tiles.push( new NewTile(row, column, board[row][column] ) );
      }
    }
    return tiles;
  }

  convertToObject() {
    let convertedBoard = {};

    for(let i in this.tiles)
    {
      let tile = this.tiles[i];
      if ( ! convertedBoard[tile.row]) {
        convertedBoard[tile.row] = {};
      }
      convertedBoard[tile.row][tile.column] = tile.value;
    }

    return convertedBoard;
  }

  undoMove(move, currentPlayer) {
    let row = move.row;
    let column = move.column;
    let succeeded = false;
    this.tiles.forEach((tile) => {
      if(tile.row == row && tile.column == column) {
          this.roleBackTiles(tile.tilesToFlip, currentPlayer);
          tile.value = 0;
          succeeded = true;
      }
    });

    return succeeded;
  }

  doMove(row, column, currentPlayer) {
    let succeeded = false;

    this.tiles.forEach((tile) => {
      if(tile.row == row && tile.column == column) {
        if(tile.isValid(this.tiles, currentPlayer)) {
          this.flipTiles(tile.tilesToFlip, currentPlayer);
          tile.value = currentPlayer;
          succeeded = true;
        }
      }
    });

    return succeeded;
  }

  roleBackTiles(directions, currentPlayer) {
    for(let i in directions) {
      directions[i].forEach((tile) => {
        let currentTile = this.tiles[tile.calcIndex()];
        if(currentTile.row == tile.row && currentTile.column == tile.column) {
          currentTile.value = (currentPlayer == 1 ? 2 : 1);
        }
      });
    }
  }


  flipTiles(directions, currentPlayer) {
    for(let i in directions) {
      directions[i].forEach((tile) => {
        let currentTile = this.tiles[tile.calcIndex()];
        if(currentTile.row == tile.row && currentTile.column == tile.column) {
          currentTile.value = currentPlayer;
        }
      });
    }
  }

  getEmptyTiles() {
    return this.tiles.filter((tile) => {
      return tile.value == 0;
    });
  }

}

export default Board;