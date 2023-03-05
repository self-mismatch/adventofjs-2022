'use strict';

const header = document.querySelector('.month');
const daysContainer = document.querySelector('.days');
const prevMonthButton = document.querySelector('.previous');
const nextMonthButton = document.querySelector('.next');

const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Days = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

const actualDate = new Date();
let pickedDate = actualDate;

init();

function init() {
  nextMonthButton.addEventListener('click', onMonthControlClick);
  prevMonthButton.addEventListener('click', onMonthControlClick);

  updateView();
}

function updateView() {
  daysContainer.innerHTML = '';

  renderHeader(pickedDate);
  renderDays(pickedDate);
}

function renderHeader(date) {
  header.textContent = `${date.getFullYear()} - ${Months[date.getMonth()]}`;
}

function renderDays(date) {
  const dayElements = getDayElements(date);

  daysContainer.appendChild(dayElements);
}

function getDayElements(date) {
  const fragment = document.createDocumentFragment();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const firstDayOfMonth =
    Days[
      new Date(year, month, 1).toLocaleString('en-US', {
        weekday: 'long',
      })
    ];
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const firstEmptyCells = firstDayOfMonth - 1;

  for (let i = 0; i < firstEmptyCells; i++) {
    const day = document.createElement('div');

    fragment.appendChild(day);
  }

  for (let i = 1; i < lastDayOfMonth; i++) {
    const dayElement = document.createElement('div');
    dayElement.textContent = i;

    if (compareDates(actualDate, pickedDate) && i === day) {
      dayElement.classList.add('today');
    }

    fragment.appendChild(dayElement);
  }

  return fragment;
}

function compareDates(first, second) {
  return first.toLocaleDateString() === second.toLocaleDateString();
}

function onMonthControlClick(evt) {
  const control = evt.target.closest('button').dataset.month;

  switch (control) {
    case 'next':
      pickedDate = new Date(
        pickedDate.getFullYear(),
        pickedDate.getMonth() + 1,
        pickedDate.getDate()
      );
      break;
    case 'prev':
      pickedDate = new Date(
        pickedDate.getFullYear(),
        pickedDate.getMonth() - 1,
        pickedDate.getDate()
      );
      break;
    default:
      break;
  }

  updateView();
}
