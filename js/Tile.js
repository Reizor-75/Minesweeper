export class Tile{
  constructor(){
    this.containsMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.adjacentMines = 0;
  }

  addMine(){
    if(!this.containsMine) this.containsMine = true;
  }

  addFlag(){
    if(!this.isRevealed){
      this.isFlagged = this.isFlagged ? false : true;
      this.updateImage();
    }
  }

  revealTile(){    
    if(!this.isRevealed){
      this.isRevealed = true;
      this.updateImage();
    }
  }

  updateImage(){        

  }
}

