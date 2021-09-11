import SmartView from './smart';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  getOfferCost,
  getOfferCount,
  getMapResult,
  getOffersCollection,
  getOfferTime
} from '../utils/statistics';
import {formatDayHourMinute} from '../utils/event';
import {BAR_HEIGHT} from '../const';

const renderMoneyChart = (moneyCtx, offersType, offersPrice) => new Chart(moneyCtx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: offersType,
    datasets: [{
      data: offersPrice,
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: (val) => `€ ${val}`,
      },
    },
    title: {
      display: true,
      text: 'MONEY',
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 44,
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
        minBarLength: 50,
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

const renderTypeChart = (typeCtx, offersType, offersCount) => new Chart(typeCtx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: offersType,
    datasets: [{
      data: offersCount,
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: (val) => `${val}x`,
      },
    },
    title: {
      display: true,
      text: 'TYPE',
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 44,
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
        minBarLength: 50,
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

const renderTimeChart = (timeCtx, offersType, offersTime) => new Chart(timeCtx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: offersType,
    datasets: [{
      data: offersTime,
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: (val) => `${formatDayHourMinute(val)}`,
      },
    },
    title: {
      display: true,
      text: 'TIME',
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 44,
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
        minBarLength: 50,
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


const createStatisticksTemplate = () => (`<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
          </div>
        </section>`);

class Statistics extends SmartView {
  constructor(events) {
    super();
    this._events = events;
    this._setCharts();
  }

  getTemplate() {
    return createStatisticksTemplate();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const offersType = [...getOffersCollection(this._events)];
    const allTypes = [...getOffersCollection(this._events, true)];
    const offersCost = getMapResult(this._events, offersType, getOfferCost);
    const offersCount = getMapResult(this._events, allTypes, getOfferCount);
    const offersTime = getMapResult(this._events, allTypes, getOfferTime);

    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    moneyCtx.height = BAR_HEIGHT * offersType.length;
    typeCtx.height = BAR_HEIGHT * allTypes.length;
    timeCtx.height = BAR_HEIGHT * allTypes.length;

    this._moneyChart = renderMoneyChart(moneyCtx, offersType, offersCost);
    this._typeChart = renderTypeChart(typeCtx, allTypes, offersCount);
    this._timeChart = renderTimeChart(timeCtx, allTypes, offersTime);
  }
}

export default Statistics;
