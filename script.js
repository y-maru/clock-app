document.addEventListener("DOMContentLoaded", () => {
  const clockImage = document.getElementById("clock-image");
  const choicesContainer = document.getElementById("choices");
  const resultMessage = document.getElementById("result");

  // 画像の番号リスト
  const clockNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

  // 初期化処理
  function initializeGame() {
    const randomClockNumber = getRandomNumber(1, 12);
    clockImage.src = `clock-images/${randomClockNumber}.png`;
    clockImage.dataset.correctAnswer = randomClockNumber;

    generateChoices(randomClockNumber);
    resultMessage.textContent = "";
  }

  function generateChoices(correctNumber) {
    const randomChoices = new Set([correctNumber]);
    while (randomChoices.size < 4) {
      randomChoices.add(getRandomNumber(1, 12));
    }
    const shuffledChoices = Array.from(randomChoices).sort(() => Math.random() - 0.5);

    choicesContainer.innerHTML = "";
    shuffledChoices.forEach(choice => {
      const button = document.createElement("button");
      button.classList.add("choice-button");
      button.textContent = `${choice}じ`;
      button.dataset.choiceNumber = choice;

      addChoiceButtonEventListener(button);
      choicesContainer.appendChild(button);
    });
  }

  function addChoiceButtonEventListener(button) {
    button.addEventListener("click", handleChoiceClick);
    button.addEventListener("touchstart", handleChoiceClick);
  }

  function handleChoiceClick(event) {
    event.preventDefault();

    const selectedNumber = parseInt(event.target.dataset.choiceNumber, 10);
    const correctAnswer = parseInt(clockImage.dataset.correctAnswer, 10);

    if (selectedNumber === correctAnswer) {
      resultMessage.textContent = "⭕️せいかい！";
      resultMessage.style.color = "green";
      launchConfetti(); // 紙吹雪を発動
    } else {
      resultMessage.textContent = "❌️ざんねん！もういちどためしてみて。";
      resultMessage.style.color = "red";
    }
  }

  function launchConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDelay = Math.random() * 2 + "s";
      confetti.style.backgroundColor = getRandomColor();
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      confettiContainer.remove(); // 紙吹雪を5秒後に消去
    }, 3000);
  }

  function getRandomColor() {
    const colors = ["#ff0", "#f0f", "#0ff", "#ff5722", "#4caf50", "#2196f3"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  initializeGame();
});