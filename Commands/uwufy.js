/**
 * @usage !uwufy <message>
 * @does uwufies your message
 */
module.exports = {
    uwufy: function (message) { //uwu a Message
        message.channel.send(
            message.content.substr(message.content.indexOf(' ') + 1)
                .replace(/L|R|V/g, 'W')
                .replace(/l|r|v/g, 'w')
        );
    }
}