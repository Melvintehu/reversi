<template>
<div class="gameBackground">


  <div style="color: black; background:white"> witte vlakken: {{ whiteTiles }}</div>
  <div style="color: black; background:white"> zware vlakken: {{ blackTiles }}</div>

  <div class="board">

    <div style="margin: 0px;" v-for="(row, index) in board">

      <div class="block">
        <span style="background: white">{{index}} </span>
        <div class="boardTile inline-block" v-for="(column, colIndex) in row">
          <transition name="fade">
            <div @click="handleTile(index, colIndex)" v-if="column == 2" class="blackPlayer tile">{{colIndex}}</div>
          </transition>
          <transition name="fade">
            <div @click="handleTile(index, colIndex)" v-if="column == 1" class="whitePlayer tile">{{colIndex}}</div>
          </transition>
          <transition name="fade">
            <div @click="handleTile(index, colIndex)" v-if="column == 0" class="neutralTile tile">{{colIndex}}</div>
          </transition>
        </div>
      </div>
    </div>

  </div>

</div>
</template>

<style type="text/css">

.gameBackground {
  background: #1A1B41;
  margin-top: 400px;
  text-align: center;
}

.board {
  display: inline-block;
  margin: 0 auto;
}

.tile {
  width: 100%;
  height: 100%;

  cursor: pointer;

  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
 }

.blackPlayer { background: black; }
.whitePlayer { background: white; }
.neutralTile { background: #BAFF29; }

  .boardTile {
    /*border: 5px solid #1A1B41;*/
    padding: 5px;
    width: 50px;
    height: 50px;

  }

  .block {
    padding: 0px;
    margin: 0px;
    display: block;
  }

  .inline-block {
    display: inline-block;
  }


</style>

<script type="text/javascript">
import Tile from '../classes/tile';
import NewTile from '../classes/newTile';
import Minimax from '../classes/minimax';
import MinimaxOld from '../classes/minimaxOld';
import Board from '../classes/board';

export default {

  data() {
    return  {
      board:
      {
        0: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0},
        1: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0},
        2: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0},
        3: { 0: 0, 1: 0, 2: 0, 3: 1, 4: 2, 5: 0, 6: 0, 7: 0},
        4: { 0: 0, 1: 0, 2: 0, 3: 2, 4: 1, 5: 0, 6: 0, 7: 0},
        5: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0},
        6: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0},
        7: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0},
      },
      player: 1,
      opponent: 2,
      blackTiles: 0,
      whiteTiles: 0
    }
  },

  created() {
    // this.nextMove();
  },
  methods: {
    drawBoard() {

    },

    nextMove() {

        let tiles = Board.getTilesFromBoard(this.board);
        let board = new Board(tiles, 1);
        let minimax = new Minimax(board);
        let bestMove = false;
        bestMove = minimax.bestMove(1);

        this.handleTile(bestMove.row, bestMove.column);
          setTimeout(()=> {
            // this.nextMove();
          }, 200);



    },

    drawTile(row, column, value) {
      this.board[row][column] = value;
      this.board = Object.assign({}, this.board);
    },

    handleTile(row, column) {
      let tiles = Board.getTilesFromBoard(this.board);
      let board = new Board(tiles, this.player);

      if(board.doMove(row, column, this.player)) {
        this.board = Object.assign({}, board.convertToObject());
        this.opponentMove(2);
      }

    },

    opponentMove(player) {
      let tiles = Board.getTilesFromBoard(this.board);
      let board = new Board(tiles, player);

      let minimax = new MinimaxOld(board);
      let bestMove = minimax.bestMove(player);

        board.doMove(bestMove.row, bestMove.column, player);


      this.board = Object.assign({}, board.convertToObject());
      this.countTiles();
    },

    countTiles() {
      let tiles = Board.getTilesFromBoard(this.board);
      this.whiteTiles = 0;
      this.blackTiles = 0;
      for(let i in tiles) {
        let tile = tiles[i];
        if(tile.value == 1) {
          this.whiteTiles += 1;
        } else if(tile.value == 2) {
          this.blackTiles += 1;
        }
      }

    }

  }

}


</script>