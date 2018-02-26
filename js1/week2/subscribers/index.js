
var list = []

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

       /*  console.log('On: ');
        console.log(list) */
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        console.log('Before Off: ')
        console.log(list)

        for(var i = 0; i < list.length; i++){
            console.log("Iter #" + i)
            console.log(list[i].sub == subscriber)
            console.log(list[i].ev)
            console.log(list[i].sub)

            if(list[i].ev === event && list[i].sub == subscriber)
                list.splice(i, 1)
        }

        console.log('Off: ')
        console.log(list)
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

        /* console.log('Emit: ');
        console.log(list) */
        return this;
    },

    getList: list
};
