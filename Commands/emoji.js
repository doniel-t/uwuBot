/**
 * @usage !emoji <EmojiName / all>
 * @does sends Emoji with given name
 * @Shortcut e
 */
module.exports = {
    emoji: function (message) {

        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        contentArgs[1] = contentArgs[1].toLowerCase();

        if (contentArgs[1] == 'all') {
            printAll(message);
            return;
        }

        var emoji = global.bot.emojis.find(e => e.name.toLowerCase() == contentArgs[1]);   //get Emoji from Server

        if (emoji == null) { //Error detection
            message.channel.send('No Emoji found with this name');
            return;
        }

        message.channel.send(getEmojiString(emoji)); //Send Message
    },

    emojiDetection(message) {

        let contentArgs = message.content.replace(/:/g, ' ').split(" "); //Replace : with Space and split Message

        if (contentArgs[0] == '!e' || contentArgs[0] == '!emoji') {
            contentArgs.shift(); //Remove first emoji and command if !emoji / !e is called
            contentArgs.shift();
        }

        let counter = 0;
        let sendMessage = '';

        for (let word of contentArgs) {

            word = word.toLowerCase();

            let emoji = global.bot.emojis.find(e => e.name.toLowerCase() == word);   //Find emoji

            if (emoji) {
                sendMessage = sendMessage.concat(getEmojiString(emoji));
                counter++;
                if (counter == 27) {
                    message.channel.send(sendMessage); //Send Message
                    sendMessage = '';
                    counter = 0;
                }
            }
        }
        if (sendMessage.length > 0) {
            message.channel.send(sendMessage);
        }
    }
}

function getEmojiString(emoji) {

    return (emoji.animated ? '<a:' : '<:') + emoji.name + ':' + emoji.id + '>'; //Build emojiString
}

function printAll(message) {
    let sendMessage = '';
    let counter = 0;
    for (let val of global.bot.emojis) {
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
