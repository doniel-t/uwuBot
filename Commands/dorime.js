const Player = require('./play');

module.exports = {
    dorime: function (message,bot) { //Plays dorime. in Voicechannel

        message.channel.send("Dorime\nInterimo, adapare Dorime \nAmeno Ameno Latire \nLatiremo \nDorime.. ");

        message.content = 'https://www.youtube.com/watch?v=zQ4LiyFF8RU';
        Player.play(message,bot);
    }
}