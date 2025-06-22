let nextNumber = 1;
const buttonSize = 70;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function setupGame() {
  const game = document.getElementById("game");
  game.innerHTML = "";
  const numbers = [1,2,3,4,5,6,7,8,9];
  shuffle(numbers);

  const positions = []; // 配置したボタンの位置記録用

  numbers.forEach(num => {
    const button = document.createElement("button");
    button.textContent = num;

    let randomX, randomY;
    let isOverlap;

    do {
      isOverlap = false;
      const gameWidth = game.clientWidth - buttonSize;
      const gameHeight = game.clientHeight - buttonSize;
      randomX = Math.floor(Math.random() * gameWidth);
      randomY = Math.floor(Math.random() * gameHeight);

      // 重なりチェック
      for (const pos of positions) {
        const dx = pos.x - randomX;
        const dy = pos.y - randomY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < buttonSize) {
          isOverlap = true;
          break;
        }
      }
    } while (isOverlap);

    positions.push({ x: randomX, y: randomY });

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
