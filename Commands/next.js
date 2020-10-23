const Music = require('./Music.js');

/**
 * @usage !next
 * @does skips the current Song
 */
module.exports = {
    next: function (message) {
        Music.next(message); //All Logic is in Music
    }
}
