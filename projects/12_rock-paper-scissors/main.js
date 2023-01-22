'use strict';

const PICKS = ['Rock', 'Paper', 'Scissors'];

const list = document.querySelector('ul');

init();

function init() {
  list.addEventListener('click', onListClick);
}

function getRandomPick() {
  return PICKS[getRandomNumber(0, PICKS.length - 1)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function onListClick(evt) {
  const button = evt.target.closest('button');

  if (!button) {
    return;
  }

  const pick = button.dataset.pick;
  const url = new URL('./winner.html', window.location.href);

  url.searchParams.append('userPick', pick);
  url.searchParams.append('computerPick', getRandomPick());

  window.open(url, '_self');
}
