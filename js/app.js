import {Board} from "./Board.js";

/*-------------------------------- Constants --------------------------------*/
const b = new Board(3, 3, 3);

/*---------------------------- Variables (state) ----------------------------*/


/*---- Cached Element References ----*/
const boardAreaEl = document.querySelector(".board-Area");
const flagCounterEl = document.querySelector("#flag-Counter");
const resetButtonEl = document.querySelector("#reset-Button");
const TimerEl = document.querySelector("#timer");
const boardEl = document.createElement("div");

/*----------------------------- Event Listeners -----------------------------*/
resetButtonEl.addEventListener("click", resetBoard);
boardEl.addEventListener("click", b.handleLeftClick);
boardEl.addEventListener("contextmenu", b.handleRightClick);


b.initBoard(flagCounterEl, TimerEl, boardEl, boardAreaEl);

function resetBoard(){    
  boardEl.innerHTML = ""
  b.initBoard(flagCounterEl, TimerEl, boardEl, boardAreaEl);
  console.log(b);
}