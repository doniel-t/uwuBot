function uwufy(string) {
    let uwuString = "";
    for (let char of string) {
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
    return uwuString + " ";
}


function uwufyMessage(message, contentArgs) {
    // gets rid of <[userID]> => message.content = inputMessage of user
    let returnString = "";
    let index = 0;
    if (message.author.bot) { return; }
    for (let arg of contentArgs) {
        if (index != 0) {
            arg = uwufy(arg);
            returnString += arg;
        }
        index++;
    }
    return returnString;
}
// token to login
const token = require('botToken.json');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', (message) => {
    let contentArgs = message.content.split(" ");
    if (contentArgs[0] === "!padoru") {
        message.channel.send("HASHIRE SORIYO KAZE NO YOU NI TSUKIMIHARAWO PADORU PADORU");
        return;
    }
    if (contentArgs[0] === "!uwufy") {
        message.channel.send(uwufyMessage(message, contentArgs));
    }
});

bot.login(token.token);