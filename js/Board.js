
import {Tile} from "./Tile.js";




export class Board{

  constructor(boardSize, flagCount, mineCount){
    this.flagCount = flagCount;
    this.mineCount = mineCount;
    this.boardSize = boardSize;
    this.tiles = [];
  }

  initBoard(flagCounterEl, TimerEl, boardEl, boardAreaEl ){    
    flagCounterEl.innerHTML = `${this.flagCount}`;
    TimerEl.innerHTML = "tester";

    for(let i = 0; i < this.boardSize; i++){
      let row = [];
      for(let j = 0; j < this.boardSize; j++){
        const tileEl = document.createElement("div");
        tileEl.className = `tile`;
        tileEl.id = `${i}${j}`
        tileEl.innerHTML = ` `;
        boardEl.appendChild(tileEl);

        row.push(new Tile());        
      }

      this.tiles.push(row);
    }
    this.placeMines();
    boardAreaEl.appendChild(boardEl);
  }

  placeMines(){
    let remainingMines = this.mineCount;
    while(remainingMines > 0){
      const randomX = Math.floor(Math.random() * this.boardSize);
      const randomY = Math.floor(Math.random() * this.boardSize);

      if(!this.tiles[randomY][randomX].containsMine){
        this.tiles[randomY][randomX].containsMine = true;
        remainingMines--;
      }
      this.adjustAdjacentMines(randomY,randomX);
    }
  }

  adjustAdjacentMines(x, y){
    //left coloum
    if(x-1 >= 0){
      // console.log("left center");
      this.tiles[x-1][y].adjacentMines++;

      if(y-1 >= 0){
      //   console.log("upper left corner");
        this.tiles[x-1][y-1].adjacentMines++;
      }
      if(y+1 < this.boardSize){
        // console.log("bottom left corner");
        this.tiles[x-1][y+1].adjacentMines++;
      }
    }
    //right coloum
    if(x+1 < this.boardSize){
      // console.log("right center");
      this.tiles[x+1][y].adjacentMines++;

      if(y-1 >= 0){
        // console.log("upper right corner");
        this.tiles[x+1][y-1].adjacentMines++;
      }
      if(y+1 < this.boardSize){
        // console.log("bottom right corner");
        this.tiles[x+1][y+1].adjacentMines++;
      }
    }
    //center coloum
    if(y-1 >= 0){
      // console.log("upper center")
      this.tiles[x][y-1].adjacentMines++;
    }
    if(y+1 < this.boardSize){
      // console.log("bottom center")
      this.tiles[x][y+1].adjacentMines++;
    }
  }

  //reveals tiles
  handleLeftClick(evt){
    
    // if reveal tile adacent mine value is 0
    // this.clearEmptyTile();

  }

  //place flags
  handleRightClick(){

  }

  //recursive method to clear all empty adjacent tiles
  clearEmptyTile(){

  }

  reset(){

  }
}