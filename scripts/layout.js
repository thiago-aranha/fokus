"use strict"

const html = document.querySelector('html');
const img = document.querySelector('.app__image');
const title = document.querySelector('.app__title');

let activeLayout = 'focus';

function changeLayout(context, header, activatebutton, deactivateButton) {
    activeLayout = context;
    html.setAttribute('data-context', context);
    img.setAttribute('src',`/imgs/${context}.png`);
    title.innerHTML = header;
    deactivateButton.classList.remove('active');
    activatebutton.classList.add('active');
};

function getActiveLayout() {
    return activeLayout;
}

export default {changeLayout, getActiveLayout};