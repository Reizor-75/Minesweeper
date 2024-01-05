
import {Tile} from "./Tile.js";
import * as asset from "./assets.js";

export class Board{

  constructor(boardSize, mineCount, currentAssets){
    this.mineCount = mineCount;
    this.boardSize = boardSize;
    this.tileCount =  boardSize*boardSize - mineCount;
    this.clickedMine = false;
    this.firstClick = true;
    this.curAssets = asset.getAssets();;
    this.tiles = [];    
    this.flagCount = this.mineCount;
  }

  initBoard(boardAreaEl, difficulty){   
    this.updateFlagCounter();

    for(let i = 0; i < this.boardSize; i++){
      let row = [];
      const rowEl = document.createElement("div");
      rowEl.className = `row ${i}`;
      
      for(let j = 0; j < this.boardSize; j++){
        const tileEl = document.createElement("div");
        tileEl.className = `tile`;
        tileEl.classList.add(difficulty);
        tileEl.id = `X${i}Y${j}`
        tileEl.innerHTML = ` `;
        rowEl.appendChild(tileEl);

        row.push(new Tile());        
      }
      boardAreaEl.appendChild(rowEl);
      this.tiles.push(row);
    }
  }

  placeMines(x,y){
    let remainingMines = this.mineCount;
    this.mineLocations = [];

    while(remainingMines > 0){
      const randomX = Math.floor(Math.random() * this.boardSize);
      const randomY = Math.floor(Math.random() * this.boardSize);

      if(x === randomX && y === randomY) continue;
      let isAdjacent = false;
      const adjacentLocales = this.getAdjacentLocations([x,y]);
      
      for(let i = 0; i <adjacentLocales.length; i++ ){
        if(adjacentLocales[i][0] === randomX && adjacentLocales[i][1] === randomY){
          isAdjacent = true;
          break;
        }
      }
      if(isAdjacent){
        continue;
      }

      if(!this.tiles[randomX][randomY].containsMine){
        this.tiles[randomX][randomY].containsMine = true;
        this.mineLocations.push([randomX , randomY]);
        remainingMines--;
        this.adjustAdjacentMines(randomX,randomY);
      }
    }
  }

  adjustAdjacentMines(x, y){
    const adjacentLocales = this.getAdjacentLocations([x,y]);

    adjacentLocales.forEach((locale) => {
      this.tiles[locale[0]][locale[1]].adjacentMines++
    });
  }

  //reveals tiles
  handleLeftClick(evt){
    asset.playClick();
    if(this.clickedMine) return;
    if(evt.target.classList.contains("tile")){      
      const tileId = evt.target.id;
      const tileLocation = this.getTileLocation(tileId);
      
      //check for first click
      //place mines avoid current location
      if(this.firstClick) {
        this.placeMines(tileLocation[0],tileLocation[1]);
        this.firstClick = false;
      }

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
    const x = tileLocation[0];
    const y = tileLocation[1];
    const currentTile = this.tiles[x][y];
    const tileEl = document.getElementById(`X${x}Y${y}`)

    if(currentTile.isFlagged)return;

    //not flagged
    if(currentTile.containsMine){
      //mine revealed
      tileEl.classList.add("revealedMine");  
      this.updateTileImage(tileEl, this.curAssets[0]);
      let activeWinEl = document.querySelector(".active-Window");
      activeWinEl.style.backgroundColor = "darkred";
      this.clickedMine = true;
    }
    else{
      //tile revealed      
      this.updateTileImage(tileEl, this.curAssets[5]);
      if(currentTile.adjacentMines != 0){
        //non-empty tile            
        this.updatefontColor(currentTile.adjacentMines, tileEl);
        tileEl.textContent = currentTile.adjacentMines;
        this.revealTile(tileLocation);
      }
      else this.clearTiles(tileLocation);

      //reveal tile       
      tileEl.classList.add("revealed");
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

  revealTile(tileLocation){    
    if(this.tiles[tileLocation[0]][tileLocation[1]].isRevealed)return;
    this.tiles[tileLocation[0]][tileLocation[1]].revealTile();
    this.tileCount--;
  }

  updateTileImage(tileEl, curAsset){
    if(curAsset) tileEl.style.backgroundImage = `url("${curAsset}")`;
    else tileEl.style.backgroundImage = ``;
    tileEl.style.backgroundSize = `100%`;
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

      if(currentTile.isRevealed) return;

      currentTile.toggleFlag();   
      if(currentTile.isFlagged) {
        if(this.flagCount > 0){  
          asset.playFlag();
          this.updateTileImage(tileEl, this.curAssets[4]);
          this.flagCount--;
        }
      }
      else {     
        asset.playUndo();   
        this.updateTileImage(tileEl);
        this.flagCount++;
      }
      this.updateFlagCounter();
    }
  }  

  //recursive method to clear all empty adjacent tiles
  clearTiles(tileLocation){
    const adjacentLocales = this.getAdjacentLocations(tileLocation);
    if(adjacentLocales.length === 0) return;

    const x = tileLocation[0];
    const y = tileLocation[1];

    //does not run if current tile has been revealed
    if(this.tiles[x][y].isRevealed) return;

    //reveal current tile
    this.revealTile(tileLocation);
    this.updateTileDisplay([x,y]); 

    adjacentLocales.forEach((locale)=>{
      if(this.tiles[x][y].adjacentMines === 0 )this.clearTiles(locale);
    });
  }

  getAdjacentLocations(tileLocation){
    const x = tileLocation[0];
    const y = tileLocation[1];
    const adjacentLocations = [];

    //locations not on the edge
    if(x-1 >= 0){
      adjacentLocations.push([x-1, y]);
      if(y-1 >= 0) adjacentLocations.push([x-1, y-1]);
      if(y+1 < this.boardSize) adjacentLocations.push([x-1, y+1]);
    }
    //right coloum
    if(x+1 < this.boardSize){      
      adjacentLocations.push([x+1, y]);
      if(y-1 >= 0) adjacentLocations.push([x+1, y-1]);
      if(y+1 < this.boardSize) adjacentLocations.push([x+1, y+1]);
    }
    //center coloum
    if(y-1 >= 0) adjacentLocations.push([x, y-1]);
    if(y+1 < this.boardSize) adjacentLocations.push([x, y+1]);

    return adjacentLocations;
  }
}