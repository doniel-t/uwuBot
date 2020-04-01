module.exports = {
    rng: function(message) {
        let contentArgs = message.split(" ");
        let min = parseInt(contentArgs[1]);
        let max = parseInt(contentArgs[2]);

        if (min > max) {
            message.channel.send("Your min value was bigger than max value");
        }
        if (isNan(min) || isNaN(max))
            message.channel.send(Math.round(Math.random() * (max - min)) + min);
    }
}