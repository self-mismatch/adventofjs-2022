'use strict';

const MAX_TOASTER_SHOW_COUNT = 1;
const TOASTER_AUTO_SHOW_TIME_MS = 15_000;
const TOASTER_AUTO_HIDE_TIME_MS = 15_000;

const toaster = document.querySelector('.toaster');
const toasterCloseButton = toaster.querySelector('.close-toaster');

let toasterShowCount = 0;
let toasterAutoShowTimeoutId = null;
let toasterAutoHideTimeoutId = null;

init();

function init() {
    document.addEventListener('mouseleave', onDocumentMouseLeave);

    toasterAutoShowTimeoutId = setTimeout(() => {
        showToaster();
    }, TOASTER_AUTO_SHOW_TIME_MS);
}

function showToaster() {
    if (toasterShowCount >= MAX_TOASTER_SHOW_COUNT || !toaster.classList.contains('collapsed')) {
        document.removeEventListener('mouseleave', onDocumentMouseLeave);
        
        return;
    }

    if (toasterAutoShowTimeoutId) {
        clearTimeout(toasterAutoShowTimeoutId);
        toasterAutoShowTimeoutId = null;
    }

    toasterCloseButton.addEventListener('click', onToasterCloseButtonClick);
    toaster.classList.remove('collapsed');
    toasterShowCount += 1;

    toasterAutoHideTimeoutId = setTimeout(() => {
        hideToaster();
    }, TOASTER_AUTO_HIDE_TIME_MS);
}

function hideToaster() {
    if (toasterAutoHideTimeoutId) {
        clearTimeout(toasterAutoHideTimeoutId);
        toasterAutoHideTimeoutId = null;
    }

    toasterCloseButton.removeEventListener('click', onToasterCloseButtonClick);
    toaster.classList.add('collapsed');
}

function onDocumentMouseLeave() {
    showToaster();
}

function onToasterCloseButtonClick() {
    hideToaster();
}
