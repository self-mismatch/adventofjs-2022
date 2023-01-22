'use strict';

const Win = {
  Paper: 'Rock',
  Rock: 'Scissors',
  Scissors: 'Paper',
};

const GameResult = {
  Computer: 'Computer',
  Draw: 'Draw',
  User: 'User',
};

const PickImage = {
  Paper: 'paper',
  Rock: 'rock',
  Scissors: 'scissors',
};

const body = document.body;
const userPickImage = body.querySelector('.your-pick img');
const computerPickImage = body.querySelector('.computer-pick img');

init();

function init() {
  const [userPick, computerPick] = getPicksFromUrl();
  const gameResult = getGameResult(userPick, computerPick);

  renderView(userPick, computerPick, gameResult);
}

function getPicksFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);

  return [urlParams.get('userPick'), urlParams.get('computerPick')];
}

function getGameResult(userPick, computerPick) {
  if (userPick === computerPick) {
    return GameResult.Draw;
  } else if (Win[userPick] === computerPick) {
    return GameResult.User;
  } else {
    return GameResult.Computer;
  }
}

function renderView(userPick, computerPick, gameResult) {
  userPickImage.setAttribute('src', `./images/${PickImage[userPick]}.png`);
  userPickImage.setAttribute('alt', userPick);
  computerPickImage.setAttribute(
    'src',
    `./images/${PickImage[computerPick]}.png`
  );
  computerPickImage.setAttribute('alt', computerPick);

  switch (gameResult) {
    case GameResult.Computer:
      body.classList.add('computer-wins');
      break;

    case GameResult.Draw:
      body.classList.add('draw');
      break;

    case GameResult.User:
      body.classList.add('you-win');
      break;
  }
}
