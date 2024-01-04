import {Board} from "./Board.js";
import * as asset from "./assets.js";

/*-------------------------------- Constants --------------------------------*/
const easyDiff = [9, 10, "easy"];
const mediumDiff = [16, 40, "medium"];
const hardDiff = [24, 99, "hard"];


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
  if(curTheme === "Zelda") boardAreaEl.classList.add("zelda");
  else  boardAreaEl.classList.remove("zelda");

  b = new Board(currentDiff[0], currentDiff[1], curAssets);
  b.initBoard(TimerEl, boardAreaEl, currentDiff[2]);
  resetButtonDisplay();  
}

function resetBoard(){  
  boardAreaEl.innerHTML = ""  
  boardAreaEl.style.backgroundColor = "";
  initGame();
}
function resetButtonDisplay(){  
  resetButtonEl.style.backgroundImage = `url("${curAssets[1]}")`;
  resetButtonEl.style.backgroundSize = `100%`;
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
    confetti.start(2000);
    resetButtonEl.style.backgroundImage = `url("${curAssets[3]}")`;
    resetButtonEl.style.backgroundSize = `100%`;
  }
}

function checkMineClicked(clicked){
  if(clicked){
    resetButtonEl.style.backgroundImage = `url("${curAssets[2]}")`;
    resetButtonEl.style.backgroundSize = `100%`;
  }
}