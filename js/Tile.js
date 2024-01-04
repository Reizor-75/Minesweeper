export class Tile{
  constructor(){
    this.containsMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.adjacentMines = 0;
  }

  toggleFlag(){
    if(!this.isRevealed){
      if(this.isFlagged) this.isFlagged = false;
      else this.isFlagged = true;
    }
  }

  revealTile(){    
    if(!this.isRevealed && !this.isFlagged){
      this.isRevealed = true;
    }
  }
}