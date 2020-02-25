module.exports = {
    emoji: function(message,bot) {

        var split = message.content.split(':'); //Split message
        var emoji = bot.emojis.find(e => e.name == split[1]);   //get Emoji from Server
        var emojiname = '';

        if (emoji.animated) { //Difference between animated and still
            emojiname = '<a:';
        } else {
            emojiname = '<:';
        }

        emojiname = emojiname + emoji.name + ':' + emoji.id + '>'; //Build emojiString
        message.channel.send(emojiname); //Send Message
    }
}