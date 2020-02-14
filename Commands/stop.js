module.exports = {
    stop: function (message, bot) {
        bot.channels.get(message.author.lastMessage.member.voiceChannelID).leave(); //Leave VC
    }
}