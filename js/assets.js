let theme;
let mineImage;
let smileyImage;
let looseImage;
let winImage;
let flagImage;

function setTheme(curTheme){
  this.theme = curTheme;
}

function changeThemes(){
  if(theme === "space-invaders"){

  }
  else if(theme === "Zelda"){

  }
  else{
    //clasic minesweeper
    mineImage = "./assets/Images/Mine.png";
    smileyImage = "./assets/Images/Smiley.png";
    looseImage = "./assets/Images/Frowny.png";
    winImage = "./assets/Images/Smiley-sunglasses.png";
    flagImage = "./assets/Images/Flag.png";
  }
}

export {
  setTheme,
  changeThemes
}