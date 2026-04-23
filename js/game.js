class Game {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.time = 30;
    this.speed = 2;
    this.gameRunning = false;
    this.gameIsOver = false;
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-over");
    this.restartButton = document.getElementById("game-restart");
    this.gameContainer = document.querySelector("#game-container");
    this.scoreboard = document.querySelector("#score");
    this.livesContainer = document.querySelector("#lives");
    this.timerEl = document.querySelector("#timer");
    this.height = 450;
    this.width = 600;
  }
  start() {
    console.log("game screen showed");
    //hides the start screen and reveals the game screen
    this.gameScreen.style.height = this.height + "px";
    this.gameScreen.style.width = this.width + "px";
    this.gameScreen.style.margin = "auto";
    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "block";

    // this updates the timer, scoreboard and lives as shown
    this.updateUI();

    // makes the balls start falling
    this.gameInterval = setInterval(() => {
      this.createBall();
    }, 1000);

    //timer starts to countdown
    this.timerInterval = setInterval(() => {
      this.time--;
      this.timerEl.textContent = this.time;

      if (this.time <= 0) {
        this.end();
      }
    }, 1000);
  }
  createBall() {
    const ball = new Ball(this);
    ball.generate();
  }
  updateUI() {
    this.scoreboard.textContent = this.score;
    this.livesContainer.textContent = this.lives;
    this.timerEl.textContent = this.time;
  }
  addScore(points) {
    this.score += points;
    this.updateUI();
  }
  loseLife() {
    this.lives--;
    this.updateUI();
  }
  end() {
    clearInterval(this.gameInterval);
    clearInterval(this.timerInterval);
    this.gameRunning = false;
    // alert("Game Over! Score: " + this.score);
    // this.saveHighScore();
    this.gameContainer.style.display = "none";
    this.endScreen.style.display = "block";
    this.restartButton.style.display = "block";
    this.scoreboard.textContent = this.score;
  }
}
class Ball {
  constructor(game) {
    this.game = game;
    this.ball = document.createElement("div");
    this.ball.classList.add("ball");

    this.type = this.getRandomType();
    this.ball.classList.add(this.type);

    this.left = Math.random() * 360;
    this.top = 0;
    this.speed = this.game.speed;
  }
  getRandomType() {
    const random = Math.random();
    if (random < 0.7) return "good";
    if (random < 0.9) return "bad";
    return "star";
  }
  generate() {
    this.ball.style.left = this.left + "px";
    this.ball.style.top = this.top + "px";

    this.game.gameScreen.appendChild(this.ball);
    this.ball.addEventListener("click", () => this.handleClick());

    this.fall();
  }

  fall() {
    this.interval = setInterval(() => {
      this.top += this.speed;
      this.ball.style.top = this.top + "px";

      if (this.top > 460) {
        clearInterval(this.interval);
        this.ball.remove();

        if (this.type === "good") {
          console.log("score added");
        }
      }
    }, 20);
  }
  handleClick() {
    clearInterval(this.interval);

    if (this.type === "good") {
      this.game.addScore(1);
    }

    if (this.type === "bad") {
      this.game.loseLife();
    }
    if (this.type === "bad" && this.game.lives === 0) {
      const explosion = document.createElement("img");
      explosion.src = "https://media.tenor.com/2FL76f6q7u8AAAAj/explosion.gif";
      explosion.style.width = "450px";
      explosion.style.height = "450px";
      explosion.style.top = this.ball.top / 2 + "px";
      explosion.style.left = this.ball.top / 2 + "px";
      this.game.gameScreen.appendChild(explosion);
      this.game.gameIsOver = true;
      setTimeout(() => {
        this.game.end();
      }, 1000);
    }

    if (this.type === "star") {
      this.game.addScore(5);
    }

    this.ball.remove();
  }
}
