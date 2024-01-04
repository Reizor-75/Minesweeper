
import {Tile} from "./Tile.js";

export class Board{

  constructor(boardSize, mineCount){
    this.mineCount = mineCount;
    this.boardSize = boardSize;
    this.tileCount =  boardSize*boardSize - mineCount;
    this.clickedMine = false;
  }

  initBoard(TimerEl, boardAreaEl){   
    this.tiles = [];    
    this.flagCount = this.mineCount;
    this.updateFlagCounter();
    TimerEl.innerHTML = `000`;

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
    this.mineLocations = [];

    while(remainingMines > 0){
      const randomX = Math.floor(Math.random() * this.boardSize);
      const randomY = Math.floor(Math.random() * this.boardSize);

      if(!this.tiles[randomX][randomY].containsMine){
        this.tiles[randomX][randomY].containsMine = true;
        this.mineLocations.push([randomX , randomY]);
        remainingMines--;
        this.adjustAdjacentMines(randomX,randomY);
      }
    }
    console.log(this.mineLocations);
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
    if(this.clickedMine) return;
    if(evt.target.className === "tile"){
      const tileId = evt.target.id;
      const tileLocation = this.getTileLocation(tileId);
      this.updateTileDisplay(tileLocation);
    }

  }

  getTileLocation(tileId){
    const location =[];    
    let row = tileId.slice(1, tileId.indexOf("Y"));
    location.push(parseInt(row));
    let col = tileId.slice(tileId.indexOf("Y")+1, tileId.length);
    location.push(parseInt(col));
  
    return location;
  }

  updateTileDisplay(tileLocation){
    const currentTile = this.tiles[tileLocation[0]][tileLocation[1]];
    const tileEl = document.getElementById(`X${tileLocation[0]}Y${tileLocation[1]}`)
    if(!currentTile.isFlagged){
      //not flagged
      if(currentTile.containsMine){
        //mine revealed
        tileEl.innerHTML = `<img src="./assets/Images/Mine.png" width="40" height="40">`;
        tileEl.classList.add("revealedMine"); 
        this.clickedMine = true;
      }
      else{
        //tile revealed
        if(currentTile.adjacentMines != 0){
          //non-empty tile
          this.updatefontColor(currentTile.adjacentMines, tileEl);
          tileEl.textContent = currentTile.adjacentMines;
        }
        else{
          //empty tile
          this.clearTiles(tileLocation);
        }
        //reveal tile 
        currentTile.revealTile();
        tileEl.classList.add("revealed");
        this.tileCount--;
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

  updateFlagCounter(){
    const flagCounterEl = document.getElementById("flag-Counter");
    flagCounterEl.innerHTML = this.flagCount > 9 ? `0${this.flagCount}`:`00${this.flagCount}`;
  }

  //place flags
  handleRightClick(evt){
    evt.preventDefault();
    if(evt.target.classList.contains("tile")){
      const tileId = evt.target.id;
      const tileEl = document.getElementById(tileId);
      const tileLocation = this.getTileLocation(tileId);
      const currentTile = this.tiles[tileLocation[0]][tileLocation[1]];

      currentTile.toggleFlag();   

      if(currentTile.isFlagged) {
        if(this.flagCount >0){
          tileEl.classList.add("flagged");
          // tileEl.innerHTML = `<img src="./assets/Images/Flag.png" width=40 height="40">`;
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

  clearTiles(tileLocation){
    this.clearTileUpperRight(tileLocation);
    this.clearTileBottomLeft(tileLocation);
    //tileArray = tileArray.concat(this.clearTileUpperRight(tileLocation));
    // tileArray = tileArray.concat(this.clearTileBottomLeft(tileLocation));
  }
  //recursive method to clear all empty adjacent tiles
  clearTileUpperRight(tileLocation){
    if(this.checkforEdge(tileLocation)) return;
    const x = tileLocation[0];
    const y = tileLocation[1];

    //does not run if current tile has been revealed
    if(this.tiles[x][y].isRevealed) return;

    //reveal current tile
    this.tiles[x][y].revealTile();
    this.updateTileDisplay([x,y]); 

    if(this.tiles[x][y].adjacentMines === 0 ){
      // check to the right then up
      //check to see if clearTileUpperRight return an populated array
      this.clearTileUpperRight([x+1,y]);
      this.clearTileUpperRight([x,y-1]);
    }
  }

  clearTileBottomLeft(tileLocation){
    if(this.checkforEdge(tileLocation)) return;
    const x = tileLocation[0];
    const y = tileLocation[1];

    //does not run if current tile has been revealed
    if(this.tiles[x][y].isRevealed) return;
    let tileArray = [[x,y]];

    if(this.tiles[x][y].adjacentMines === 0 ){
      // check to the right then up
      //check to see if clearTileUpperRight return an populated array

      if(this.clearTileBottomLeft([x-1,y])) tileArray = tileArray.concat(this.clearTileBottomLeft([x-1,y]));
      if(this.clearTileBottomLeft([x,y+1]))tileArray = tileArray.concat(this.clearTileBottomLeft([x,y+1]));
    }
    return tileArray;
  }

  checkforEdge(tileLocation){
    //check x location
    if(tileLocation[0] < 0) return true;
    if(tileLocation[0]+1 > this.boardSize) return true;
    //check y location
    if(tileLocation[1] < 0) return true;
    if(tileLocation[1]+1 > this.boardSize) return true;
    
    return false;
  }
}