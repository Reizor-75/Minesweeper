
import {Tile} from "./Tile.js";

export class Board{

  constructor(boardSize, flagCount, mineCount){
    this.flagCount = flagCount;
    this.mineCount = mineCount;
    this.boardSize = boardSize;
  }

  initBoard(flagCounterEl, TimerEl, boardAreaEl ){   
    this.tiles = [];
    flagCounterEl.innerHTML = `${this.flagCount}`;
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

      if(!this.tiles[randomY][randomX].containsMine){
        this.tiles[randomY][randomX].containsMine = true;
        remainingMines--;
      }
      this.adjustAdjacentMines(randomY,randomX);
    }
  }

  adjustAdjacentMines(x, y){
    // left coloum
    if(x-1 >= 0){
      this.tiles[x-1][y].adjacentMines++;

      if(y-1 >= 0) this.tiles[x-1][y-1].adjacentMines++;
      if(y+1 < this.boardSize) this.tiles[x-1][y+1].adjacentMines++;
    }
    //right coloum
    if(x+1 < this.boardSize){
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
      const currentTile = this.getTile(tileLocation);
      this.updateTileDisplay(currentTile, tileLocation);
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

  getTile(location){
    return this.tiles[location[0]][location[1]];
  }

  updateTileDisplay(currentTile, tileLocation){
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
        tileEl.classList.add("flagged");
      }
      else {
        tileEl.classList.remove("flagged");
      }

    }
  }  
  //recursive method to clear all empty adjacent tiles
  clearEmptyTile(tileLocation){
    
  }
}