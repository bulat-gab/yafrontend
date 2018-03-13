module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */

function Collection() {
    if(arguments[0] !== undefined){
        this.data = arguments[0]
    }
    else {
        this.data = []
    }
}


// Методы коллекции
Collection.prototype.values = function () {
    return this.data
};
// другие методы

Collection.prototype.append = function () {
    if(arguments[0] instanceof Collection){
        this.data = this.data.concat(arguments[0].data)
    }
    else {
        this.data.push(arguments[0])
    }
};
Collection.prototype.at = function () {
    var index = arguments[0]

    return index > 0 ? this.data[index-1] : null
};
Collection.prototype.removeAt = function () {
    var index = arguments[0]

    if(index <= 0 || index > this.data.length)
        return false

    this.data.splice(index-1, 1)
    return true
};

Collection.prototype.count = function () {
    return this.data.length
};

/**
 * Создание коллекции из массива значений
 */
Collection.from = function () {
    return new Collection(arguments[0])
};
