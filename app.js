'use strict';

const hourEl = document.querySelector('.hour');
const minEl = document.querySelector('.min');
const secEl = document.querySelector('.sec');
const quoteEl = document.querySelector('.quote');
const btn = document.querySelector('.btn');

function setTime() {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const secDegrees = (seconds / 60) * 360 + 90;
  const minDegrees = (minutes / 60) * 360 + 90;
  const hourDegrees = (hours / 12) * 360 + 90;
  secEl.style.transform = `rotate(${secDegrees}deg)`;
  minEl.style.transform = `rotate(${minDegrees}deg)`;
  hourEl.style.transform = `rotate(${hourDegrees}deg)`;
}

const getQuotes = function () {
  fetch('https://quote-garden.herokuapp.com/api/v3/quotes/random')
    .then((res) => {
      if (!res.ok) throw new Error(`Can't get quote ${res.status}`);
      return res.json();
    })
    .then((data) => renderQuotes(data))
    .catch((err) => console.error(`Something went wrong ${err}`));
};

function renderQuotes(data) {
  const { quoteText, quoteAuthor } = data.data[0];
  quoteEl.textContent = `"${quoteText}" -- ${quoteAuthor}`;
}

getQuotes();
setInterval(setTime, 1000);

btn.addEventListener('click', getQuotes);
