function uwufy(string) {
    var uwuString = "";
    for (var char of string) {
        switch (char) {
            case 'l':
                char = 'w';
                break;
            case 'r':
                char = 'w';
                break;
            case 'v':
                char = 'w';
                break;
        }
        uwuString += char;
    }
    uwuString += " ~ uwu";
    return uwuString;
}
// token to login
const token = require('botToken.json');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', (message) => {
    if (message.isMentioned(bot.user)) {
        // gets rid of <[userID]> => message.content = inputMessage of user
        message.content = message.content.slice(message.content.indexOf(">") + 2, message.content.length);
        if (message.content.startsWith("!padoru")) {
            message.channel.send("HASHIRE SORI YOKAZE NO YOU NITSUKIMIHARA WOPADORU PADORU");
            return;
        }
        message.channel.send(uwufy(message.content));
    }
});

bot.login(token.token);
