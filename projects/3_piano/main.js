'use strict';

const piano = document.querySelector('.piano');
const keys = piano.querySelectorAll('a');
const sounds = new Map();

keys.forEach((key, index) => {
  const audio = new Audio(`./audio/key-${index + 1}.mp3`);

  sounds.set(key, audio);
})

piano.addEventListener('click', onPianoClick);

function onPianoClick(evt) {
  const parent = evt.target.parentElement;

  if (parent.tagName !== 'a') {
    return;
  }

  const audio = sounds.get(parent);
  audio?.play();
}


