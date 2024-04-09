"use strict"

import changeLayout from "./layout.js";
import countDown from "./countDown.js";

const focusBt = document.querySelector('.app__card-button--foco');
const shortRestBt = document.querySelector('.app__card-button--curto');
const longRestBt = document.querySelector('.app__card-button--longo');
const musicSwitch = document.querySelector('#alternar-musica');
const calmMusic = new Audio('/sounds/luna-rise-part-one.mp3');
const startButton = document.querySelector('#start-pause');

let prevButton = focusBt;

calmMusic.loop = true;

const headerFoco = `Otimize sua produtividade,<br>
<strong class="app__title-strong">mergulhe no que importa.</strong>`;
const headerCurto = `Que tal dar uma respirada?<br>
<strong class="app__title-strong">Faça uma pausa curta!</strong>`;
const headerLongo = `Hora de voltar à superfície.<br>
<strong class="app__title-strong">Faça uma pausa longa.</strong>`;

focusBt.addEventListener('click', () => {
    changeLayout('foco', headerFoco, focusBt, prevButton);
    prevButton = focusBt;
    countDown.changeContext("focus");
});

shortRestBt.addEventListener('click', () => {
    changeLayout('descanso-curto', headerCurto, shortRestBt, prevButton);
    prevButton = shortRestBt;
    countDown.changeContext("shortRest");
});

longRestBt.addEventListener('click', () => {
    changeLayout('descanso-longo', headerLongo, longRestBt, prevButton);
    prevButton = longRestBt;
    countDown.changeContext("longRest");
});

musicSwitch.addEventListener('change', () => {
    if (musicSwitch.checked) {
        calmMusic.play();
    } else if (calmMusic) {
        calmMusic.pause();
    }
});

startButton.addEventListener('click', () => {
    countDown.startPause();
})

countDown.showTimer();