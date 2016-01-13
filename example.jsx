'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const Calendar = require('./src/index.jsx');
const CELL_HEIGHT = 50;
require('babel-polyfill');
require('./src/index.css');

let classInfo = [
  {
    date: Date.now(),
    from: "12:30",
    to: "14:00",
    spots: "yoga",
    trainer: 'jkvim',
  },
];

let daySchedule = new Map();
let weekSchedule = new Map();
let allSchedule = new Map();
daySchedule.set("12", classInfo); // 每天的课程
weekSchedule.set("2", daySchedule);// 一周的课程, 周二有课
allSchedule.set("20160111-20160117", weekSchedule);// 所有的课程

function transferToPersent(number) {
  return number * 100 + '%'; 
}

function getTimeDuration(from, to) {
  let splitFrom = from.split(':'); 
  let splitTo = to.split(':'); 
  if (splitFrom.length !== 2 || splitTo.length !== 2) {
    return 0;
  }

  let fromHour = parseInt(splitFrom[0]);
  let fromMinute = parseInt(splitFrom[1]);
  let toHour = parseInt(splitTo[0]);
  let toMinue = parseInt(splitTo[1]);

  return (toHour - fromHour) * 60 + (toMinue - fromMinute);
}

function getGridHeight(from, to) {
  let duration = getTimeDuration(from, to);
  let borderHeight = Math.floor(duration / 60);
  let height = (duration / 60) * CELL_HEIGHT + borderHeight;
  return height;
}

function getTimeOffset(time) {
  return timeMinue;
}

function getGridOffset(from) {
  let timeSplit = from.split(':');
  if (timeSplit.length !== 2) {
    return 0;
  }

  let timeMinue = parseInt(timeSplit[1]);
  let offsetTop = timeMinue / 60 * CELL_HEIGHT;
  return offsetTop;
}

// 目前没有用上, 可以在同一时段有多个事件
function getCardWidth(length) {
  return (1 / length * 100) + '%';
}

function ClassCard(classInfo) {
  let from = classInfo.from;
  let to = classInfo.to;
  let height = getGridHeight(from, to);
  let top = getGridOffset(from);
  let width = getCardWidth(classInfo.length);
  let style = {
    backgroundColor: 'rgba(255, 179, 0, 0.28)',
    height: height,
    marginTop: top
  }

  function handleClick() {
    alert('click');
  }

  return (
    <div className='class-card' style={style} key={from} onClick={handleClick}>
      <p className='class-duration'>{from + '-' + to}</p>
      <p className='class-name'>{classInfo.spots}</p>
    </div>
  );
}

// 可以通过设置cellHeight, 方便在计算class-card的时候计算高度
(function () {
  ReactDOM.render(
    <Calendar 
      date={Date.now()} 
      schedule={allSchedule} 
      cardTemplate={ClassCard}
      cellHeight={CELL_HEIGHT}/>,
    document.getElementById('root-container'));
})();
