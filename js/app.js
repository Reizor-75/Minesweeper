import {Board} from "./Board.js";
import * as asset from "./assets.js";

/*-------------------------------- Constants --------------------------------*/
const easyDiff = [9, 10, "easy"];
const mediumDiff = [16, 40, "medium"];
const hardDiff = [24, 99, "hard"];


/*---------------------------- Variables (state) ----------------------------*/
let board, currentDiff, curTheme, curAssets, seconds = 0, timerIntervalID;

/*------------------------ Cached Element References ------------------------*/
const activeWinEl = document.querySelector(".active-Window");
const boardAreaEl = document.querySelector(".board-Area");
const resetButtonEl = document.querySelector("#reset-Button");
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
  asset.setTheme(curTheme);
  curAssets = asset.getAssets();

  if(curTheme === "Zelda") activeWinEl.classList.add("zelda");
  else activeWinEl.classList.remove("zelda");

  board= new Board(currentDiff[0], currentDiff[1]);
  board.initBoard(boardAreaEl, currentDiff[2]);
  updateResetButton(curAssets[1]);
  startTimer();
}

function resetBoard(){  
  seconds = 0;
  boardAreaEl.innerHTML = ""  
  activeWinEl.style.backgroundColor = "";
  initGame();
}

function leftClick(evt){
  board.handleLeftClick(evt);  
  checkMineClicked(board.clickedMine);
  checkForWin(board.tileCount);
}

function rightClick(evt){
  board.handleRightClick(evt);
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
    updateResetButton(curAssets[3]);
    asset.playWin();
    clearInterval(timerIntervalID);
  }
}

function checkMineClicked(clicked){
  if(clicked){
    updateResetButton(curAssets[2]); 
    asset.playLoose();   
    clearInterval(timerIntervalID);
  }
}

function updateResetButton(curAsset){  
  resetButtonEl.style.backgroundImage = `url("${curAsset}")`;
  resetButtonEl.style.backgroundSize = `100%`;
}

function startTimer(){
  if(timerIntervalID){
    clearInterval(timerIntervalID);
  } 
  updateTimerDisplay();
  timerIntervalID = setInterval(tick, 1000);
}

function tick(){
  seconds++;    
  updateTimerDisplay();
}

function updateTimerDisplay(){	
  const timerEl = document.querySelector("#timer");
  if(seconds > 999) timerEl.textContent = `ERR`;
  else if(seconds > 99) timerEl.textContent = `${seconds}`;
  else if(seconds > 9) timerEl.textContent = `0${seconds}`;
  else timerEl.textContent = `00${seconds}`;
}