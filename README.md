# Attendance-Calendar

Attendance-calendar helps in displaying employees daily attendance data in calendar format.

Live Demo [here](https://jitangupta.github.io/attendance-calendar/)

### How to use

download package using npm
```
npm install attendance-calendar
```

reference the css and js file in your HTML document
```
 <link rel="stylesheet" href="node_modules/attendance-calendar/dist/css/attendance-calendar.css">
 <script src="node_modules/attendance-calendar/dist/js/attendance-calendar.min.js"></script>
```

create your HTML calendar container
```
<!--Attendance Calendar Container-->
<div id="calender_container" class="calender_container"></div>
```

now use as follows
```
//Get your data
var data = {};//JSON data
//Initialize Calendar
var calendar = new AttendanceCalendar(cal_container, data.month, data.year, data.month_index, data.attendance);
//Create Calendar
calendar.Create();
```
> You can find a sample json data [here](https://github.com/jitangupta/attendance-calendar/blob/master/demo/demo-data.json)

