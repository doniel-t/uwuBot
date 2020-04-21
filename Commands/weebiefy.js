/**
 * @usage !weebiefy <messsage>
 * @does weebifies your message
 * @Shortcut w
 */
module.exports = {
    weebiefy: function (message) {
        message.channel.send(
            message.content.substring(message.content.indexOf(' ') + 1)
                .replace(/l{1,2}/g, 'uru')
                .replace(/(?<!o)( |$)/g, 'o ')
        );
    }
}