const Music = require('./Music.js');

/**
 * @usage !stop
 * @does stops the Music
 * @Shortcut s
 */
module.exports = {
    stop: function () {

        Music.stop(); //All Logic is in Music
    }
}