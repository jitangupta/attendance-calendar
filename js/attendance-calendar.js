function AttendanceCalender(data, month, year, month_index) {
    //Create Calender Table
    var $table = $("<table>", { id: "calender", "class": "attendance-calendar" });

    //Append in Container
    $('#calender_container').html('').append($table);
    $table = $('#calender');

    //Prepare month details as heading
    var month_detailRow = "<tr><td colspan='7' class='calender-for-month'>" + month + "&nbsp;"+year+"</td></tr>";
    $table.append(month_detailRow);

    //Prepare week days
    var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var weekdaysRow = $("<tr>");
    $.each(weekdays, function (key, week_day) {
        weekdaysRow.append("<th class='week-days'>" + week_day + "</th>");
    });
    $table.append(weekdaysRow);

    //Prepare calender per day
    var counter = 0;
    //Loop for maximum 
    for (var i = 0; i < 6; i++) {
        //Calendar Row
        var $cal_row = $("<tr>");
        for (var j = 0; j < 7; j++) {

            //Select first day
            var day = data[counter];

            var $td = $("<td>", { "class": "day" });
            //For matching the first day to display

            if (day !== null) {
                var dayInList = false;

                if (day.weekDay === weekdays[j]) {
                    var detail_table = $("<table>", { "class": "details" });
                    //Day & Tag
                    var dateTag = "<tr><td class='date'>" + day.day + "</td><td class='tag'>" + day.tag + "</td></tr>";
                    detail_table.append(dateTag);

                    //In Time
                    var in_time = '';
                    if (day.inTime !== "00.00") {
                        in_time = "<tr><td class='in' colspan='2'>&gt; " + day.inTime + "</td></tr>";
                        detail_table.append(in_time);
                    } else {
                        in_time = "<tr><td class='in' colspan='2'>&nbsp;</td></tr>";
                        detail_table.append(in_time);
                    }

                    //Out Time
                    var out_Time
                    if (day.outTime !== "00.00") {
                        out_Time = "<tr><td class='out' colspan='2'>&lt; " + day.outTime + "</td></tr>";
                        detail_table.append(out_Time);
                    } else {
                        out_Time = "<tr><td class='out' colspan='2'>&nbsp;</td></tr>";
                        detail_table.append(out_Time);
                    }

                    //Check Present date

                    var today = new Date();
                    if (today.getDate() === day.day && today.getMonth() === month_index && today.getFullYear() === year) {
                        $td.addClass('today');
                    }

                    $td.append(detail_table);

                    counter++;
                    dayInList = true;

                }

                //Check sunday | WOFF | H
                if ((weekdays[j] === "Sun" && !dayInList) || day.tag === "WOFF" || day.tag === "H") {
                    $td.addClass("holiday");
                }
            } else {
                if (weekdays[j] === "Sun") {
                    $td.addClass("holiday");
                }
            }

            $cal_row.append($td);
        }

        $table.append($cal_row);
    }
}