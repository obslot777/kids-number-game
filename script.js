let nextNumber = 1;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function setupGame() {
  const game = document.getElementById("game");
  game.innerHTML = "";
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffle(numbers);

  numbers.forEach(num => {
    const button = document.createElement("button");
    button.textContent = num;

    // ランダム座標を設定
    const gameWidth = game.clientWidth - 70;  // ボタンサイズ考慮
    const gameHeight = game.clientHeight - 70;

    const randomX = Math.floor(Math.random() * gameWidth);
    const randomY = Math.floor(Math.random() * gameHeight);

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;

    button.addEventListener("click", () => checkNumber(button, num));
    game.appendChild(button);
  });
}

function checkNumber(button, num) {
  if (num === nextNumber) {
    button.classList.add("correct");
    button.disabled = true;
    if (nextNumber === 9) {
      document.getElementById("message").textContent = "クリア！おめでとう！";
    }
    nextNumber++;
  }
}

setupGame();
