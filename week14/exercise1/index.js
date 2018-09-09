module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    this._collection = [];
}


// Методы коллекции
Collection.prototype.values = function () {
    return this._collection.slice();
};
Collection.prototype.count = function () {
    return this._collection.length;
};
Collection.prototype.at = function (index) {
    if (this._collection.length >= index) {
        return this._collection[index - 1];
    } else {
        return null
    }
};
Collection.prototype.removeAt = function (index) {
    if (this._collection.length >= index && this._collection[index - 1] !== undefined) {
        this._collection.splice(index - 1, 1);
        return true;
    } else {
        return false
    }
};
Collection.prototype.append = function (value) {
    if (typeof value === 'object') {
        Collection.prototype._join.call(this, value.values());
    } else {
        this._collection.push(value);
    }
}
// другие методы
Collection.prototype._join = function (collection) {
    this._collection = this._collection.concat(collection);
}


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (items) {
    var collection = new Collection();

    collection._join(items);

    return collection;
};
