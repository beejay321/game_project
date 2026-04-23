window.onload = function () {
  const startBtn = document.querySelector("#startBtn");
  const restartButton = document.querySelector("#restartBtn");
  let game = null;

  startBtn.addEventListener("click", function (e) {
    console.log("game started");
    game = new Game();
    game.start();
  });

  restartButton.addEventListener("click", (e) => {
    window.location.reload();
  });
};
