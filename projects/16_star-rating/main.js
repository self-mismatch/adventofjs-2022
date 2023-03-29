'use strict';

const starRating = document.querySelector('.star-rating');
const stars = starRating.querySelectorAll('.star');

let lastHoverRating = 0;
let currentRating = null;

init();

function init() {
  starRating.addEventListener('mouseover', onStarRatingMouseOver);
  starRating.addEventListener('mouseout', onStarRatingMouseOut);
  starRating.addEventListener('click', onStarRatingClick);
}

function setRating(amount) {
  lastHoverRating = amount;

  for (let i = 0; i < amount; i++) {
    stars[i].classList.add('star--active');
  }
}

function resetRating() {
  stars.forEach((star) => {
    star.classList.remove('star--active');
  });
}

function onStarRatingMouseOver(event) {
  const star = event.target.closest('a');

  if (!star) {
    return;
  }

  resetRating();
  setRating(star.dataset.position);
}

function onStarRatingMouseOut() {
  resetRating();

  if (currentRating) {
    setRating(currentRating);
  }
}

function onStarRatingClick() {
  currentRating = lastHoverRating;
}
