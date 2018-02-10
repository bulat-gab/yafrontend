/**
 * @param {String} date
 * @returns {Object}
 */

_formats = ['months', 'days', 'hours', 'minutes']

_date = {
    _value: '',
    add: function(val, format){
        if(val < 0 || !_formats.includes(format))
            throw new TypeError('Wrong date value or format');

         
        
        switch(format){
            case 'months':
                this._value.setMonth(this._value.getMonth() + val);
                break;
            case 'days':
                this._value.setDate(this._value.getDate() + val);
                break;
            case 'hours':
                this._value.setHours(this._value.getHours() + val);
                break;
            case 'minutes':
                this._value.setMinutes(this._value.getMinutes() + val)
                break;
        }

         
        return this;
    }
    ,
    subtract: function(val, format){
        if(val < 0 || !_formats.includes(format))
            throw new TypeError('Wrong date _value or format');

         
        
        switch(format){
            case 'months':
                this._value.setMonth(this._value.getMonth() - val);
                break;
            case 'days':
                this._value.setDate(this._value.getDate() - val);
                break;
            case 'hours':
                this._value.setHours(this._value.getHours() - val);
                break;
            case 'minutes':
                this._value.setMinutes(this._value.getMinutes() - val)
                break;
        }   

         

        return this;
    }
}

module.exports = function (date) {

    _date._value = new Date(date)

    Object.defineProperty(_date, 'value', {
        get: function(){
            minutes = ''
            month = 1 + this._value.getMonth()
            if(month < 10)
                month = '0' + month
            if(this._value.getMinutes() < 10)
                minutes = '0' + this._value.getMinutes()

            return this._value.getFullYear() + '-' +  month + '-' 
                + this._value.getDate() + ' ' + this._value.getHours() + ':' 
                + minutes
        }
    })

    return _date
};
