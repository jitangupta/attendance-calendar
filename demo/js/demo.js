var cal_container = document.getElementById('calender_container');
var data = '';
loadJSON(function(response){
    data = JSON.parse(response);
});

//Initialize Calendar
var calendar = new AttendanceCalendar(cal_container,data.month,data.year,data.month_index,data.attendance);
//Create Calendar
calendar.Create();


//Function for reading JSON file
function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', 'demo/demo-data.json', false); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}