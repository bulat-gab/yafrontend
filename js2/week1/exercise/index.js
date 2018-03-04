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
    if(!(arguments[0] instanceof Collection))
         this.data.push(arguments[0])
};
Collection.prototype.at = function () {
    return Object.keys(this.content)[arguments[0]]
};
Collection.prototype.removeAt = function () {};

Collection.prototype.count = function () {
    return this.data.length
};

/**
 * Создание коллекции из массива значений
 */
Collection.from = function () {
    return new Collection(arguments[0])
};
