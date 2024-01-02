import {Board} from "./Board.js";

/*-------------------------------- Constants --------------------------------*/
const b = new Board(6, 8, 8);

/*---------------------------- Variables (state) ----------------------------*/


/*---- Cached Element References ----*/
const boardAreaEl = document.querySelector(".board-Area");
const flagCounterEl = document.querySelector("#flag-Counter");
const resetButtonEl = document.querySelector("#reset-Button");
const TimerEl = document.querySelector("#timer");

/*----------------------------- Event Listeners -----------------------------*/
resetButtonEl.addEventListener("click", resetBoard);
boardAreaEl.addEventListener("click", leftClick);
boardAreaEl.addEventListener("contextmenu", rightClick);


b.initBoard(flagCounterEl, TimerEl, boardAreaEl);

function resetBoard(){    
  boardAreaEl.innerHTML = ""
  b.initBoard(flagCounterEl, TimerEl, boardAreaEl);
  console.log(b);
}

function leftClick(evt){
  b.handleLeftClick(evt);
}

function rightClick(evt){
  b.handleRightClick(evt);
}