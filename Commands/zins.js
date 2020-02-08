module.exports = {
    zins: function(message) {
        let contentArgs = message.content.split(" ");
        if (contentArgs.length == 1) {
            message.channel.send("Try to use this syntax: !zins <startMoney in €> <number_of_months> <percentage>")
        } else {
            if (contentArgs.length != 4) {
                message.channel.send("Wrong number of arguments!")
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
}