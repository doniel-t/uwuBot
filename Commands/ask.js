module.exports = {
    ask: function(message) {
        let randomMessage = Math.floor(Math.random() * (20 - 0 + 1));
        switch (randomMessage) {
            case 1:
                message.channel.send("As I see it, yes.");
                break;
            case 2:
                message.channel.send("Ask again later.");
                break;
            case 3:
                message.channel.send("Better not tell you now");
                break;
            case 4:
                message.channel.send("Cannot predict now");
                break;
            case 5:
                message.channel.send("Concentrate and ask again");
                break;
            case 6:
                message.channel.send("Don't count on it");
                break;
            case 7:
                message.channel.send("It is certain");
                break;
            case 8:
                message.channel.send("It is decidedly so.");
                break;
            case 9:
                message.channel.send("Most likely");
                break;
            case 10:
                message.channel.send("My reply is no");
                break;
            case 11:
                message.channel.send("My sources say no.");
                break;
            case 12:
                message.channel.send("Outlook not so good");
                break;
            case 13:
                message.channel.send("Outlook good");
                break;
            case 14:
                message.channel.send("Reply hazy, try again");
                break;
            case 15:
                message.channel.send("Signs point to yes");
                break;
            case 16:
                message.channel.send("Very doubtful.");
                break;
            case 17:
                message.channel.send("Without a doubt");
                break;
            case 18:
                message.channel.send("Yes.");
                break;
            case 19:
                message.channel.send("Yes - definitely.");
                break;
            case 20:
                message.channel.send("You may rely on it");
                break;
            default:
                message.channel.send("There was a problem, please try again");
        }
    }
}