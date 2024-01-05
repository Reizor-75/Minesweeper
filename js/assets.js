let win = new Audio('../assets/Sounds/Win.wav');
let loose = new Audio('../assets/Sounds/Loose.wav');
let click = new Audio('../assets/Sounds/Click.wav');
let flag = new Audio('../assets/Sounds/Flag.wav');
let undo = new Audio('../assets/Sounds/Undo.wav');

let theme = "";
function setTheme(newTheme){
  theme = newTheme;
}

function getAssets(){
  const asset = [];
  let mineImage;
  let smileyImage;
  let looseImage;
  let winImage;
  let flagImage;
  let clearImage;

  if(theme === "space-invaders"){

  }
  else if(theme === "Zelda"){
    mineImage = "../assets/Images/bomb.png";
    smileyImage = "../assets/Images/Half-Heart.png";
    looseImage = "../assets/Images/Empty-Heart.png";
    winImage = "../assets/Images/Full-Heart.png";
    flagImage = "../assets/Images/stone.png";
    clearImage = "../assets/Images/hole.png";
  }
  else{
    //clasic minesweeper
    mineImage = "../assets/Images/Mine.png";
    smileyImage = "../assets/Images/Smiley.png";
    looseImage = "./assets/Images/Frowny.png";
    winImage = "../assets/Images/Smiley-sunglasses.png";
    flagImage = "../assets/Images/Flag.png";
    clearImage = "../assets/Images/Blank.png";

  }

    asset.push(mineImage);
    asset.push(smileyImage);
    asset.push(looseImage);
    asset.push(winImage);
    asset.push(flagImage);
    asset.push(clearImage);
    asset.push(theme);
  return asset;
}

function playWin(){
  win.volume = .251;
  win.play();
}

function playLoose(){
  loose.volume = .20;
  loose.play();
}

function playClick(){
  click.volume = .25;
  click.play();
}

function playFlag(){
  flag.volume = .15;
  flag.play();
}

function playUndo(){
  undo.volume = .5;
  undo.play();
}

export {
  setTheme,
  getAssets,
  playWin,
  playLoose,
  playClick,
  playFlag,
  playUndo,
}