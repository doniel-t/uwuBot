module.exports = {
    rng: function(message) {
        let contentArgs = message.content.split(" ");
        let min = parseInt(contentArgs[1]);
        let max = parseInt(contentArgs[2]);

        if (min < 0 || max < 0) {
            message.channel.send("Please use numbers >= 0");
            return;
        }
        if (min > max) {
            message.channel.send("Your min value was bigger than max value");
        } else {
            message.channel.send(Math.round(Math.random() * (max - min)) + min);
        }
    }
}