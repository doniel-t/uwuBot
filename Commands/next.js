const Music = require('./Music.js');

/**
 * @usage !next
 * @does skips the current Song
 */
module.exports = {
    next: function () {

        Music.next(); //All Logic is in Music
    }
}
