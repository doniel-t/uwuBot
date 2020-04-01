module.exports = {
    rng: function(message) {
        let contentArgs = message.split(" ");
        if (contentArgs[1] > contentArgs[2]) {
            message.channel.send("Your min value was bigger than max value");
        }
        if (isNan(contentArgs[1]) || isNaN(contentArgs[2]))
            message.channel.send(round(Math.random() * (contentArgs[2] - contentArgs[1])) + contentArgs[1]);
    }
}