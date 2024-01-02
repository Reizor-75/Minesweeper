import {Board} from "./Board.js";


/*---- Cached Element References ----*/
const boardAreaEl = document.querySelector(".board-Area");
const flagCounterEl = document.querySelector("#flag-Counter");
const resetButtonEl = document.querySelector("#reset-Button");
const TimerEl = document.querySelector("#timer");
const diffEl = document.querySelector("#difficulty-menu");

/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let b = new Board(9, 10);

/*----------------------------- Event Listeners -----------------------------*/
resetButtonEl.addEventListener("click", resetBoard);
boardAreaEl.addEventListener("click", leftClick);
boardAreaEl.addEventListener("contextmenu", rightClick);
diffEl.addEventListener ("change",changeDifficulty);

b.initBoard(flagCounterEl, TimerEl, boardAreaEl);

function resetBoard(){    
  boardAreaEl.innerHTML = ""
  b.initBoard(flagCounterEl, TimerEl, boardAreaEl);
  // console.log(b);
}

function leftClick(evt){
  b.handleLeftClick(evt);
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