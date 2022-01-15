import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let DatesOnUnix = null;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    DatesOnUnix = selectedDates[0];

    if (DatesOnUnix > Date.now()) {
      refs.startBtn.removeAttribute('disabled', 'disabled');
    } else {
      Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
    }
  },
};

function onClickStartBnt() {
  setInterval(() => {
    const deltaTime = DatesOnUnix - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    if (deltaTime > 0) {
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

flatpickr("#datetime-picker", options);
refs.startBtn.setAttribute('disabled', 'disabled');
refs.startBtn.addEventListener('click', onClickStartBnt);