'use strict';

const CardClassName = {
    AMERICAN: 'american',
    DISCOVER: 'discover',
    MASTERCARD: 'mastercard',
    VISA: 'visa',
};

const card = document.querySelector('.credit-card__wrapper');
const cardNumberInput = document.querySelector('#card-number');
const cvvInput = document.querySelector('#cvv');

init();

function init() {
    cardNumberInput.addEventListener('change', onCardNumberChange);
    cvvInput.addEventListener('focus', onCvvFocus);
    cvvInput.addEventListener('blur', onCvvBlur);
}

function getCardDesignClassName(firstCardNumber) {
    switch (firstCardNumber) {
        case 3:
            return CardClassName.AMERICAN;
        case 4:
            return CardClassName.VISA;
        case 5:
            return CardClassName.MASTERCARD;
        default:
            return CardClassName.DISCOVER;
    }
}

function onCardNumberChange(evt) {
    const firstNumber = Number(evt.target.value[0]);
    const cardDesignClassName = getCardDesignClassName(firstNumber);

    card.classList.remove(CardClassName.AMERICAN, CardClassName.DISCOVER, CardClassName.MASTERCARD, CardClassName.VISA);
    card.classList.add(cardDesignClassName)
}

function onCvvFocus() {
    card.classList.add('flip');
}

function onCvvBlur() {
    card.classList.remove('flip');
}
