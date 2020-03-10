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
    },

    emojiDetection(message,bot) {
        let contentArgs = message.content.replace(/:/g,' ').split(" "); //Replace : with Space and split Message

        if (contentArgs[0] == '!e' || contentArgs[0] == '!emoji') {
            contentArgs.shift(); //Remove first emoji and command if !emoji / !e is called
            contentArgs.shift(); 
        }

        for (var word of contentArgs) {
            if (word[0] == ':' && word[word.length-1] == ':') { //Remove : if needed
                word = word.substring(1,word.length-1);
            }
            let emoji = bot.emojis.find(e => e.name == word);   //Find emoji
            if (emoji) {
                let sendMessage = message;
                sendMessage.content = '!e ' + emoji.name;
                this.emoji(sendMessage,bot);
            }
        }

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
    var counter = 0;
    for (var val of bot.emojis) {
        sendMessage = sendMessage.concat(getEmojiString(val[1]));
        counter++;
        if (counter == 27) {
            message.channel.send(sendMessage); //Send Message
            sendMessage = '';
            counter = 0;
        }      
    }
    message.channel.send(sendMessage);
}