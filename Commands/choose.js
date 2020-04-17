/**
 * @usage !choose <option1> , <option2> , ... , <option n>
 * @does chooses a random option for you
 */
module.exports = {
    choose: function (message) {
        try {
            let contentArgs = message.content.substring(message.content.indexOf(' ') + 1).split(",");
            message.channel.send(contentArgs[Math.round((contentArgs.length - 1) * Math.random())]);
        } catch (err) {
            message.channel.send("Invalid arguments");
        }
    }
}