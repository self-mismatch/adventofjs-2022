'use strict';

const modalOpenButton = document.querySelector('.modal-open');
const modalCloseButton = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');
const modal = overlay.querySelector('.modal');

let isModalOpen = false;

init();

function init() {
    modalOpenButton.addEventListener('click', onModalOpenButtonClick);
}

function showModal() {
    overlay.classList.add('overlay--show');
    modal.classList.add('modal--show');

    modalCloseButton.addEventListener('click', onModalCloseButtonClick);
}

function hideModal() {
    overlay.classList.remove('overlay--show');
    modal.classList.remove('modal--show');

    modalCloseButton.removeEventListener('click', onModalCloseButtonClick);
}

function onModalOpenButtonClick() {
    showModal();
}

function onModalCloseButtonClick() {
    hideModal();
}
