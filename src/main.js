"use strict";
let quizHeader = document.getElementById("quiz-header");
let wordToAppear = document.getElementById("word-to-appear");
let input = document.getElementById("input");
let wordsContainer = document.getElementById("words-container");
let msg = document.getElementById("msg");
let tryAgain = document.getElementById("try-again");
let startBtn = document.getElementById("start-btn");
let timer = document.querySelector("footer #time-left span");
let headerSpans = Array.from(document.querySelectorAll("#quiz-header span"));
let scores = Array.from(document.querySelectorAll("footer #score span"));
let selectedWord = "";
let chosenArrayLength = 15;
let levels = {
    "easy": 7,
    "medium": 5,
    "hard": 3
};
let defaultTime = 7;
let score = 0;
let overallScore = 0;
let easyWords = ["cat", "dog", "car", "sun", "cup", "hat", "pen", "map", "man", "bus", "top", "fun", "job", "sky", "red"];
let mediumWords = ["computer", "elephant", "guitar", "library", "mountain", "ocean", "camera", "journey", "musical", "network", "picture", "rainbow", "teacher", "village", "zombie"];
let hardWords = ["university", "accommodation", "entrepreneur", "international", "psychology", "sustainability", "architecture", "bureaucracy", "communication", "disadvantage", "environmental", "heterogeneous", "infrastructure", "opportunity", "quantitative"];
input.onpaste = () => false;
tryAgain.style.display = "none";
function getRandomWord(words) {
    let chosenWord = words[Math.floor(Math.random() * words.length)];
    wordToAppear.innerHTML = chosenWord;
    selectedWord = chosenWord;
    let index = words.indexOf(chosenWord);
    words.splice(index, 1);
}
function editQuizHeader(chosenLevel) {
    headerSpans[0].innerHTML = chosenLevel;
    headerSpans[1].innerHTML = `${levels[chosenLevel]}`;
}
function fillWordsContainer(words) {
    for (let i = 0; i < words.length; i++) {
        let word = document.createElement("span");
        word.innerHTML = words[i];
        wordsContainer.appendChild(word);
    }
}
function setScore(score) {
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
    }, 1000);
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
    };
    tryAgain.onclick = () => location.reload();
};
