/**
 * @param {Number} a Первое слагаемое
 * @param {Number} b Второе слагаемое
 * @returns {Number}
 */
module.exports = function (a, b) {
    /* if(!'/^(\-|\+)?([0-9]+|Infinity)$/'.test(a)
     || !'/^(\-|\+)?([0-9]+|Infinity)$/'.test(b))
     return NaN */
    var numA = Number(a)
    var numB = Number(b)
    if(numA == NaN || numB == NaN) 
        return NaN; 
    return numA + numB;
    //return Number(a) + Number(b);
};
