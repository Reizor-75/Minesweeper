import {Board} from "./Board.js";

/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let b = new Board(5, 3);
let mineClicked, tileCount; 

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

b.initBoard(TimerEl, boardAreaEl);

/*-------------------------------- Functions --------------------------------*/
function resetBoard(){    
  boardAreaEl.innerHTML = ""
  b.initBoard(TimerEl, boardAreaEl);
  // console.log(b);
}

function leftClick(evt){
  b.handleLeftClick(evt);
  checkForWin();
}

function rightClick(evt){
  b.handleRightClick(evt);
}

function changeDifficulty(evt){
  if(evt.target.value === "Easy") b = new Board(9, 10);
  else if(evt.target.value === "Medium") b = new Board(16, 40);
  else b = new Board(24, 99);

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