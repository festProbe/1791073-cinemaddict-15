import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getStatistic } from '../../utils/common';
import { BAR_HEIGHT, Periods } from '../../utils/constants';
import Smart from '../smart';
dayjs.extend(duration);

const createStatsOfTimeTemplate = (currentPeriod) => {
  let temlate = '';
  Object.values(Periods).forEach((item) => temlate += `
  <input type="radio"
   class="statistic__filters-input visually-hidden"
    name="statistic-filter"
     id="statistic-${item}"
      value="${item}" ${currentPeriod === item ? 'checked' : ''}>
  <label for="statistic-${item}" class="statistic__filters-label">${item}</label>
  `);
  return temlate;
};

const calculateDuration = (films) => {
  let watchedFilmsDuration = 0;
  films.forEach((film) => watchedFilmsDuration += film.filmInfo.runTime);
  return `${Math.floor(dayjs.duration(watchedFilmsDuration, 'minutes').asHours())} <span class="statistic__item-description">h</span> ${watchedFilmsDuration - Math.floor(dayjs.duration(watchedFilmsDuration, 'minutes').asHours()) * 60} <span span class="statistic__item-description"> m</span>`;
};

const calculateStats = (state) => {
  const statsField = getStatistic(state);

  return `<ul class="statistic__text-list">
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">You watched</h4>
    <p class="statistic__item-text">${statsField.currentWatchedFilmsCount} <span class="statistic__item-description"> movies</span></p>
  </li >
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Total duration</h4>
    <p class="statistic__item-text"> ${calculateDuration(statsField.watchedFilmsByPeriod)}    </p >
  </li >
<li class="statistic__text-item">
  <h4 class="statistic__item-title">Top genre</h4>
  <p class="statistic__item-text">${statsField.topGenre}</p>
</li>
</ul>`;
};

const renderChart = (container, state) => {
  const statistic = getStatistic(state);

  container.height = BAR_HEIGHT * 9;

  return new Chart(container, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(statistic.genresStats),
      datasets: [{
        data: Object.values(statistic.genresStats),
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

const createStatisticTemplate = (state, userRank) => `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${userRank}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
    ${createStatsOfTimeTemplate(state.currentPeriod)}
  </form>

  ${calculateStats(state)}

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

  </section > `;

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
    this._setPeriodChangeClickHandler();
    this._drawChart();
  }

  getTemplate() { return createStatisticTemplate(this._state, this._userRank); }

  _drawChart() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }

    const container = this.getElement().querySelector('.statistic__chart');
    this._genresChart = renderChart(container, this._state);
  }

  _onStatisticPeriods(evt) {
    if (evt.target.value === this._state.currentPeriod) {
      return;
    }

    this.updateState(
      {
        dateFrom: (() => {
          const typeOfTime = evt.target.value;
          return dayjs().subtract(1, typeOfTime).toDate();
        })(),
        currentPeriod: evt.target.value,
      },
    );
  }

  _setPeriodChangeClickHandler() {
    this.getElement().querySelectorAll('.statistic__filters-input')
      .forEach((item) => item.addEventListener('change', this._onStatisticPeriods));
  }

  restoreHandlers() {
    this._drawChart();
    this._setPeriodChangeClickHandler();
  }

  removeElement() {
    super.removeElement();

    if (this._genresChart !== null) {
      this._genresChart = null;
    }
  }
}
