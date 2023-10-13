import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/l10n/uk.js';
import Notiflix from 'notiflix';

const inputTextData = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentTime = new Date();
    if (selectedDate <= currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      inputTextData.value = '';
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(inputTextData, options);

const startButton = document.querySelector('button[data-start');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = new Date(inputTextData.value);
  const currentTime = new Date();

  if (selectedDate <= currentTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    startButton.disabled = true;
    countdownInterval = setInterval(() => updateTimer(selectedDate), 1000);
  }
});

function updateTimer(endTime) {
  const timeRemaining = endTime - new Date();
  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    startButton.disabled = false;
    Object.values(timerFields).forEach((field) => (field.textContent = '00'));
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);
  Object.entries(timerFields).forEach(([key, field]) => (field.textContent = addLeadingZero(key === 'days' ? days : key === 'hours' ? hours : key === 'minutes' ? minutes : seconds)));
}

function convertMs(ms) {
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const styleCalendar = document.querySelector('.timer');

styleCalendar.style.display = 'flex';
styleCalendar.style.gap = '10px';