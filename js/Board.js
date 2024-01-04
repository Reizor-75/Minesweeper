
import {Tile} from "./Tile.js";

export class Board{

  constructor(boardSize, mineCount, currentAssets){
    this.mineCount = mineCount;
    this.boardSize = boardSize;
    this.tileCount =  boardSize*boardSize - mineCount;
    this.clickedMine = false;
    this.firstClick = true;
    this.curAssets = currentAssets;
    this.tiles = [];    
    this.flagCount = this.mineCount;
    this.timerIntervalID;
  }

  initBoard(TimerEl, boardAreaEl, difficulty){   
    this.updateFlagCounter();
    TimerEl.innerHTML = `000`;

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
    const currentTile = this.tiles[tileLocation[0]][tileLocation[1]];
    const tileEl = document.getElementById(`X${tileLocation[0]}Y${tileLocation[1]}`)

    if(!currentTile.isFlagged){
      //not flagged
      if(currentTile.containsMine){
        //mine revealed
        tileEl.classList.add("revealedMine"); 
        tileEl.style.backgroundImage = `url("${this.curAssets[0]}")`;
        tileEl.style.backgroundSize = `100%`;
        let activeWinEl = document.querySelector(".active-Window");
        activeWinEl.style.backgroundColor = "darkred";
        this.clickedMine = true;
      }
      else{
        //tile revealed
        tileEl.style.backgroundImage = `url("${this.curAssets[5]}")`;
        tileEl.style.backgroundSize = `100%`;
        if(currentTile.adjacentMines != 0){
          //non-empty tile            
          this.updatefontColor(currentTile.adjacentMines, tileEl);
          tileEl.textContent = currentTile.adjacentMines;
        }
        else this.clearTiles(tileLocation);

        //reveal tile 
        currentTile.revealTile();
        tileEl.classList.add("revealed");
        //
        this.tileCount--;
        //add cleared image if there is a clear image
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

      if(currentTile.isRevealed) return;

      currentTile.toggleFlag();   

      if(currentTile.isFlagged) {
        if(this.flagCount > 0){  
          tileEl.style.backgroundImage = `url("${this.curAssets[4]}")`;
          tileEl.style.backgroundSize = `100%`;
          this.flagCount--;
          }
      }
      else {
        tileEl.style.backgroundImage = ``;
        this.flagCount++;
      }
      this.updateFlagCounter();
    }
  }  

  //recursive method to clear all empty adjacent tiles
  clearTiles(tileLocation){
    if(this.checkforEdge(tileLocation)) return;
    const x = tileLocation[0];
    const y = tileLocation[1];

    //does not run if current tile has been revealed
    if(this.tiles[x][y].isRevealed) return;

    //reveal current tile
    this.tiles[x][y].revealTile();
    this.updateTileDisplay([x,y]); 

    if(this.tiles[x][y].adjacentMines === 0 ){
      // check all four cardinal directions
      this.clearTiles([x+1,y]);
      this.clearTiles([x,y-1]);
      this.clearTiles([x-1,y]);
      this.clearTiles([x,y+1]);
      
      //checks corners
      this.clearTiles([x+1,y-1]);
      this.clearTiles([x+1,y+1]);
      this.clearTiles([x-1,y-1]);
      this.clearTiles([x-1,y+1]);
    }
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

  getAdjacentLocations(tileLocation){
    const x = tileLocation[0];
    const y = tileLocation[1];
    const adjacentLocations = [];

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

  checkRemainngTiles(){
    let unrevealedTilesCount = 0;

    return
  }
}