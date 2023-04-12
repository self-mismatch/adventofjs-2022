'use strict';

const KNOB_WIDTH = 50;

const amountElement = document.querySelector('.dollars');
const input = document.querySelector('#priceRange');

const inputLeftEdge = input.getBoundingClientRect().left;
const inputRightEdge = inputLeftEdge + input.offsetWidth;
const minAmount = Number(input.getAttribute('min'));
const maxAmount = Number(input.getAttribute('max'));
let amount = Number(input.value);
let isHandle = false;

init();

function init() {
    updateAmount(amount);

    input.addEventListener('mousedown', onInputMouseDown);
    input.addEventListener('mouseup', onInputMouseUp);
    input.addEventListener('mousemove', onInputMouseMove);
}

function updateAmount(value) {
    amount = value;
    amountElement.textContent = amount;
}

function calculateAmount(clientX) {
    let amount = Math.round(maxAmount * ((clientX - inputLeftEdge - KNOB_WIDTH / 2) / (inputRightEdge - inputLeftEdge - KNOB_WIDTH)) * 100) / 100;

    if (amount >= maxAmount) {
        amount = maxAmount;
    } else if (amount <= minAmount) {
        amount = minAmount;
    }

    return amount
}

function onInputMouseDown() {
    isHandle = true;
}

function onInputMouseUp() {
    isHandle = false;
}

function onInputMouseMove(evt) {
    if (!isHandle) {
        return;
    }

    const value = calculateAmount(evt.clientX);

    updateAmount(value)
}
