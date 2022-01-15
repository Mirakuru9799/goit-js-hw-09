function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const body = document.querySelector('body');
  const button = document.querySelectorAll('button');

  console.log(button[0]);
  button[0].addEventListener('click', () => {
    timerId = setInterval(() => {
      body.setAttribute('style', `background-color:${getRandomHexColor()}`);
    }, 1000);
    button[0].setAttribute('disabled', true);
  });
  
  button[1].addEventListener('click', () => {
    clearInterval(timerId);
  
    button[0].removeAttribute('disabled');
  });
