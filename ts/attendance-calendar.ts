class AttendanceCalendar {
    divContainer: HTMLDivElement;
    attendanceList: Array<Day>;
    day: Day;
    month: string;
    year: string;
    month_index: number;
    constructor(div: HTMLDivElement, month: string, year: string, month_index: number, source: Array<Day>) {
        this.divContainer = div;
        this.attendanceList = source;
        this.month = month;
        this.year = year;
        this.month_index = month_index;
    }

    public Create() {
        let attendanceTable = document.createElement("table");
        attendanceTable.className = "attendance-calendar";

        this.divContainer.append(attendanceTable);
        //Prepare month details as heading
        let month_detailRow = document.createElement("tr");
        month_detailRow.innerHTML = "<td colspan='7' class='calender-for-month'>" + this.month + "&nbsp;" + this.year + "</td>";
        attendanceTable.append(month_detailRow);

        //Prepare week days
        let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
        let weekDaysThead = "";
        weekdays.forEach(function (week_day) {
            weekDaysThead += "<th class='week-days'>" + week_day + "</th>";
        });
        let weekdaysRow = document.createElement("tr");
        weekdaysRow.innerHTML = weekDaysThead;
        attendanceTable.append(weekdaysRow);

        //Prepare calender per day
        let counter = 0;

        let today = new Date();
        let current_day = today.getDate() + "" + today.getMonth() + "" + today.getFullYear();
        today = null;

        //Loop for maximum 
        for (var i = 0; i < 6; i++) {
            //Calendar Row
            var cal_row = document.createElement("tr");
            for (var j = 0; j < 7; j++) {

                //Select first day
                this.day = this.attendanceList[counter];

                var td = document.createElement("td");
                td.classList.add("day");
                //For matching the first day to display

                if (this.day != null) {
                    var dayInList = false;

                    if (this.day.weekDay == weekdays[j]) {
                        var detail_container = document.createElement("div");
                        detail_container.classList.add("details");
                        var div_details = "";
                        //Day & Tag
                        div_details+= "<div class='date'>" + this.day.monthDay + "</div><div class='tag'>" + this.day.tag + "</div>";
                       

                        //In Time
                        if (this.day.inTime != "00.00") {
                            div_details += "<div class='in'>&gt; " + this.day.inTime + "</div>";
                           
                        } else {
                            div_details +="<div class='in'>&nbsp;</div>";
                            
                        }

                        //Out Time
                        if (this.day.outTime != "00.00") {
                            div_details +="<div class='out'>&lt; " + this.day.outTime + "</div>";
                           
                        } else {
                            div_details +="<div class='out' colspan='2'>&nbsp;</div>";
                        }

                        //Check Present date

                        if (current_day == this.day.monthDay + "" + this.month_index + "" + parseInt(this.year)) {
                            td.classList.add('today');
                        }

                        detail_container.innerHTML = div_details;
                        td.append(detail_container);

                        counter++;
                        dayInList = true;

                    }

                    //Check sunday | WOFF | H
                    if ((weekdays[j] == "Sun" && !dayInList) || this.day.tag == "WOFF" || this.day.tag == "H") {
                        td.classList.add("holiday");
                    }
                } else {
                    if (weekdays[j] == "Sun") {
                        td.classList.add("holiday");
                    }
                }

                cal_row.append(td);
            }

            attendanceTable.append(cal_row);
        }
    }
}

class Day {
    public monthDay: number;
    public weekDay: string;
    public tag: string;
    public inTime: string;
    public outTime: string;
}