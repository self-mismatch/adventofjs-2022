'use strict';

const form = document.querySelector('form');
const inputs = form.querySelectorAll('input');
const submitButton = form.querySelector('button');

init();

function init() {
    form.addEventListener('input', onFormInput);
    form.addEventListener('paste', onFormPaste);
}

function setNextFocus(currentInputName) {
    const [prefix, currentInputPosition] = currentInputName.split('_');
    const nextInputName = `${prefix}_${Number(currentInputPosition) + 1}`;
    const nextInput = form.querySelector(`input[name="${nextInputName}"]`);

    if (!nextInput) {
        submitButton.focus();

        return;
    }

    nextInput.focus();
}

function setCopiedCode(code) {
    const codeNumbers = code.split('');
    console.log(codeNumbers);

    codeNumbers.forEach((codeNumber, index) => {
        inputs[index].value = codeNumber;
    });

    if (codeNumbers.length < 4) {
        return;
    }

    submitButton.focus();
}

function onFormInput(evt) {
    const input = evt.target;

    if (!input.value) {
        return;
    }

    setNextFocus(evt.target.name);
}

function onFormPaste(evt) {
    evt.preventDefault();

    const code = evt.clipboardData.getData('Text');

    if (isNaN(Number(code))) {
        return;
    }

    setCopiedCode(code);
}
