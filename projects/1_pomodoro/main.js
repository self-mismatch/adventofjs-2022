'use strict';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const UPDATE_INTERVAL = 1000;
const PERCENT_COEFFICIENT = 100;

const TimerState = {
  Editing: 'editing',
  Running: 'running',
  Stopped: 'stopped',
};

const ring = document.querySelector('.ring');
const circle = ring.querySelector('circle');
const timer = document.querySelector('.timer');
const minutesInput = timer.querySelector('.minutes input');
const secondsInput = timer.querySelector('.seconds input');
const mainButton = timer.querySelector('.start');
const settingsButton = timer.querySelector('.settings');

const circleRadius = circle.r.baseVal.value;
const circleCircumference = circleRadius * 2 * Math.PI;

let initialTime, currentTime;

let timerState = TimerState.Stopped;
let intervalId = null;
let timeoutId = null;

init();

function init() {
  initStyles();

  mainButton.addEventListener('click', onMainButtonClick);
  settingsButton.addEventListener('click', onSettingsButtonClick);
}

function initStyles() {
  ring.style.transform = 'rotate(-90deg)';
  circle.style.strokeDasharray = `${circleCircumference} ${circleCircumference}`;
  circle.style.strokeDashoffset = `${circleCircumference} ${circleCircumference}`;
}

function getInitialTime() {
  return (Number(minutesInput.value ?? 0) * SECONDS_IN_MINUTE + Number(secondsInput.value ?? 0)) * MILLISECONDS_IN_SECOND;
}

function startTimer() {
  timerState = TimerState.Running;
  initialTime = getInitialTime();
  currentTime = initialTime;

  intervalId = setInterval(() => {
    updateTimer();
  }, UPDATE_INTERVAL);

  timeoutId = setTimeout(() => {
    stopTimer();

    alert('Timer is over');
  }, initialTime);

  mainButton.textContent = 'Stop';
  settingsButton.disabled = true;
  minutesInput.disabled = true;
  secondsInput.disabled = true;
}

function stopTimer() {
  timerState = TimerState.Stopped;

  clearInterval(intervalId);
  clearTimeout(timeoutId);

  intervalId = null;
  timeoutId = null;
  currentTime = initialTime;

  updateInputs();
  updateStyles();

  mainButton.textContent = 'Start';
  settingsButton.disabled = false;
}

function updateTimer() {
  currentTime -= MILLISECONDS_IN_SECOND;

  updateInputs();
  updateStyles();
}

function updateInputs() {
  const [minutes, seconds] = getFormattedTime();

  minutesInput.value = minutes;
  secondsInput.value = seconds;
}

function updateStyles() {
  const percent = Math.round(currentTime / initialTime * PERCENT_COEFFICIENT);

  circle.style.strokeDashoffset = (circleCircumference - percent / PERCENT_COEFFICIENT * circleCircumference).toString();
}

function toggleEditState() {
  if (timerState === TimerState.Editing) {
    timerState = TimerState.Stopped;

    minutesInput.disabled = true;
    secondsInput.disabled = true;
  } else {
    timerState = TimerState.Editing;

    minutesInput.disabled = false;
    secondsInput.disabled = false;
  }
}

function getFormattedTime() {
  const currentTimeInSeconds = currentTime / MILLISECONDS_IN_SECOND;
  let minutes = (Math.floor(currentTimeInSeconds / SECONDS_IN_MINUTE)).toString();
  let seconds = (currentTimeInSeconds % SECONDS_IN_MINUTE).toString();

  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }

  if (seconds.length === 1) {
    seconds = `0${seconds}`;
  }

  return [minutes, seconds];
}

function onMainButtonClick() {
  switch (timerState) {
    case TimerState.Running:
      stopTimer();

      break;
    default:
      startTimer();

      break;
  }
}

function onSettingsButtonClick() {
  toggleEditState();
}

