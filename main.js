const letters = "abcdefghijklmnopqrstuvwxyz";

const words = {
  programming: [
    "java",
    "python",
    "javascript",
    "pascal",
    "ruby",
    "swift",
    "kotlin",
  ],
  countries: [
    "egypt",
    "jordan",
    "syria",
    "qatar",
    "india",
    "canada",
    "brazil",
    "germany",
  ],
  colors: [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "white",
    "black",
    "orange",
  ],
  fruits: ["apple", "orange", "kiwi", "mango", "grape", "peach", "plum"],
  cars: ["bmw", "audi", "toyota", "ford", "tesla", "honda"],
  animals: [
    "lion",
    "tiger",
    "zebra",
    "giraffe",
    "elephant",
    "rabbit",
    "monkey",
    "panda",
  ],
  sports: [
    "soccer",
    "tennis",
    "cricket",
    "hockey",
    "boxing",
    "cycling",
    "golf",
    "rugby",
  ],
  cities: [
    "paris",
    "london",
    "tokyo",
    "delhi",
    "rome",
    "berlin",
    "madrid",
    "dubai",
    "sydney",
    "chicago",
    "miami",
    "toronto",
    "seattle",
    "boston",
    "orlando",
    "houston",
    "beijing",
    "shanghai",
    "mumbai",
    "bangkok",
    "singapore",
    "istanbul",
    "nairobi",
    "amsterdam",
    "barcelona",
    "brisbane",
    "melbourne",
    "vancouver",
    "montreal",
    "cape town",
    "kyoto",
    "osaka",
    "valencia",
    "lisbon",
    "athens",
    "alexandria",
    "washington",
    "losangeles",
  ],
  planets: [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
  ],
  languages: [
    "english",
    "spanish",
    "french",
    "german",
    "arabic",
    "chinese",
    "japanese",
    "korean",
  ],
  professions: [
    "doctor",
    "teacher",
    "engineer",
    "lawyer",
    "nurse",
    "pilot",
    "farmer",
    "artist",
  ],
  hobbies: [
    "reading",
    "writing",
    "drawing",
    "cooking",
    "gardening",
    "dancing",
    "hiking",
    "swimming",
  ],
  tools: [
    "hammer",
    "screwdriver",
    "wrench",
    "pliers",
    "saw",
    "drill",
    "tape",
    "level",
  ],
  drinks: [
    "water",
    "juice",
    "coffee",
    "tea",
    "milk",
    "soda",
    "lemonade",
    "smoothie",
  ],
  elements: [
    "gold",
    "silver",
    "oxygen",
    "iron",
    "carbon",
    "nitrogen",
    "hydrogen",
    "helium",
    "aluminum",
    "argon",
    "barium",
    "boron",
    "calcium",
    "carbon",
    "chlorine",
    "chromium",
    "cobalt",
    "copper",
    "fluorine",
    "gold",
    "iodine",
    "iron",
    "lithium",
    "magnesium",
    "manganese",
    "mercury",
    "neon",
    "nickel",
    "phosphorus",
    "platinum",
    "potassium",
    "radium",
    "silicon",
    "sodium",
    "strontium",
    "sulfur",
    "titanium",
    "uranium",
    "vanadium",
    "xenon",
    "zinc",
  ],
};

const wordsKeys = Object.keys(words);
const randomCatIndex = Math.floor(Math.random() * wordsKeys.length);
const cat = wordsKeys[randomCatIndex];
const randomWordIndex = Math.floor(Math.random() * words[cat].length);
let word = words[cat][randomWordIndex].split("");
let wordSpan = [];
let currentTry = 0;

const wordCopy = word.join("");
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
    wordSpan[index].innerHTML = word[index];
    word[index] = "_";
    this.classList.add("correct");
  }
  if (this.classList.contains("correct")) {
    this.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-check"></i>`);
  } else {
    this.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-ban"></i>`);
    drawDiv[currentTry].classList.remove("none");
    currentTry++;
  }
  let allLetters = Array.from(lettersDiv.getElementsByTagName("div"));
  let isWinner = checkWin();
  if (isWinner || currentTry === drawDiv.length - 1) {
    allLetters.forEach((div) => {
      div.removeEventListener("click", pushLetter);
      div.classList.add("blur");
    });
    if (isWinner) {
      showMessage(true);
    } else{
      showMessage(false);
      wordSpan.forEach((span) => {
        span.classList.add("red");
      });
    }
  }
  this.removeEventListener("click", pushLetter);
}

function generateDash() {
  for (let i = 0; i < word.length; i++) {
    const span = document.createElement("span");
    wordDev.append(span);
    wordSpan.push(span);
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
    para.innerHTML = `YOU LOSE!!!<br>The Man Is Dead<br>The Word Is "${wordCopy}"`;
  }
}

newGameBtn.addEventListener("click", () => {
  window.location.reload();
});

window.onload = function () {
  generateLetters();
  generateDash();
};
