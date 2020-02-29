const Music = require('./Music.js');

module.exports = {
    padoru: function(message,bot) { //Plays Padoru in VoiceChannel
        message.channel.send("HASHIRE SORIYO KAZE NO YOU NI TSUKIMIHARAWO PADORU PADORU");

        message.content = '!play https://www.youtube.com/watch?v=dQ_d_VKrFgM';
        Music.play(message,bot);
    }
}