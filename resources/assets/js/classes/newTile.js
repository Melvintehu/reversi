import { directions } from './minimax/directions';

class NewTile {

  constructor(row, column, value) {
    this.tiles = [];
    this.row = row;
    this.column = column;
    this.value = value;
    this.neighbors = [];
    this.tilesToFlip = [];
    this.currentPlayer = value;
  }

  calcIndex() {
    return parseInt(this.row) * 8 + parseInt(this.column);
  }

  /**
   * pass down all the tiles from a board
   * @param  {[type]} tiles [description]
   * @return {[type]}       [description]
   */
  findNeighbors(tiles) {
    for(let i in tiles) {
      let neighbor = tiles[i];
      if( this.inRange(1, neighbor) && neighbor.value != 0 ) {
        this.neighbors.push(neighbor);
      }
    }
  }

  cloneObject(tiles) {
    return tiles.map((tile) => {
        let tempTile = Object.assign({}, tile);
        return new NewTile(tempTile.row, tempTile.column, tempTile.value);
      });
  }

  // boolean checks
  isValid(tiles, currentPlayer) {
    this.tiles = tiles;
    this.currentPlayer = currentPlayer;
    // console.log('IS VALID the currentPlayer is: ', currentPlayer);

    if( this.isOccuppied() ) { return false; }
    if( this.isIssolated()) { return false; }

    directions.forEach((direction, i) => {
      let tiles = this.checkDirection(i);

      if(tiles.length !== 0) {
        this.tilesToFlip[i] = tiles;
      }
    });

    if (this.tilesToFlip.length === 0) {
      return false
    }

    return true;
  }

  checkDirection(direction) {
      let tiles = [];
      let neighbor = this.neighbor(direction, this.tiles);
      if ( this.isOwnTile(neighbor) ) {
        return [];
      }

      while( this.isOpponent(neighbor) ) {
        tiles.push(neighbor);
        neighbor = neighbor.neighbor(direction, this.tiles);
      }

      if ( this.isOwnTile(neighbor) ) {
        console.log('tiles found', tiles);
        return tiles;
      }

    return [];
  }

  neighbor(direction, tiles) {
    let row = parseInt(this.row) + directions[direction][0] ;
    let column = parseInt(this.column) + directions[direction][1];
    if(row > 7 || row < 0 || column > 7 || column < 0 ) {
      return new NewTile(0,0,0);
    }

    let neighbor = tiles[(row * 8 + column)];

    if(typeof(neighbor) === 'undefined' ) {
      return new NewTile(0,0,0);
    }

    return neighbor;
  }

  inRange(range, tile) {
    return (Math.abs(tile.row - this.row) <= range && Math.abs(tile.column - this.column) <= range );
  }

  inRangeUpdate(range, row, column) {
    return (Math.abs(row - this.row) <= range && Math.abs(column - this.column) <= range );
  }

  isIssolated() {
    return directions.filter((direction, i) => {
      let row = parseInt(this.row) + directions[i][0] ;
      let column = parseInt(this.column) + directions[i][1];

      if(row <= 7 && row >= 0 && column <= 7 && column >= 0 ) {
        let tile = this.tiles[(parseInt(row) * 8 + parseInt(column))];
        if(this.inRangeUpdate(1, row, column) && tile.value != 0) {
          return true;
        }
      }
    }).length === 0;
  }

  isOccuppied() {
    return this.value != 0;
  }

  notOccuppied(tile) {
    if(typeof(tile) === 'undefined' )  {
      return false;
    }
    return  tile.currentPlayer == 0;
  }

  isOpponent(tile) {
    if(typeof(tile) === 'undefined' )  {
      return false;
    }

    if(tile.value == 0) {
      return false;
    }
    // console.log('is currentPlayer still the same? : ', this.currentPlayer);
    return this.currentPlayer != tile.value && tile.value != 0;
  }

  isOwnTile(tile) {
    if(typeof(tile) === 'undefined' )  {
      return false;
    }

    if(tile.value == 0) {
      return false;
    }

    return this.currentPlayer == tile.value;
  }

}

export default NewTile;