let mineImage;
let smileyImage;
let looseImage;
let winImage;
let flagImage;
let clearImage;

function changeThemes(theme){
  const asset = [];

  if(theme === "space-invaders"){

  }
  else if(theme === "Zelda"){
    mineImage = "./assets/Images/bomb.png";
    smileyImage = "./assets/Images/Half-Heart.png";
    looseImage = "./assets/Images/Empty-Heart.png";
    winImage = "./assets/Images/Full-Heart.png";
    flagImage = "./assets/Images/stone.png";
    clearImage = "./assets/Images/hole.png";
  }
  else{
    //clasic minesweeper
    mineImage = "./assets/Images/Mine.png";
    smileyImage = "./assets/Images/Smiley.png";
    looseImage = "./assets/Images/Frowny.png";
    winImage = "./assets/Images/Smiley-sunglasses.png";
    flagImage = "./assets/Images/Flag.png";
    clearImage = "";

  }

    asset.push(mineImage);
    asset.push(smileyImage);
    asset.push(looseImage);
    asset.push(winImage);
    asset.push(flagImage);
    asset.push(clearImage);
  return asset;
}

export {
  changeThemes
}