"use strict"

const html = document.querySelector('html');
const img = document.querySelector('.app__image');
const title = document.querySelector('.app__title');

function changeLayout(context, header, activatebutton, deactivateButton) {
    html.setAttribute('data-contexto', context);
    img.setAttribute('src',`/imgs/${context}.png`);
    title.innerHTML = header;
    deactivateButton.classList.remove('active');
    activatebutton.classList.add('active');
};

export default changeLayout;