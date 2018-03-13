/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    var results = [];
    var errors = '';

    for (const op of operations) {
        op(next)

        results.push(tmp[1])
        errors = err
    }


    callback(errors, resutls)
};

var tmp = [];

var next = function(err, data) {

    this.tmp = [err, data]
    return [err, data]
}