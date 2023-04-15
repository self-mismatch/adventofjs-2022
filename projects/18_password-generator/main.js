'use strict';

const CHAR_CODE = {
    Numbers: getRange(48, 57),
    UppercaseLetters: getRange(65, 90),
    LowercaseLetters: getRange(97, 122),
    Symbols: getRange(35, 38),
};

const DEFAULT_PASSWORD_LENGTH = 12;
const COPIED_BUTTON_TIMEOUT = 5000;

const passwordInput = document.querySelector('#password');
const lengthInput = document.querySelector('#length');
const symbolsCheckbox = document.querySelector('#symbols');
const numbersCheckbox = document.querySelector('#numbers');
const lowercaseCheckbox = document.querySelector('#lowercase');
const uppercaseCheckbox = document.querySelector('#uppercase');
const similarCheckbox = document.querySelector('#similar');
const copyButton = document.querySelector('.copy');
const lengthText = document.querySelector('#lengthText');

let currentPassword;

init();

function init() {
    lengthInput.addEventListener('input', onLengthInput);
    symbolsCheckbox.addEventListener('change', onCheckboxChange);
    numbersCheckbox.addEventListener('change', onCheckboxChange);
    lowercaseCheckbox.addEventListener('change', onCheckboxChange);
    uppercaseCheckbox.addEventListener('change', onCheckboxChange);
    similarCheckbox.addEventListener('change', onCheckboxChange);
    copyButton.addEventListener('click', onCopyButtonClick);

    updatePassword(DEFAULT_PASSWORD_LENGTH);
}

function updatePassword(length) {
    currentPassword = getRandomPassword(length);

    passwordInput.value = currentPassword;
    lengthText.textContent = length;
}

function getRandomPassword(length) {
    const availableCharCodes = getAvailableCharCodes();

    if (availableCharCodes.length === 0 || !similarCheckbox.checked && availableCharCodes.length < lengthInput.value) {
        return 'Not enough symbols';
    }

    let password = '';

    for (let i = 0; i < length; i++) {
        const char = getRandomCharCode(availableCharCodes);

        if (!similarCheckbox.checked && password.includes(char)) {
            i--;
            continue;
        }

        password += char;
    }

    return password;
}

function getAvailableCharCodes() {
    let availableCharCodes = [];

    if (symbolsCheckbox.checked === true) {
        availableCharCodes = availableCharCodes.concat(CHAR_CODE.Symbols);
    }

    if (numbersCheckbox.checked === true) {
        availableCharCodes = availableCharCodes.concat(CHAR_CODE.Numbers);
    }

    if (lowercaseCheckbox.checked === true) {
        availableCharCodes = availableCharCodes.concat(CHAR_CODE.LowercaseLetters);
    }

    if (uppercaseCheckbox.checked === true) {
        availableCharCodes = availableCharCodes.concat(CHAR_CODE.UppercaseLetters);
    }

    return availableCharCodes;
}

function getRandomCharCode(charCodes) {
    return String.fromCharCode(charCodes[getRandomNumber(0, charCodes.length)])
}

function getRange(start, end) {
    const range = [];

    for (let i = start; i < end; i++) {
        range.push(i);
    }

    return range;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onLengthInput(evt) {
    const length = Number(evt.target.value);

    updatePassword(length);
}

function onCheckboxChange() {
    const length = lengthInput.value;

    updatePassword(length);
}

function onCopyButtonClick() {
    navigator.clipboard.writeText(passwordInput.value);

    copyButton.classList.add('copied');

    setTimeout(() => {
        copyButton.classList.remove('copied');
    }, COPIED_BUTTON_TIMEOUT);
}
