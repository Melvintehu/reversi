class Rules {
  constructor(){

  }

  static outOfBounds(tileNumber) {
    if(tileNumber > 7 || tileNumber < 0) {
      return true;
    }
    return false;
  }

  static directionRules() {
      return {

        left: { xChange: 0, yChange: -1 },
        right: { xChange: 0, yChange: +1 },
        top: { xChange: -1, yChange: 0 },
        bottom: { xChange: +1, yChange: 0 },
        topLeft: { xChange: -1, yChange: -1 },
        bottomLeft: { xChange: +1, yChange: -1 },
        topRight: { xChange: -1, yChange: +1 },
        bottomRight: { xChange: +1, yChange: +1 },
      }
    };

    static directions() {
      return  {
        left: 0,
        right: 1,
        top: 2,
        bottom: 3,
        topLeft: 4,
        topRight: 5,
        bottomLeft: 6,
        bottomRight: 7,
      }
    }

    static isNeutralTile(board, row, column) {
      return board[row][column] == 0;
    }

    static isNonNeutralTile(board, row, column) {

      return board[row][column] != 0;
    }

    static isOpponentsTile(board, row, column, player) {
      return board[row][column] == (player == 1 ? 2 : 1 );
    }

    static isCurrentPlayersTile(board, row, column, player) {
      return board[row][column] == (player == 1 ? 1 : 2 );
    }

};

export default Rules;