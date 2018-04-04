// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    var commands = command.split(' ');
    var commandName = commands[0];

    if (commandName === 'ADD') {
        var name = commands[1];
        var phone = commands[2];

        return addContact(name, phone);
    }
    if (commandName === 'REMOVE_PHONE') {
        var phone = commands[1];

        return removePhone(phone);
    }
    if (commandName === 'SHOW') {
        return showContacts();
    }
};
/**
 * 
 * @param {String} phone 
 * @returns {*} true, false
 */
function removePhone(phone) {
    var flag = false;
    Object.keys(phoneBook).forEach(function (name) {
        var index = phoneBook[name].indexOf(phone);
        if (index !== -1) {
            phoneBook[name].splice(index, 1);

            if(phoneBook[name].length === 0)  delete phoneBook[name];
            flag = true;
        }
    });

    return flag;
}

function showContacts() {
    if (!phoneBook.hasOwnProperty('show')) {
        Object.defineProperty(phoneBook, 'show', {
            enumerable: false,
            configurable: false,
            get: function() {
                function toSort(a, b) {
                    return a.toLowerCase() > b.toLowerCase()
                }
                function addPhones(name) {
                    return name + ': ' + phoneBook[name].join(', ');
                }
                return Object.keys(this)
                        .sort(toSort)
                        .map(addPhones);
            },
            set: function() {}
        })
    }

    return phoneBook['show'];
}

function addContact(name, phones) {
    if (!phoneBook.hasOwnProperty(name)) {
        Object.defineProperty(phoneBook, name, {
            enumerable: true,
            configurable: true,
            value: phones.split(','),
            writable: true
        })
    } else {
        phoneBook[name] = phoneBook[name].concat(phones.split(','));
    }
}
