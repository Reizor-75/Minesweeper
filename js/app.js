import {Board} from "./Board.js";
import * as asset from "./assets.js";

/*-------------------------------- Constants --------------------------------*/
const easyDiff = [9, 10];
const mediumDiff = [16, 40];
const hardDiff = [24, 99];


/*---------------------------- Variables (state) ----------------------------*/
let b, currentDiff, curTheme, curAssets;

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

//default game set up
currentDiff = easyDiff;
curTheme = "Classic"
initGame();

/*-------------------------------- Functions --------------------------------*/
function initGame(){
  curAssets = asset.changeThemes(curTheme);
  b = new Board(currentDiff[0],currentDiff[1], curAssets);
  // b = new Board(5,3);
  b.initBoard(TimerEl, boardAreaEl);  
}

function resetBoard(){
  resetButtonEl.innerHTML = `<img src=${curAssets[1]} width="20" height="20">`
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
  curTheme = evt.target.id;
  resetBoard();
}

function checkForWin(tileCount){
  if(tileCount === 0){
    resetButtonEl.innerHTML = `<img src=${curAssets[3]} width="20" height="20">`
  }
}

function checkMineClicked(clicked){
  if(clicked){
    resetButtonEl.innerHTML = `<img src=${curAssets[2]} width="20" height="20">`
  }
}