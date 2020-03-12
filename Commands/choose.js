module.exports = {
    choose: function(message) {
        let contentArgs = message.content.split(" ");
        if (Math.random() <= 0.5) {
            return message.channel.send(contentArgs[1]);
        } else {
            return message.channel.send(contentArgs[2]);
        }
    }
}