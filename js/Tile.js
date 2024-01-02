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
      if(this.isFlagged) this.isFlagged = false;
      else this.isFlagged = true;
    }
  }

  revealTile(){    
    if(!this.isRevealed && !this.isFlagged){
      this.isRevealed = true;
    }
  }

  // might move outside of class
  // updateImage(){        
  //   if(this.isRevealed){
  //     if(!this.containsMine){
  //       //display adjacent mine number
  //     }
  //     else{
  //       //display mine
  //     }
  //   }
  //   else{
  //     if(this.isFlagged){
  //       //display flag
  //     }
  //   }
  // }
}