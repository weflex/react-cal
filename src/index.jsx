/* TODO 将schedule从table分离, 从业务层传入classViews
classViews : {
 from : time,
 Card: Card,
}
*/
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './index.css'

let DAYHOUR = 24;
let WEEKDAY = 7;

function getWeek(date, format) {
  let weekDate = {};

  weekDate.begin = getWeekBegin(date, format);
  weekDate.end = getWeekEnd(date, format);
  return weekDate;
}

function getWeekEnd(date, formatString) {
  return date.endOf('isoWeek').format(formatString);
}

function getWeekBegin(date, formatString) {
  return date.startOf('isoWeek').format(formatString);
}

function range(start, end) {
  if (!end) {
    end = start;
    start = 0;
  }
  let c = [];
  while(end > start){c[start++] = start} //1...end

  return c;
}

function TableHeader(props) {
  let header = [] ,
    dayMap = {
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周日',
  };

  header.push(
    <li key={'header-time'} className='header-index'>时间</li>
  );

  for (let key of Object.keys(dayMap)) {
    header.push(
      <li key={key}>{key} {dayMap[key]}</li>
    );
  }

  return (
    <ul className='table-header'>{header}</ul>
  );
}

function Cards(props) {
  let cards = props.cardsInfo.map(function (card) {
    var cardView = props.cardTemplate(card);
    return cardView;
  });

  return (
    <div className='cards'>
      {cards}
    </div>
  );
}

class ScheduleTable extends React.Component {
  constructor(props) {
    super(props);
    this.weekSchedule = props.weekSchedule;
    this.cardTemplate = props.cardTemplate;
    this.cellHeight = props.cellHeight;
  }

  componentWillUpdate(nextProps) {
    this.weekSchedule = nextProps.weekSchedule;
    this.cardTemplate = nextProps.cardTemplate;
    this.cellHeight = nextProps.cellHeight;
  }

  renderCards(cardsInfo, index) {
    let style = {height: this.cellHeight}; 

    return (
      <li key={index} style={style}>
        <Cards cardsInfo={cardsInfo} cardTemplate={this.cardTemplate}/>
      </li> 
    );
  }

  getCards(daySchedule, hourIndex) {
    let style = {height: this.cellHeight}; 
    if (daySchedule) {
      let cardsInfo = daySchedule.get(hourIndex.toString());
      if (cardsInfo) {
        return this.renderCards(cardsInfo, hourIndex);
      }
    }
    return <li key={hourIndex} style={style}></li>
  }

  getHourAxis() {
    let style = {
      li: {
        height: this.cellHeight + 1,
        lineHeight: parseInt(this.cellHeight + 1) + 'px'
      },
      ul: {
        marginTop: DAYHOUR
      }
    }
    let col = range(DAYHOUR).map(function (value, index) {
      return <li key={index} style={style.li}>{ value === DAYHOUR ? '' : `${value}:00`}</li>
    });

    col.pop();

    return (
      <ul  key={'hour-axis'} className='hour-axis' style={style.ul}>
        {col}
      </ul>
    );
  }

  getTableColumn(weekSchedule, dayIndex) {
    let daySchedule = weekSchedule.get(dayIndex.toString()),
        col = range(DAYHOUR).map(function (value, hourIndex) {
      return this.getCards(daySchedule, hourIndex);
  }, this);

    return (
      <ul  key={dayIndex}>
        {col}
      </ul>
    );
  }

  getTableBody() {
    let tableBody = [],
        hourAxis = this.getHourAxis();

    tableBody.push(hourAxis);
    for (let i = 1; i <= WEEKDAY; ++i) {
      let col = this.getTableColumn(this.weekSchedule, i);
      tableBody.push(col);
    }

    return tableBody;
  }

  render() {
    let tableBody = this.getTableBody(),
        style = {height: window.innerHeight - 100}; 

    return (
      <div className='schedule-table' style={style}>
        {tableBody}
      </div>
    );
  }
}

class WeekHeader extends React.Component {
  constructor(props) {
    super(props);
    this.currentDate = props.currentDate;
    this.setDate = props.setDate;
    this.scrollBarWidth = props.scrollBarWidth;
  }

  goPrevWeek() {
    this.setDate(this.currentDate.subtract(7, 'days'));
  }

  goNextWeek() {
    this.setDate(this.currentDate.add(7, 'days'));
  }

  render() {
    let weekDate = getWeek(this.currentDate, 'M[月]D[日]');

  let style = {
    width: this.scrollBarWidth,
  }

  let scrollDiv = <div style={style} className='scroll-div'></div>
    return (
      <div className='week-header'>
        <div className='selector'>
          <button className='go-prev-btn' 
            onClick={this.goPrevWeek.bind(this)}> prev
          </button>
          <span>{weekDate.begin} - {weekDate.end}</span>
          <button className='go-next-btn' 
            onClick={this.goNextWeek.bind(this)}> next
          </button>
        </div>
        <TableHeader scrollBarWidth={this.scrollBarWidth}/>
        {scrollDiv}
      </div>
    );
  }
}

class Calendar extends React.Component {
  constructor(props) {
    super(props); 
    let currentDate       = moment(props.date),
      weekDate            = getWeek(currentDate, 'YYYYMMDD'),
      currentWeekSchedule = props.schedule.get(`${weekDate.begin}-${weekDate.end}`) || new Map();

    this.state = {
      allSchedule: props.schedule,
      currentDate: currentDate,
      currentWeekSchedule: currentWeekSchedule,
      cardTemplate: props.cardTemplate,
      cellHeight: props.cellHeight || 40,
    };

    this.scrollBarWidth = 15;
  }

  setCurrentDate(date) {
    let weekDate = getWeek(date, 'YYYYMMDD');
    let currentWeekSchedule = this.state.allSchedule.get(`${weekDate.begin}-${weekDate.end}`) || new Map();
    this.setState({currentDate: date, currentWeekSchedule: currentWeekSchedule});
  }

  render() {
    return (
      <div className='calendar'>
        <WeekHeader 
          currentDate={this.state.currentDate}
          setDate={this.setCurrentDate.bind(this)}
          scrollBarWidth={this.scrollBarWidth}/>
        <ScheduleTable 
          weekSchedule={this.state.currentWeekSchedule}
          cardTemplate={this.state.cardTemplate}
          cellHeight={this.state.cellHeight}
          />
      </div>
    );
  }
};

module.exports = Calendar;
