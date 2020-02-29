const Music = require('./Music.js');

module.exports = {
    shutdown: function(message, bot) { //Plays winXP shutdown. in Voicechannel

        message.content = '!play https://www.youtube.com/watch?v=Gb2jGy76v0Y';
        Music.play(message, bot);
    }
}