/**
 * @param {Array} collection
 * @returns {Array}
 */
function copyCollection(collection) {
    var newCollection = [];

    for (var i = 0; i < collection.length; i++) {
        var newObject = Object.assign({}, collection[i]);
        newCollection.push(newObject);
    }

    return newCollection;
}

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var newCollection = copyCollection(collection);
    var filters = [];
    var selects = [];
    var operations = [];

    for (var i = 1; i < arguments.length; i++) {
        var name = String(arguments[i]).match(/function ([a-zA-Z]+)[(]/);
        if (!name) continue;
        switch (name[1]) {
            case 'select':
                selects.push(arguments[i]);
                break;
            case 'filterIn':
                filters.push(arguments[i]);
                break;
            default:
                break;
        }
    }

    operations = filters.concat(selects);

    for (var i = 0; i < operations.length; i++) {
        newCollection = operations[i](newCollection);
    }

    return newCollection;
}

/**
 * @params {String[]}
 */
function select() {
    var fields = [];
    for (var i = 0; i < arguments.length; i++) {
        fields.push(arguments[i]);
    }

    return function select(collection) {
        var newCollection = [];

        for (var i = 0; i < collection.length; i++) {
            newCollection = pushIfEqualNameOfField(newCollection, collection[i], fields);
        }

        return newCollection;
    }
}

function pushIfEqualNameOfField(collection, sourceObject, fields) {
    var newObject = {};

    for (var i = 0; i < fields.length; i++) {
        var nameOfField = String(fields[i]);

        if (!(nameOfField in sourceObject)) {
            continue;
        }

        var typeOfValue = typeof sourceObject[nameOfField];

        switch (typeOfValue) {
            case 'string':
                newObject[nameOfField] = String(sourceObject[nameOfField]);
                break;
            case 'number':
                newObject[nameOfField] = Number(sourceObject[nameOfField]);
                break;
            default:
                break;
        }
    }

    if (Object.keys(newObject).length > 0) {
        collection.push(newObject);
    }

    return collection;
}

/**
 * 
 * @param {Array} collection 
 * @param {Object} sourceObject 
 * @param {Number || String} value 
 * @param {Array} values 
 * @returns {Array} collection 
 */
function pushIfEqualValue(collection, sourceObject, value, values) {
    for (var i = 0; i < values.length; i++) {
        var typeOfValue = typeof values[i];

        switch (typeOfValue) {
            case 'string':
                if (String(value) === String(values[i])) {
                    collection.push(Object.assign({}, sourceObject));
                }
                break;
            case 'number':
                if (Number(value) === Number(values[i])) {
                    collection.push(Object.assign({}, sourceObject));
                }
                break;
            default:
                break;
        }
    }
    return collection;
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function filterIn(collection) {
        var newCollection = [];

        for (var i = 0; i < collection.length; i++) {
            if (!(property in collection[i])) continue;

            var value = collection[i][property];

            newCollection = pushIfEqualValue(newCollection, collection[i], value, values);
        }
        
        return newCollection;
    }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
