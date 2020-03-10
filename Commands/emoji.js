module.exports = {
    emoji: function (message, bot) {

        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        if (contentArgs[1] == 'all') {
            printAll(message,bot);
            return;
        }

        var emoji = bot.emojis.find(e => e.name == contentArgs[1]);   //get Emoji from Server

        if (emoji == null) { //Error detection
            message.channel.send('No Emoji found with this name');
            return;
        }

        message.channel.send(getEmojiString(emoji)); //Send Message
    }
}

function getEmojiString(emoji) {
    var emojiname = '';

    if (emoji.animated) { //Difference between animated and still
        emojiname = '<a:';
    } else {
        emojiname = '<:';
    }

    emojiname = emojiname + emoji.name + ':' + emoji.id + '>'; //Build emojiString
    return emojiname;
}

function printAll(message,bot) {
    var sendMessage = '';
    for (var val of bot.emojis) {
        sendMessage = sendMessage.concat(getEmojiString(val[1]));
        if (sendMessage.length > 1800) {
            message.channel.send(sendMessage); //Send Message
            sendMessage = '';
        }      
    }
    message.channel.send(sendMessage);
}