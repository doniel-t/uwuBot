module.exports = {
    zins: function (message) {

        let contentArgs = message.content.split(" ");

        if (contentArgs.length != 4) {
            message.channel.send("Wrong number of arguments, use !help for help");
            return;
        }

        let amount = parseFloat(contentArgs[1]);
        let times = parseInt(contentArgs[2], 10);
        let zins = parseFloat(contentArgs[3], 10);

        for (let i = 0; i < times; i++) {
            amount = amount + amount * (zins / 100);
        }

        message.channel.send("Money after " + times + " months = " + amount.toFixed(2) + "€");
    }

}