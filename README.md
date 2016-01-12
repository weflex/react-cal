#react-cal

React Calendar Component

## Build
```sh
npm i && npm run build
```

## Example
the example is listening on `http://localhost:8008`
```sh
npm start
```

## Usage

```js
// define your card template for rendering the schedule event
class Template extends React.Component {
  render() {
    return (
       <div />Hello Wold </div>
    );
  } 
}

<Calendar 
  date={Date.now()}
  schedule={schedule}
  cardTemplate={Template}
  cellHeight={50}
/>
```

### property

`date` : set up current week date

`schedule`: set up your schedule

`cardTemplate`: set your self defined event view

`cellHeight`: set up as table cell height 

### schedule
the `schedule` property should be an ES6 Map instance. and its key is an string that concat the `weekBeign` and `weekEnd`, such as `20160111-20160117`

here is an exmaple for set up schedule
```js
let classInfo = [{
  date: Date.now(),
  from: "12:30",
  to: "14:00",
  spots: "yoga",
  trainer: 'Simon'
}
let daySchedule = new Map();
let weekSchedule = new Map();
let allSchedule = new Map();

daySchedule.set("12", classInfo); // one day schedule 
weekSchedule.set("2", daySchedule);// one week schedule and have schedule event Tuesday
allSchedule.set("20160111-20160117", weekSchedule);// all week schedule, use its weekBeing and weekEnd as the key of schedule

ReactDOM.render(<Calendar schedule={allSchedule} />, element);
```
