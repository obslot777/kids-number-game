let nextNumber;
const buttonSize = 80;
let hintTimer = null;
let allCorrectTimer = null;
let restartTimer = null;

const allCorrectSound = new Audio("sound/allcorrect.mp3");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function setupGame() {
  nextNumber = 1;
  clearTimers();

  const game = document.getElementById("game");
  game.innerHTML = "";
  const numbers = [1,2,3,4,5,6,7,8,9];
  shuffle(numbers);

  const gameWidth = game.clientWidth;
  const gameHeight = game.clientHeight;
  const positions = [];

  const msg = document.getElementById("message");
  msg.textContent = "";
  msg.classList.remove("show");

  numbers.forEach(num => {
    const button = document.createElement("button");
    button.id = `btn${num}`;
    button.style.backgroundImage = `url('images/num${num}.png')`;

    let randomX, randomY, isOverlap;
    do {
      isOverlap = false;
      randomX = Math.floor(Math.random() * (gameWidth - buttonSize));
      randomY = Math.floor(Math.random() * (gameHeight - buttonSize));

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
    button.addEventListener("touchstart", (e) => {
      e.preventDefault();
      checkNumber(button, num);
    });

    game.appendChild(button);
  });

  startHintTimer();
}

function clearTimers() {
  if (hintTimer) clearTimeout(hintTimer);
  if (allCorrectTimer) clearTimeout(allCorrectTimer);
  if (restartTimer) clearTimeout(restartTimer);
}

function checkNumber(button, num) {
  if (num === nextNumber) {
    const numSound = new Audio(`sound/num${num}.mp3`);
    numSound.currentTime = 0;
    numSound.play();

    button.classList.add("correct");
    button.disabled = true;
    stopHint();

    if (nextNumber === 9) {
      const msg = document.getElementById("message");
      msg.textContent = "クリア！おめでとう！";
      msg.classList.add("show");

      allCorrectTimer = setTimeout(() => {
        allCorrectSound.currentTime = 0;
        allCorrectSound.play();
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4db6ac', '#81d4fa', '#a5d6a7', '#4fc3f7', '#00acc1']
        });
      }, 2000);

      restartTimer = setTimeout(() => {
        setupGame();
      }, 7000);

    } else {
      nextNumber++;
      startHintTimer();
    }
  }
}

function startHintTimer() {
  if (hintTimer) clearTimeout(hintTimer);
  hintTimer = setTimeout(() => {
    const hintButton = document.getElementById(`btn${nextNumber}`);
    if (hintButton && !hintButton.disabled) {
      hintButton.classList.add("hint");
    }
  }, 5000);
}

function stopHint() {
  if (hintTimer) clearTimeout(hintTimer);
  const hintButton = document.querySelector(".hint");
  if (hintButton) {
    hintButton.classList.remove("hint");
  }
}

setupGame();
