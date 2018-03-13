 /**
 * @param {Function[]} operations
 * @param {Function} callback
 */


module.exports = function (operations, callback) {
    if(operations.length === 0){
        callback(null, []) 
    }

    var result = [];
    var doneOperations = 0;
    var hasError = false;

   
    operations.forEach(function (operation, index) {
        operation(function next(err, data) {
            if (hasError) {
                return;
            }
            if (err) {
                callback(err);
                hasError = true;

                return;
            }
            result[index] = data;
            doneOperations++;

            if (doneOperations === operations.length) {
                callback(null, result);
            }
        });
    });
};