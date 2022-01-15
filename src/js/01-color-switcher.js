const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

const DELAY = 1000;
let timerId = null;
startBtn.disabled = false;
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  body.style.backgroundColor = getRandomHexColor;
}

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  console.log(`Call onStartBtnClick every ${DELAY} ms`);
  timerId = setInterval(changeBgColor, DELAY);
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stoptBtn.addEventListener('click', onStopBtnClick);

function onStopBtnClick() {

    startBtn.disabled = false;
    stopBtn.disabled = true;
  clearInterval(timerId);
  console.log('Stopped');
}

