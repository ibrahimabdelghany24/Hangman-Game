const letters = "abcdefghijklmnopqrstuvwxyz";

const words = {
  programming: ["java", "python", "javascript", "pascal", ],
  countries: ["egypt", "jordan", "syria", "qatar"],
  colors: ["red", "green", "blue", "yellow"],
  fruits: ["apple", "banana", "orange", "kiwi"],
  cars: ["bmw", "audi", "mercedes", "toyota"],
};

const wordsKeys = Object.keys(words);
const randomCatIndex = Math.floor(Math.random() * wordsKeys.length);
const cat = wordsKeys[randomCatIndex];
const randomWordIndex = Math.floor(Math.random() * words[cat].length);
let word = words[cat][randomWordIndex].split("");
let dashSpan = [];
let currentTry = 0;

const newGameBtn = document.querySelector(".message button");
const lettersDiv = document.querySelector(".letters");
const wordDev = document.querySelector(".word");
const drawDiv = Array.from(document.querySelectorAll(".draw div"));
document.querySelector(".cat span").innerHTML = cat;

function generateLetters() {
  for (let i = 0; i < letters.length; i++) {
    const letter = document.createElement("div");
    letter.innerHTML = letters[i];
    lettersDiv.append(letter);
    letter.addEventListener("click", pushLetter);
  }
}

function pushLetter() {
  while (word.includes(this.innerHTML)) {
    let index = word.indexOf(this.innerHTML);
    dashSpan[index].innerHTML = word[index];
    word[index] = "_";
    this.classList.add("banned");
  }
  if (this.classList.contains("banned")) {
    this.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-ban"></i>`);
  } else {
    drawDiv[currentTry].classList.remove("none");
    currentTry++;
  }
  if (checkWin()) {
    showMessage(true);
  } else if (currentTry === drawDiv.length - 1) {
    Array.from(document.querySelectorAll(".letters div")).forEach((div) => {
      div.removeEventListener("click", pushLetter);
      if (!div.classList.contains("banned")) {
        div.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-ban"></i>`);
      }
    });
    dashSpan.forEach((span) => {
      span.classList.add("red");
    });
    showMessage(false);
  }
  this.removeEventListener("click", pushLetter);
}

function generateDash() {
  for (let i = 0; i < word.length; i++) {
    const span = document.createElement("span");
    span.innerHTML = "-";
    wordDev.append(span);
    dashSpan.push(span);
  }
}

function checkWin() {
  return word.join("") === "_".repeat(word.length);
}

function showMessage(win) {
  let messageDiv = document.querySelector(".message");
  messageDiv.classList.remove("none");
  let para = document.querySelector(".message p");
  if (win) {
    messageDiv.classList.add("win");
    para.innerHTML = `YOU WIN!!!<br>And Saved The Man`;
  } else {
    para.classList.add("lose");
    para.innerHTML = `YOU LOSE!!!<br>The Man Is Dead`;
  }
}

newGameBtn.addEventListener("click", () => {
  window.location.reload();
});

window.onload = function () {
  generateLetters();
  generateDash();
};
