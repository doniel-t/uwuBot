const Music = require('./Music.js');

module.exports = {
    play: function (message, bot) {

        Music.play(message,bot); //All Logic is in Music
    }
}
