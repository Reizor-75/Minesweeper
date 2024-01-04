# RetroSweeper
Unit 1 Project: Web based Minesweeper Game


This is a recreation of the classic Windows 98 version of MineSweeper with an additional
retro theme: A link to the Past.


## Game Play
- The goal of the game is to clear all the tiles on the board that do not contain a mine.
- When a tile is left clicked, it will reveal the space below. The space below can contain a mine, a number, or nothing.
  - If a mine is revealed, the player loses.
  - If a number is revealed, that number symbolizes how many adjacent tiles contains a mine (numbers range from 1-8).
  - If nothing is revealed, this tile is empty and is not adjacent to any mines. When a tile is empty, it will clear all adjacent tiles until the tiles show a number.
- When tiles are right clicked, a flag is placed and the tile cannot be revealed. When right clicked again, the flag is removed and the tile can be revealed.
- Players can toggle the difficulty through the drop down menu on the left
- Players can toggle the theme by clicking on one of the theme icons

## [Play RetroSweeper Here](https://michellelinares-minesweeper.netlify.app/) 🎮

## Technologies used 🖥
- CSS
- JavaScript
- HTML
- Git
## Credit
  Image assets were drawn by me. However Legend of Zelda A Link to the Past is a property of Nintendo.


## Ice Box 🧊
- [x] Fix Flag Display
- [x] Add revealed tile Image
- [x] Add Confetti
- [x] Switch difficulties (Easy, Medium, Hard)
- [x] Switch Themes (Retro MineSweeper, A Link to the past)
- [ ] Add a Space Invaders Theme
- [ ] Add Best Time Tracker
- [ ] Add Leader Board