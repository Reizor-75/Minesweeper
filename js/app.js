import {Board} from "./Board.js";
import * as asset from "./assets.js";

/*-------------------------------- Constants --------------------------------*/
const easyDiff = [9, 10];
const mediumDiff = [16, 40];
const hardDiff = [24, 99];


/*---------------------------- Variables (state) ----------------------------*/
let b, currentDiff;

/*------------------------ Cached Element References ------------------------*/
const boardAreaEl = document.querySelector(".board-Area");
const resetButtonEl = document.querySelector("#reset-Button");
const TimerEl = document.querySelector("#timer");
const diffEl = document.querySelector("#difficulty-menu");
const themesEl = document.querySelector(".themesSection");

/*----------------------------- Event Listeners -----------------------------*/
resetButtonEl.addEventListener("click", resetBoard);
boardAreaEl.addEventListener("click", leftClick);
boardAreaEl.addEventListener("contextmenu", rightClick);
diffEl.addEventListener ("change",changeDifficulty);
themesEl.addEventListener ("click", changeTheme)

//default difficulty
currentDiff = easyDiff;
initGame();
/*-------------------------------- Functions --------------------------------*/
function initGame(){
  b = new Board(currentDiff[0],currentDiff[1]);
  // b = new Board(5,3);
  b.initBoard(TimerEl, boardAreaEl);  
}

function resetBoard(){      
  resetButtonEl.innerHTML = `<img src="./assets/Images/Smiley.png" width="20" height="20">`
  boardAreaEl.innerHTML = ""
  initGame();
}

function leftClick(evt){
  b.handleLeftClick(evt);
  checkMineClicked(b.clickedMine);
  checkForWin(b.tileCount);
}

function rightClick(evt){
  b.handleRightClick(evt);
}

function changeDifficulty(evt){
  if(evt.target.value === "Easy") currentDiff = easyDiff;
  else if(evt.target.value === "Medium") currentDiff = mediumDiff;
  else currentDiff = hardDiff;

  resetBoard();
}

function changeTheme(evt){
  const newTheme = evt.target.id;
}

function checkForWin(tileCount){
  if(tileCount === 0){
    resetButtonEl.innerHTML = `<img src="./assets/Images/Smiley-sunglasses.png" width="20" height="20">`
    console.log("winner");
  }
}

function checkMineClicked(clicked){
  if(clicked){
    resetButtonEl.innerHTML = `<img src="./assets/Images/frowny.png" width="20" height="20">`
    console.log("looser");
  }
}