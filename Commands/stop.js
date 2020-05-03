const Music = require('./Music.js');

/**
 * @usage !stop
 * @does stops the Music
 * @Shortcut s
 */
module.exports = {
    stop: function (message) {

        Music.stop(message); //All Logic is in Music
    }
}