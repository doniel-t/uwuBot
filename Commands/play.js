const ytdl = require('ytdl-core-discord');

module.exports = {
    play: function (message, bot) {

        if (!message.author.lastMessage.member.voiceChannelID) {

            message.channel.send('Please join a VoiceChannel');
        } else {

            bot.channels.get(message.author.lastMessage.member.voiceChannelID).join().then(connection => {

                var url = message.content;  //Get YT Url

                play(connection, url).then(dispatcher => { //Throws error in console if url isnt valid
                    dispatcher.on('end', () => {
                        bot.channels.get(message.author.lastMessage.member.voiceChannelID).leave(); //Leave VC if finished
                    })
                })
            })
        }
    }
}

async function play(connection, url) {
    return connection.playOpusStream(await ytdl(url));  //Plays the URL
}