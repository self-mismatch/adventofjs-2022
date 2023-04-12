'use strict';

const list = document.querySelector('ul');

init();

function init() {
    list.addEventListener('click', onListClick);
}

function onListClick(evt) {
    const item = evt.target.closest('li');

    if (!item) {
        return;
    }

    item.classList.toggle('expand');
}
