let quizHeader = <HTMLDivElement>document.getElementById("quiz-header");
let wordToAppear = <HTMLDivElement>document.getElementById("word-to-appear");
let input = <HTMLInputElement>document.getElementById("input");
let wordsContainer = <HTMLDivElement>document.getElementById("words-container");
let msg = <HTMLDivElement>document.getElementById("msg");
let tryAgain = <HTMLButtonElement>document.getElementById("try-again");
let startBtn = <HTMLButtonElement>document.getElementById("start-btn");
let timer = <HTMLSpanElement>document.querySelector("footer #time-left span")
let headerSpans = Array.from(document.querySelectorAll("#quiz-header span"));
let scores = Array.from(document.querySelectorAll("footer #score span"));
let selectedWord: string = "";
let chosenArrayLength: number = 15;

let levels: {
    easy: number,
    medium: number,
    hard: number
} = {
    "easy": 7,
    "medium": 5,
    "hard": 3
}
let defaultTime = 7;
let score: number = 0;
let overallScore = 0;
let easyWords: string[] = ["cat", "dog", "car", "sun", "cup", "hat", "pen", "map", "man", "bus", "top", "fun", "job", "sky", "red"];
let mediumWords: string[] = ["computer", "elephant", "guitar", "library", "mountain", "ocean", "camera", "journey", "musical", "network", "picture", "rainbow", "teacher", "village", "zombie"];
let hardWords: string[] = ["university", "accommodation", "entrepreneur", "international", "psychology", "sustainability", "architecture", "bureaucracy", "communication", "disadvantage", "environmental", "heterogeneous", "infrastructure", "opportunity", "quantitative"];

input.onpaste = () => false;
tryAgain.style.display = "none";

function getRandomWord(words: string[]) {
    let chosenWord: string = words[Math.floor(Math.random() * words.length)];
    wordToAppear.innerHTML = chosenWord;
    selectedWord = chosenWord;
    let index: number = words.indexOf(chosenWord);
    words.splice(index, 1);
}

function editQuizHeader(chosenLevel: ("easy" | "medium" | "hard")) {
    headerSpans[0].innerHTML = chosenLevel;
    headerSpans[1].innerHTML = `${levels[chosenLevel]}`;
}

function fillWordsContainer(words: string[]) {
    for (let i = 0; i < words.length; i++) {
        let word = <HTMLSpanElement>document.createElement("span");
        word.innerHTML = words[i];
        wordsContainer.appendChild(word);
    }
}

function setScore(score: number) {
    scores[0].innerHTML = `${score}`;
    scores[1].innerHTML = `${chosenArrayLength}`;
}

startBtn.onclick = () => {
    startBtn.remove();
    editQuizHeader("easy");
    getRandomWord(easyWords);
    fillWordsContainer(easyWords);
    setScore(score);
    let setTime = setInterval(() => {
        timer.innerHTML = `${defaultTime}`;
        if (defaultTime === -1) {
            clearInterval(setTime);
            timer.innerHTML = "0";
        }
        else if (defaultTime === 0) {
            clearInterval(setTime);
            msg.innerHTML = "game over!";
            tryAgain.style.display = "block";
            msg.classList.add("over");
            input.setAttribute("disabled", "");
        }
        defaultTime--;
    }, 1000)
    input.oninput = () => {
        if (input.value.toLowerCase() === selectedWord.toLowerCase()) {
            if (easyWords.length === 0) {
                defaultTime = -1;
                score++;
                setScore(score);
                msg.innerHTML = "Congratulations!";
                tryAgain.style.display = "block";
                msg.classList.add("success");
            }
            else {
                defaultTime = 7;
                input.value = "";
                score++;
                setScore(score);
                getRandomWord(easyWords);
                wordsContainer.innerHTML = "";
                fillWordsContainer(easyWords);
            }
        }
    }
    tryAgain.onclick = () => location.reload();
}
