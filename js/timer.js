'use strict';

const timer = () => {
  const timerBlock = document.querySelector('.timer');

  if (timerBlock) {
    const deadline = new Date(timerBlock.dataset.deadline).getTime();

    timerBlock.insertAdjacentHTML('afterbegin', `
      <p class="promo__action">До конца акции осталось:</p>

      <div class="promo__ending">
        <p class="promo__time promo__time_day">
          <span class="promo__count timer__block_days"></span>
          <span class="promo__type"></span>
        </p>

        <p class="promo__time">
          <span class="promo__count timer__block_hour"></span>
          <span class="promo__type"></span>
        </p>

        <p class="promo__time">
          <span class="promo__count timer__block_min"></span>
          <span class="promo__type"></span>
        </p>

        <p class="promo__time promo__time_sec">
          <span class="promo__count timer__block_sec"></span>
          <span class="promo__type"></span>
        </p>
      </div>
    `);

    const timerBlockDays = document.querySelector('.timer__block_days');
    const timerBlockHour = document.querySelector('.timer__block_hour');
    const timerBlockMin = document.querySelector('.timer__block_min');
    const timerBlockSec = document.querySelector('.timer__block_sec');
    const promoTimeDay = document.querySelector('.promo__time_day');
    const promoTimeSec = document.querySelector('.promo__time_sec');

    promoTimeSec.classList.add('visually-hidden');

    const getTimeRemaining = () => {
      const dateStop = deadline + 60 * 60 * 1000;
      const dateNow = Date.now();
      console.log(dateStop, dateNow)

      const timeRemaining = dateStop - dateNow;

      const seconds = Math.floor(timeRemaining / 1000 % 60);
      const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
      const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
      const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

      return {
        timeRemaining,
        days,
        hours,
        minutes,
        seconds
      };
    };

    const start = () => {
      const timer = getTimeRemaining();

      const daysArr = ['день', 'дня', 'дней'];
      const hoursArr = ['час', 'часа', 'часов'];
      const minutesArr = ['минута', 'минуты', 'минут'];
      const secondsArr = ['секунда', 'секунды', 'секунд'];
      const onlyWord = document.querySelectorAll('.promo__type');
      const declOfNum = (n, titles) => titles[n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

      timerBlockDays.textContent = new Intl.NumberFormat('ru', {minimumIntegerDigits: 2}).format(timer.days);
      timerBlockHour.textContent = new Intl.NumberFormat('ru', {minimumIntegerDigits: 2}).format(timer.hours);
      timerBlockMin.textContent = new Intl.NumberFormat('ru', {minimumIntegerDigits: 2}).format(timer.minutes);
      timerBlockSec.textContent = new Intl.NumberFormat('ru', {minimumIntegerDigits: 2}).format(timer.seconds);

      onlyWord[0].textContent = declOfNum(timer.days, daysArr);
      onlyWord[1].textContent = declOfNum(timer.hours, hoursArr);
      onlyWord[2].textContent = declOfNum(timer.minutes, minutesArr);
      onlyWord[3].textContent = declOfNum(timer.seconds, secondsArr);

      const intervalID = setTimeout(start, 1000);

      if (timer.timeRemaining <= 86400000) {
        promoTimeSec.classList.remove('visually-hidden');
        promoTimeDay.classList.add('visually-hidden');
      }

      if (timer.timeRemaining <= 0) {
        clearTimeout(intervalID);
        timerBlock.classList.add('visually-hidden');
      }
    };

    start();
  }
};

timer();
