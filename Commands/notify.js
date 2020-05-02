/**
 * @usage !notify <Your Message (Allows spaces)> , <time in minutes> : <time in seconds>
 * @does notifies you on your set time (!notify Pizza is ready,10:00)
 */
module.exports = {
    notify: function(message) {
        try {
            let contentArgs = message.content.substring(message.content.indexOf(' ') + 1).split(",");
            let notification = contentArgs[0];
            let splitTime = contentArgs[1].split(":");
            let time = parseInt(splitTime[0]) * 60000 + parseInt(splitTime[1]) * 1000;
            if (time < 0) {
                message.channel.send("Negative time");
                return;
            }
            if (Number.isNaN(time)) {
                message.channel.send("Your time is not a number!");
                return;
            }
            let userId = message.author.id;
            message.channel.send('I will notify you in ' + splitTime[0] + ':' + splitTime[1]);
            setTimeout(() => { message.channel.send("<@" + userId + "> " + notification) }, time);
        } catch (ignored) {
            message.channel.send("You used the wrong syntax! Use !help for help");
        }
    }
}