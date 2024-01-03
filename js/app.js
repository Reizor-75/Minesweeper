import {Board} from "./Board.js";

/*-------------------------------- Constants --------------------------------*/
const easyDiff = [9, 10];
const mediumDiff = [16, 40];
const hardDiff = [24, 99];


/*---------------------------- Variables (state) ----------------------------*/
let b, currentDiff, mineClicked, tileCount; 

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
  tileCount = currentDiff[0]*currentDiff[0] - currentDiff[1];
  mineClicked = false;
  // b = new Board(currentDiff[0],currentDiff[1]);
  b = new Board(5,3);
  b.initBoard(TimerEl, boardAreaEl);  
}

function resetBoard(){    
  boardAreaEl.innerHTML = ""
  initGame();
}

function leftClick(evt){
  b.handleLeftClick(evt);
  checkForWin();
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
  console.log(evt.target.id);
}

function checkForWin(){
  if(tileCount === 0){
    console.log("winner");
  }
}