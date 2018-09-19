/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    var results = [],
        count = 0;

    for (var i = 0; i < operations.length; i++) {
        var op = operations[i];
        var index = i;

        (function (i) {
            op(next);

            function next(err, data) {
                if (err === null) {
                    results[i] = data;
                    count++;
                } else {
                    callback(err, null);
                }
        
                if (count === operations.length) {
                    callback(null, results);
                }
            }
        })(i)
    }

    if (count === operations.length) {
        callback(null, results);
    }
};
