/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    var hastags = [];

    hastags = tweet.split(' ')
                .filter(isHashtag)
                .map(inWord);

    return hastags;
};
/**
 * @param {String} word
 * @returns {String[]}
 */
function isHashtag(word) {
    if (word.indexOf('#') === -1) return false;
    else return true;
}
/**
 * @param {String} word
 * @returns {String}
 */
function inWord(word) {
    return word.slice(1);
}
