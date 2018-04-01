var HOURS_PER_DAY = 24;
var MINUTES_PER_HOUR = 60;

/**
 * 
 * @param {Number} n
 * @returns {String}
 */

function coorectLength(n) {
    n = n + '';
    if (n.length === 1) {
        n = '0' + n;
    }

    return n;
}

/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    var iHours = Math.floor(interval / MINUTES_PER_HOUR);
    var iMinutes = interval - (iHours * MINUTES_PER_HOUR);

    var m = minutes + iMinutes;
    if (m >= MINUTES_PER_HOUR) {
        m = m - MINUTES_PER_HOUR;
        iHours++;
    }

    var h = hours + iHours;

    if (h > 23) {
        h = h - (Math.floor(h / HOURS_PER_DAY) * HOURS_PER_DAY);
    }

    m = coorectLength(m);
    h = coorectLength(h);
    
    return h + ':' + m;
};
