import { boardDistances } from './boardDistances';
import Rules from './rules';

class Tile {

  constructor(column, row, board, player) {
    this.board = board;
    this.player = player;
    this.column = column;
    this.row = row;
    this.tilesToFlip = [];
    this.value = this.board[row][column];
  }

// ------- BOOLEAN FUNCTION CHECKS -------//////

  emptyTileWithoutSurroundingPieces(row, column) {
    let surroundingPlayerPieces = [];

    for(let direction in Rules.directions()) {
      if(this[direction]().value != 0 && this[direction]().value != 3) {
        surroundingPlayerPieces.push(this[direction]().value);
      }
    }

    if(surroundingPlayerPieces.length == 0) {
      return true;
    }

    return false;
  }


// ------- MAIN FUNCTIONS -------//////
  valid(row, column) {

    // prevent occupied tile clicks
    if(
        Rules.isCurrentPlayersTile(this.board, row, column, this.player)
        || Rules.isOpponentsTile(this.board, row, column, this.player)
    ) {
      return false;
    }

    // prevent empty tile clicks
    if(this.emptyTileWithoutSurroundingPieces(row, column)) {
      return false;
    }

    // check all the directions of the current move
    let legalMovesFound = [];
    for(let direction in Rules.directions()) {
      if(this.checkDirection(direction)) {
        legalMovesFound.push(direction);
      }
    }

    if(legalMovesFound.length != 0) {
      return true;
    }

    return false;
  }


  flipTiles(tiles) {

    for(let direction in Rules.directions()) {
      for(let index in tiles[direction]) {
        let row = tiles[direction][index][0];
        let column = tiles[direction][index][1];

        this.board[row][column] = this.player;
      }
    }
  }


  checkDirection(direction) {
    let row = this.row;
    let column = this.column;
    let searchForOpponentPiece = true;
    let searchForFriendlyPiece = false;
    let stop = false;
    let tilesToFlip = [];

    for(let i = 8; i > 0; i--) {


      // increments to a specific direction
      row = parseInt(row) + Rules.directionRules()[direction].xChange;
      column = parseInt(column) + Rules.directionRules()[direction].yChange;

      if(Rules.outOfBounds(row) || Rules.outOfBounds(column) ) {
        delete this.tilesToFlip[direction];
        return false;
      }

      if( searchForOpponentPiece ) {
        if( Rules.isOpponentsTile(this.board, row, column, this.player) ) {

          searchForOpponentPiece = false;
          searchForFriendlyPiece = true;
          this.tilesToFlip[direction] = [];
          this.tilesToFlip[direction].push([row, column]);

        } else {

          return false;
        }

      } else if( searchForFriendlyPiece ) {

        let tile = new Tile(column, row, this.board, this.player);

        if( Rules.isNonNeutralTile(this.board, row, column)) {

          if( Rules.isOpponentsTile(this.board, row, column, this.player) ) {
            this.tilesToFlip[direction].push([row, column]);
          }else {
            return true;
          }

        } else {
          delete this.tilesToFlip[direction];
          return false;
        }

      }
    }
  }


// ------- HELPER FUNCTIONS -------//////

  right() {
    let column = parseInt(this.column) + 1;
    if(Rules.outOfBounds(column)) {
      return 3;
    }

    return new Tile(column, this.row, this.board, this.player);
  }

  topRight() {
    let column = parseInt(this.column) + 1;
    let row = parseInt(this.row) - 1;
    if(Rules.outOfBounds(row) || Rules.outOfBounds(column)) {
      return 3;
    }

    return new Tile(column, row, this.board, this.player);
  }

  bottomRight() {
    let column = parseInt(this.column) + 1;
    let row = parseInt(this.row) + 1;
    if(Rules.outOfBounds(row) || Rules.outOfBounds(column)) {
      return 3;
    }

    return new Tile(column, row, this.board, this.player).value;
  }


  left() {
    let column = parseInt(this.column) - 1;
    if(Rules.outOfBounds(column)) {
      return 3;
    }

    return new Tile(column, this.row, this.board, this.player).value;
  }

  topLeft() {
    let column = parseInt(this.column) - 1;
    let row = parseInt(this.row) - 1;
    if(Rules.outOfBounds(row) || Rules.outOfBounds(column)) {
      return 3;
    }

    return new Tile(column, row, this.board, this.player).value;
  }


  bottomLeft() {
    let column = parseInt(this.column) - 1;
    let row = parseInt(this.row) + 1;
    if(Rules.outOfBounds(row) || Rules.outOfBounds(column)) {
      return 3;
    }

    return new Tile(column, row, this.board, this.player).value;
  }

  bottom() {
    let row = parseInt(this.row) + 1;
    if(Rules.outOfBounds(row)) {
      return 3;
    }

    return new Tile(this.column, row, this.board, this.player).value;
  }

  top() {
    let row = parseInt(this.row) - 1;
    if(Rules.outOfBounds(row)) {
      return 3;
    }

    return new Tile(this.column, row, this.board, this.player).value;
  }

}

export default Tile;