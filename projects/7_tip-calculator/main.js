'use strict';

const tipAmountText = document.querySelector('#tip-amount');
const totalPerPersonText = document.querySelector('#total-per-person');
const billAmountInput = document.querySelector('#bill-amount');
const numberOfPeopleInput = document.querySelector('#number-of-people');
const tipPercentagesWrapper = document.querySelector('.tip-percentages');
const calculateButton = document.querySelector('#calculate');

let tipAmount = 0;
let totalPerPerson = 0;

init();

function init() {
    calculate();
    updateView();

    calculateButton.addEventListener('click', onCalculateButtonClick);
}

function calculate() {
    const billAmount = Number(billAmountInput.value);
    const numberOfPeople = Number(numberOfPeopleInput.value);
    const tipPercentage = getCheckedTipPercentage();

    tipAmount = roundDecimal(billAmount * tipPercentage / 100) || 0;
    totalPerPerson = roundDecimal((billAmount + tipAmount) / numberOfPeople) || 0;
}

function updateView() {
    tipAmountText.textContent = tipAmount;
    totalPerPersonText.textContent = totalPerPerson;
}

function getCheckedTipPercentage() {
    return Number(Array.from(tipPercentagesWrapper.querySelectorAll('input')).find((radio) => radio.checked).value.slice(0, -1));
}

function roundDecimal(value) {
    return Math.round(value * 100) / 100;
}

function onCalculateButtonClick() {
    calculate();
    updateView();
}
