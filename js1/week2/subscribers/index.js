
var list = []


function _arePropertiesEqual(first, second){
    return  JSON.stringify(Object.getOwnPropertyNames(first)) 
    === JSON.stringify(Object.getOwnPropertyNames(second))
}

module.exports = {
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {

        var obj = {
            ev: event,
            sub: subscriber,
            hand: handler
        };
        list.push(obj)
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        for(var i = 0; i < list.length; i++){
            if(list[i].ev === event 
                && _arePropertiesEqual(list[i].sub, subscriber)){
                    list.splice(i, 1)
                    --i;
                }
        }
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        for(var i = 0; i < list.length; i++){
            var obj = list[i]

            obj.hand.call(obj.sub)

        }
        return this;
    },

    getList: list
};
