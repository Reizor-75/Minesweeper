import {Board} from "./Board.js";

/*-------------------------------- Constants --------------------------------*/
const b = new Board(3, 3, 3);

/*---------------------------- Variables (state) ----------------------------*/


/*---- Cached Element References ----*/
const boardAreaEl = document.querySelector(".boardArea");
const flagCounterEl = document.querySelector("#flagCounter");
const resetButtonEl = document.querySelector("#resetButton");
const TimerEl = document.querySelector("#timer");
const boardEl = document.createElement("div");

/*----------------------------- Event Listeners -----------------------------*/
resetButtonEl.addEventListener("click", b.reset);
boardEl.addEventListener("click", b.handleLeftClick)



b.initBoard(flagCounterEl, TimerEl, boardEl, boardAreaEl);

console.log(b);