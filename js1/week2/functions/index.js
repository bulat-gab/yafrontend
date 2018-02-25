/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var data = arguments[0];
    var toSelect = arguments[1];
    var toFilter = arguments[2];
    //var args = [].slice.call(arguments);
    var filtered = [];
    var results = [];

    // Filtering
    Object.keys(data).forEach(function(key) {
        var value = Object
        .getOwnPropertyDescriptor(data[key], toFilter[0]).value;

        if(toFilter[1].indexOf(value) >= 0){
            filtered.push(data[key]);
        }
    });


    // Selecting
    for (var i = 0; i < filtered.length; i++){
        var res = {};
        
        for(var property in toSelect){
            var propertyName = toSelect[property]

            Object.defineProperty(res, 
                propertyName, 
                Object.getOwnPropertyDescriptor(filtered[i], propertyName))
        }

        results.push(res);
    }
    return results
}

/**
 * @params {String[]}
 */
function select() {
    return arguments;
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return arguments;
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
