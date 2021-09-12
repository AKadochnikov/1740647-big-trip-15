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

const StatisticsConfig = {
  FORMAT_MONEY : (val) => `€ ${val}`,
  FORMAT_TYPE : (val) => `${val}x`,
  FORMAT_TIME : (val) => `${formatDayHourMinute(val)}`,
  MONEY_TEXT : 'MONEY',
  TYPE_TEXT : 'TYPE',
  TIME_TEXT : 'TIME',
  WHITE_COLOR : '#ffffff',
  BLACK_COLOR : '#000000',
  FONT_SIZE : 13,
  TITLE_FONT_SIZE : 23,
  PADDING : 5,
  BAR_THICKNESS : 44,
  MIN_BAR_LENGTH : 50,
};

const renderChart = (Ctx, offersType, offersData, format, statisticsText) => new Chart(Ctx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: offersType,
    datasets: [{
      data: offersData,
      backgroundColor: StatisticsConfig.WHITE_COLOR,
      hoverBackgroundColor: StatisticsConfig.WHITE_COLOR,
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: StatisticsConfig.FONT_SIZE,
        },
        color: StatisticsConfig.BLACK_COLOR,
        anchor: 'end',
        align: 'start',
        formatter: format,
      },
    },
    title: {
      display: true,
      text: statisticsText,
      fontColor: StatisticsConfig.BLACK_COLOR,
      fontSize: StatisticsConfig.TITLE_FONT_SIZE,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: StatisticsConfig.BLACK_COLOR,
          padding: StatisticsConfig.PADDING,
          fontSize: StatisticsConfig.FONT_SIZE,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: StatisticsConfig.BAR_THICKNESS,
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
        minBarLength: StatisticsConfig.MIN_BAR_LENGTH,
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

const createStatisticsTemplate = () => (`<section class="statistics">
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
    return createStatisticsTemplate();
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

    this._moneyChart = renderChart(moneyCtx, offersType, offersCost, StatisticsConfig.FORMAT_MONEY, StatisticsConfig.MONEY_TEXT);
    this._typeChart = renderChart(typeCtx, allTypes, offersCount, StatisticsConfig.FORMAT_TYPE, StatisticsConfig.TYPE_TEXT);
    this._timeChart = renderChart(timeCtx, allTypes, offersTime, StatisticsConfig.FORMAT_TIME, StatisticsConfig.TIME_TEXT);
  }
}

export default Statistics;
