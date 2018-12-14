var cal_container = document.getElementById('calender_container');
var data = '';
loadJSON(function(response){
    data = JSON.parse(response);
    console.log(data);
});

//Initialize Calendar
var calendar = new AttendanceCalendar(cal_container,data.month,data.year,data.month_index,data.attendance);
//Create Calendar
calendar.Create();


//Function for reading JSON file
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "demo/demo-data.json", false);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
