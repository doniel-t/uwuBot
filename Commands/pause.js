const Music = require('./Music.js');

/**
 * @usage !pause
 * @does pauses current Song
 */
module.exports = {
    pause: function () {

        Music.pause(); //All Logic is in Music
    }
}
