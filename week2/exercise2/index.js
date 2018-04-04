/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    var uniqueHastags = [];
    var hashtagsArr = [];

    hashtagsArr = hashtags.splice(' ');

    hashtagsArr.forEach(function (item, index) {
        var word = item.toLowerCase();

        // Через свойство объекта доступ будет быстрее
        // чем через indexOf по массиву. Тем не менее
        // я сделал через массив!
        if (uniqueHastags.indexOf(word) === -1) {
            uniqueHastags.push(word);
        }
    });


    return uniqueHastags.join(', ');
};
