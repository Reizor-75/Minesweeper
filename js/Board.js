
import {Tile} from "./Tile.js";

export class Board{

  constructor(boardSize, mineCount){
    this.mineCount = mineCount;
    this.boardSize = boardSize;
  }

  initBoard(TimerEl, boardAreaEl){   
    this.tiles = [];    
    this.flagCount = this.mineCount;
    this.updateFlagCounter();
    TimerEl.innerHTML = "tester";

    for(let i = 0; i < this.boardSize; i++){
      let row = [];
      const rowEl = document.createElement("div");
      rowEl.className = `row ${i}`;
      
      for(let j = 0; j < this.boardSize; j++){
        const tileEl = document.createElement("div");
        tileEl.className = `tile`;
        tileEl.id = `X${i}Y${j}`
        tileEl.innerHTML = ` `;
        rowEl.appendChild(tileEl);

        row.push(new Tile());        
      }
      boardAreaEl.appendChild(rowEl);
      this.tiles.push(row);
    }
    this.placeMines();
  }

  placeMines(){
    let remainingMines = this.mineCount;

    while(remainingMines > 0){
      const randomX = Math.floor(Math.random() * this.boardSize);
      const randomY = Math.floor(Math.random() * this.boardSize);

      if(!this.tiles[randomX][randomY].containsMine){
        this.tiles[randomX][randomY].containsMine = true;
        remainingMines--;
        this.adjustAdjacentMines(randomX,randomY);
      }
      }
  }

  adjustAdjacentMines(x, y){
    // left side
    if(x-1 >= 0){
      this.tiles[x-1][y].adjacentMines++;

      if(y-1 >= 0) this.tiles[x-1][y-1].adjacentMines++;
      if(y+1 < this.boardSize) this.tiles[x-1][y+1].adjacentMines++;
    }
    //right coloum
    if(x+1 < this.boardSize){
      // console.log(this.tiles[x+1][y]);
      this.tiles[x+1][y].adjacentMines++;

      if(y-1 >= 0) this.tiles[x+1][y-1].adjacentMines++;
      if(y+1 < this.boardSize) this.tiles[x+1][y+1].adjacentMines++;
    }
    //center coloum
    if(y-1 >= 0) this.tiles[x][y-1].adjacentMines++;
    if(y+1 < this.boardSize) this.tiles[x][y+1].adjacentMines++;
  }

  //reveals tiles
  handleLeftClick(evt){
    if(evt.target.className === "tile"){
      const tileId = evt.target.id;
      const tileLocation = this.getTileLocation(tileId);
      this.updateTileDisplay(tileLocation);
    }
  }

  getTileLocation(tileId){
    const location =[];    
    let row = tileId.slice(1, tileId.indexOf("Y"));
    location.push(row);
    let col = tileId.slice(tileId.indexOf("Y")+1, tileId.length);
    location.push(col);
  
    return location;
  }

  updateTileDisplay(tileLocation){
    const currentTile = this.tiles[tileLocation[0]][tileLocation[1]];
    const tileEl = document.getElementById(`X${tileLocation[0]}Y${tileLocation[1]}`)
    if(!currentTile.isFlagged){
      currentTile.revealTile();
      tileEl.classList.add("revealed");

      if(currentTile.containsMine)
        tileEl.textContent = "M";
      else{
        if(currentTile.adjacentMines != 0){
          this.updatefontColor(currentTile.adjacentMines, tileEl);
          tileEl.textContent = currentTile.adjacentMines;
        }
        else{
          this.clearEmptyTile(tileLocation);
        }
      }
    }
    // console.log(this.tiles);
  }

  updatefontColor(numOfMines, tileEl){
    if(numOfMines === 1) tileEl.classList.add("one");
    else if(numOfMines === 2) tileEl.classList.add("two");
    else if(numOfMines === 3) tileEl.classList.add("three");
    else if(numOfMines === 4) tileEl.classList.add("four");
    else if(numOfMines === 5) tileEl.classList.add("five");
    else if(numOfMines === 6) tileEl.classList.add("six");
    else if(numOfMines === 7) tileEl.classList.add("seven");
    else tileEl.classList.add("eight");
  }

  updateFlagCounter(){
    const flagCounterEl = document.getElementById("flag-Counter");
    flagCounterEl.innerHTML = `${this.flagCount}`;
  }

  //place flags
  handleRightClick(evt){
    evt.preventDefault();
    if(evt.target.classList.contains("tile")){
      const tileId = evt.target.id;
      const tileEl = document.getElementById(tileId);
      const tileLocation = this.getTileLocation(tileId);
      const currentTile = this.getTile(tileLocation);

      currentTile.addFlag();   

      if(currentTile.isFlagged) {
        if(this.flagCount >0){
          tileEl.classList.add("flagged");
          this.flagCount--;
          }
      }
      else {
        tileEl.classList.remove("flagged");
        this.flagCount++;
      }
      this.updateFlagCounter();

    }
  }  
  //recursive method to clear all empty adjacent tiles
  clearEmptyTile(tileLocation){
  
  }
}