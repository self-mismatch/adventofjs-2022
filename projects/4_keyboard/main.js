'use strict';

const keyboard = document.querySelector('.keyboard');
const keys = keyboard.querySelectorAll('.key:not(.utility)');

let jigglingKey = null;

start();

function start() {
  window.addEventListener('keypress', onKeyClick);
  window.addEventListener('click', onKeyClick);

  jiggleRandomKey();
}

function jiggleRandomKey() {
  jigglingKey = getRandomKey();
  jigglingKey.classList.add('jiggle');
}

function onKeyClick(evt) {
  let key;

  switch (evt.type) {
    case 'click':
      key = evt.target.dataset.key;
      break;
    case 'keypress':
      key = evt.key.toUpperCase();
      break;
    default:
      key = null;
      break;
  }

  if (!key || !jigglingKey || key !== jigglingKey.dataset.key) {
    return;
  }

  jigglingKey.classList.remove('jiggle');
  jigglingKey = null;

  setTimeout(() => {
    jiggleRandomKey();
  }, 500);
}

function getRandomKey() {
  const randomIndex = Math.floor(Math.random() * (keys.length + 1));

  return keys[randomIndex];
}
