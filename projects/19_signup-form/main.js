'use strict';

const form = document.querySelector('form');
const passwordInput = document.querySelector('#password');
const successTemplate = document.querySelector('#success-content');
const errorTemplate = document.querySelector('#error-content');

init();

function init() {
    form.addEventListener('change', onFormChange);
    form.addEventListener('click', onFormClick);
}

function getErrorMessage(input) {
    const validity = input.validity;

    if (input.name === 'password-confirm' && passwordInput.value !== input.value) {
        return 'Password and confirm password must match';
    } else if (validity.patternMismatch) {
        return 'Wrong value type';
    } else if (validity.valueMissing) {
        return 'This field is required';
    } else {
        return 'Incorrect value';
    }
}

function checkInputValidity(input) {
    let isValid = input.validity.valid;

    if (input.name === 'password-confirm' && passwordInput.value !== input.value) {
        isValid = false;
    }

    return isValid;
}

function setFieldError(field, message) {
    const fieldError = field.querySelector('.error');
    const input = field.querySelector('input');
    const error = errorTemplate.content.cloneNode(true);
    const errorMessage = error.querySelector('.message');

    errorMessage.textContent = message;
    fieldError.appendChild(error);
    input.setCustomValidity('required');
}

function setFieldSuccess(field) {
    const fieldSuccess = field.querySelector('.success');

    fieldSuccess.innerHTML = '';
    fieldSuccess.appendChild(successTemplate.content.cloneNode(true));
}

function resetFieldError(field) {
    const error = field.querySelector('.error');
    const input = field.querySelector('input');

    error.innerHTML = '';
    input.setCustomValidity('');
}

function resetFieldSuccess(field) {
    const success = field.querySelector('.success');

    success.innerHTML = '';
}

function validateInput(input) {
    const field = input.closest('.field');

    resetFieldError(field);
    resetFieldSuccess(field);

    if (checkInputValidity(input)) {
        setFieldSuccess(field);
    } else {
        setFieldError(field, getErrorMessage(input));
    }
}

function togglePasswordVisibility(element) {
    if (!element.classList.contains('show-hide')) {
        return;
    }

    const field = element.closest('.field');
    const input = field.querySelector('input');

    field.classList.toggle('show');
    input.type = input.type === 'password' ? 'text' : 'password';
}

function onFormChange(evt) {
    validateInput(evt.target);
}

function onFormClick(evt) {
    togglePasswordVisibility(evt.target);
}
