import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { calculateMaxCountGenre, getGenresStatistic } from '../../utils/common';
import { BAR_HEIGHT, Periods } from '../../utils/constants';
import Smart from '../smart';
dayjs.extend(duration);

const createStatsOfTimeTemplate = () => {
  let temlate = '';
  Object.values(Periods).forEach((item) => temlate += `
  <input type="radio"
   class="statistic__filters-input visually-hidden"
    name="statistic-filter"
     id="statistic-${item}"
      value="${item}" checked>
  <label for="statistic-${item}" class="statistic__filters-label">${item}</label>
  `);
  return temlate;
};

const calculateDuration = (state) => {
  const watchedFilms = state.films.filter((film) => film.isInHistory);
  let watchedFilmsDuration = 0;
  watchedFilms.map((film) => watchedFilmsDuration += film.duration);
  return watchedFilmsDuration;
};

const renderChart = (container, state) => {
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  container.height = BAR_HEIGHT * 5;

  return new Chart(container, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(getGenresStatistic(state)),
      datasets: [{
        data: Object.values(getGenresStatistic(state)),
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticTemplate = (state, userRank) => {
  const { films } = state;
  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${userRank}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
    ${createStatsOfTimeTemplate()}
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${films.filter((film) => film.isInHistory).length} <span class="statistic__item-description"> movies</span></p>
    </li >
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${dayjs.duration(calculateDuration(state), 'minutes').hours()} <span class="statistic__item-description">h</span> ${dayjs.duration(calculateDuration(state), 'minutes').minutes()} <span span class="statistic__item-description" > m</span></p >
    </li >
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Top genre</h4>
    <p class="statistic__item-text">${calculateMaxCountGenre(getGenresStatistic(state))}</p>
  </li>
  </ul >

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

  </section > `;
};

export default class Statistic extends Smart {
  constructor(films) {
    super();
    this._state = {
      films,
      dateTo: dayjs().toDate(),
      currentPeriod: Periods.ALL_TIME,
    };

    this._userRank = document.querySelector('.profile__rating').textContent;
    this._genresChart = null;

    this._onStatisticPeriods = this._onStatisticPeriods.bind(this);
    this._setInnerHandlers();
    this._drawChart();
  }

  getTemplate() { return createStatisticTemplate(this._state, this._userRank); }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('.statistic__filters-input')
      .forEach((input) => input.addEventListener('click', this._onClickStatisticsBtn));
  }

  _drawChart() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }

    const container = this.getElement().querySelector('.statistic__chart');
    this._genresChart = renderChart(container, this._state);
  }

  _onStatisticPeriods(evt) {
    if (evt.target.value === this._state.currentInput) {
      return;
    }

    this.updateState(
      {
        dateFrom: (() => {
          const typeOfTime = evt.target.value;
          return dayjs().subtract(1, typeOfTime).toDate();
        })(),
        currentInput: evt.target.value,
      },
    );
  }

  restoreAllHandlers() {
    this._drawChart();
    this._setInnerHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this._genresChart !== null) {
      this._genresChart = null;
    }
  }
}
