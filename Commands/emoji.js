module.exports = {
    emoji: function (message, bot) {

        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        var emoji = bot.emojis.find(e => e.name == contentArgs[1]);   //get Emoji from Server

        if (emoji == null) { //Error detection
            message.channel.send('No Emoji found with this name');
            return;
        }

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