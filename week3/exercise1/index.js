/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    var regDate = date.match(/([\d]{4})-([\d]{2})-([\d]{2}) ([\d]{2}):([\d]{2})/);
    var year = Number(regDate[1]);
    var month = Number(regDate[2]) - 1;
    var day = Number(regDate[3]);
    var hour = Number(regDate[4]);
    var minute = Number(regDate[5]);
    
    this.d = new Date(Date.UTC(year, month, day, hour, minute));
    this.value = getValue();

    this.add = function(count, mesure) {
        if (count < 0) throw new TypeError('Отрицательное значение!');
        var c = Number(+count);
        setNewDate(c, mesure);
        this.value = getValue();
        return this;
    }
    this.subtract = function(count, mesure) {
        if (count < 0) throw new TypeError('Отрицательное значение!');
        var c = Number(-count);
        setNewDate(c, mesure);
        this.value = getValue();
        return this;
    }

    function getValue() {
        var y = Number(this.d.getUTCFullYear());
        var m = Number(this.d.getUTCMonth()) + 1;
        var d = Number(this.d.getUTCDate());
        var th = Number(this.d.getUTCHours());
        var mh = Number(this.d.getUTCMinutes());

        function str(value) {
            if (value < 10) value = '0' + value;
            return value;
        }

        return y + '-' + str(m) + '-' + str(d) + ' ' + str(th) + ':' + str(mh);
    }

    function setNewDate(count, mesure) {
        switch (mesure) {
            case 'years':
                setYear(count);
                break;
            case 'months':
                setMonth(count);
                break;
            case 'days':
                setDay(count);
                break;
            case 'hours':
                setHour(count);
                break;
            case 'minutes':
                setMinute(count);
                break;
            default:
                throw new TypeError('Неверная еденица измерения!');
                break;
        }
    }

    function setYear(year) {
        this.d.setUTCFullYear(this.d.getUTCFullYear() + year);
    }
    function setMonth(month) {
        this.d.setUTCMonth(this.d.getUTCMonth() + month);
    }
    function setDay(day) {
        this.d.setUTCDate(this.d.getUTCDate() + day);
    }
    function setHour(hour) {
        this.d.setUTCHours(this.d.getUTCHours() + hour);
    }
    function setMinute(minute) {
        this.d.setUTCMinutes(this.d.getUTCMinutes() + minute);
    }

    return this;
};

