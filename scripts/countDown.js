"use strict"

import formatSecondsinMinutes from "./time.js";

const startAudio = new Audio('/sounds/play.wav');
const pauseAudio = new Audio('/sounds/pause.mp3');
const finishAudio = new Audio('/sounds/beep.mp3');
const startButtonText = document.querySelector('#start-pause span');
const playPauseIcon = document.querySelector('.app__card-primary-butto-icon');
const timer = document.querySelector('#timer');

const focusTime = 2; //25
const shortRestTime = 2; //5
const longRestTime = 2; //15

let restTime = focusTime;
let contextTime = restTime;
let intervalId = null;


function startPause () {
    if (intervalId) {
        pause();
        return;
    }
    start();
}

function start() {
    showTimer(restTime);
    intervalId = setInterval(countDown, 1000);
    startAudio.play();
    startButtonText.textContent = "Pausar";
    playPauseIcon.setAttribute('src', '/imgs/pause.png');
}

function pause() {
    pauseCountDown();
    pauseAudio.play();
    startButtonText.textContent = "Começar";
    playPauseIcon.setAttribute('src', '/imgs/play_arrow.png');
}

function dispatchFinishEvent() {
    const finishEvent = new CustomEvent('countDownFinished');
    document.dispatchEvent(finishEvent);
}

function finish () {
    finishAudio.play();
    resetCountDown(focusTime);
    //Timeout de 100 milissegundos no alerta para garantir que a tela já esteja exibindo 00:00 restantes
    setTimeout(() => {
        alert("Tempo finalizado");
    }, 100);

    dispatchFinishEvent();
}

function countDown () {
    restTime -= 1;
    showTimer(restTime);
    if (restTime <= 0) {
        finish();
    }
}

function changeContext(context) {
    switch (context) {
        case "focus":
            contextTime = focusTime;
            restTime = focusTime;
            break;
        case "shortRest":
            contextTime = shortRestTime;
            restTime = shortRestTime;
            break;
        case "longRest":
            contextTime = longRestTime;
            restTime = longRestTime;
            break;
        default:
            break;
    }
    showTimer(contextTime);
    if (intervalId) {
        pause();
    }
}

function pauseCountDown() {
    clearInterval(intervalId);
    intervalId = null;
}

function resetCountDown(newTime = 0) {
    pauseCountDown()
    restTime = newTime;
    startButtonText.textContent = "Começar";
    playPauseIcon.setAttribute('src', '/imgs/play_arrow.png');
}

function showTimer (timetoShow = focusTime) {
    timer.innerHTML = `${formatSecondsinMinutes(timetoShow)}`
}

export default {startPause, changeContext, showTimer}