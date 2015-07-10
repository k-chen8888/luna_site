var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdays_short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months = [ ['Jan ', 'January'], ['Feb ', 'February'], ['Mar ', 'March'], ['Apr ', 'April'], ['May', 'May'], ['Jun ', 'June'], ['Jul ', 'July'], ['Aug ', 'August'], ['Sep ', 'September'], ['Oct ', 'October'], ['Nov ', 'November'], ['Dec ', 'December'] ],
    cal = null;


/**
 * A block in the calendar
 * Generally has a class and content
 * Location refers to thead or tbody
 */
function block(l, be) {
    
    'use strict';
    
    var exports = {};
    exports.parent_class = "none";
    exports.blockElem = be;
    exports.location = l;
    
    return exports;
    
}


/**
 * Calendar class
 */
function calendar(ct) {
    
    var exports = {};
    exports.parent_class = "none";
    
    
    // Load Data
    exports.calTable = ct;
    exports.header = [];
    exports.rows = [];
    exports.getTableElements = function () {
        
        var iscurrent = false;
        
        
        // Get thead data
        exports.calTable.find('thead tr').each(function (rowIndex, r) {
            var headcols = [];
            $(this).find('th,td').each(function (colIndex, c) {
                var b = block("head", $(c));
                headcols.push(b);
            });
            exports.header.push(headcols);
        });
        
        // Get tbody data
        exports.calTable.find('tbody tr').each(function (rowIndex, r) {
            var bodycols = [];
            $(this).find('th,td').each(function (colIndex, c) {
                var b = block("body", $(c));
                bodycols.push(b);
            });
            exports.rows.push(bodycols);
        });
        
    };
    
    // Calendar options
    exports.set_style = function () {
        // Set the style of the whole calendar
        
        // Get and adjust date
        var fulldate = new Date(),
            firstDay = new Date(fulldate.getFullYear(), fulldate.getMonth(), 1),
            y = exports.header[0][1].blockElem.text().substring(exports.header[0][1].blockElem.text().length - 4, exports.header[0][1].blockElem.text().length), // Last 4 characters make up the year
            m = exports.header[0][1].blockElem.text().substring(0, 4),
            i = 0,
            j = 1,
            today = [Math.floor(fulldate.getDate() / 7) + 1, fulldate.getDay()]; // [week, day]
        
        if (firstDay.getDay() >= today[1]) { // Adjust for offset of the first day of the month
            today[0] += 1;
        }
        
        // Set today class on today's date
        if (parseInt(y, 10) === fulldate.getFullYear() && (months[firstDay.getMonth()][0] === m || months[firstDay.getMonth()][1].substr(0, 4) === m)) {
            exports.rows[today[0]][today[1]].blockElem.addClass('today');
        }
        
        for (i = 0; i < 12; i += 1) {
            if (months[i][0].toLowerCase() === m.toLowerCase()) {
                break;
            }
        }
        
        // Background
        exports.calTable.css({
            "border-radius": "10px",
            "background": "rgba(255,255,255,0.4)",
            "padding-top": "12px",
            "padding-bottom": "12px",
            "padding-left": "5px",
            "padding-right": "5px"
        });
        
        // Header
        exports.header.forEach(function (row, index) {
            row.forEach(function (b, index) {
                if (index === 1) {
                    b.blockElem.css({
                        "width": "75%",
                        "width": "-moz-calc(600%/8)",
                        "width": "-webkit-calc(600%/8)",
                        "width": "calc(600%/8)"
                    });
                    if (i < 12) {
                        b.blockElem.text(months[i][1] + " " + y);
                    }
                } else {
                    b.blockElem.css({
                        "width": "12.5%",
                        "width": "-moz-calc(100%/8)",
                        "width": "-webkit-calc(100%/8)",
                        "width": "calc(100%/8)"
                    });
                }
            });
        });
        
        // Body
        exports.rows.forEach(function (row, index) {
            if (index === 0) { // Expand to full names
                row.forEach(function (b, index) {
                    if ($(window).width() <= 727) {
                        b.blockElem.text(weekdays_short[index]);
                    } else {
                        b.blockElem.text(weekdays[index]);
                    }
                });
            } else if (index === 6) { // Add borders in between each cell on th bottom row
                row.forEach(function (b, index) {
                    if (index !== 6) {
                        b.blockElem.css({
                            "border-right": "1px solid rgb(192, 192, 192)"
                        });
                    }
                });
            } else { // For all other cells, add right and bottom borders
                row.forEach(function (b, index) {
                    if (index !== 6) {
                        b.blockElem.css({
                            "border-right": "1px solid rgb(192, 192, 192)",
                            "border-bottom": "1px solid rgb(192, 192, 192)"
                        });
                    } else { // The last column doesn't get a right border
                        b.blockElem.css({
                            "border-bottom": "1px solid rgb(192, 192, 192)"
                        });
                    }
                });
            }
            
            row.forEach(function (b, index) {
                b.blockElem.text(b.blockElem.text().trim());
                b.blockElem.css({
                    "padding-top": "12px",
                    "padding-bottom": "12px",
                    "padding-left": "0px",
                    "padding-right": "0px",
                    "width": "14.28%",
                    "width": "-moz-calc(100%/7)",
                    "width": "-webkit-calc(100%/7)",
                    "width": "calc(100%/7)",
                });
            });
        });
        
        // Confirms that the style was set
        exports.is_styled = true;
    };
    exports.set_date_style = function (row, column) {
        // Set the style for specific calendar elements
        // Indexed by row, column in exports.data
    };
    exports.change_view = function () {
        // Toggle between weekly view and monthly view on screen resize
    };
    
    
    return exports;
    
}


$(document).ready(function () {
    
    'use strict';
    
    // Activate the calendar if the plugin is present
    if ($('.em-calendar').length) {
        
        cal = calendar($('.em-calendar'));
        cal.getTableElements();
        
        // Set style
        cal.set_style();
        
        // Watchdog function for reloading calendar styles
        calendar_watch(cal.calTable[0]);
        
        // Listen for screen size changes and adjust calendar
        window.addEventListener('resize', cal.change_view(), false);
    } else {
        
    }
    
});


// Watchdog function that refreshes the calendar every .1 seconds if the DOM object becomes asynchronized
function calendar_watch(table) {
    var t = table;
    
    if (t !== $('.em-calendar')[0]) {
        cal = calendar($('.em-calendar'));
        cal.getTableElements();
        cal.set_style();
        t = cal.calTable[0]; // Set the newly found DOM object as the basis for comparison
    }
    
    setTimeout(function () {calendar_watch(t);}, 100);
}
