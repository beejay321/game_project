class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");
    this.gameContainer = document.querySelector("#game-container");
    this.scoreboard = document.querySelector(".score");
    this.livesContainer = document.querySelector("#lives");
    this.timerEl = document.querySelector("#timer");
    this.height = 350;
    this.width = 500;
  }
  start() {
    console.log("game screen showed");
  }
}
