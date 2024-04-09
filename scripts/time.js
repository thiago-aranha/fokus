"use strict"

function formatSecondsinMinutes (seconds) {
    const milisseconds = new Date(seconds * 1000);

    return milisseconds.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
}

export default formatSecondsinMinutes;