const token = require('./Dependencies/botToken.json'); //Has DiscordToken under token.token
const Discord = require('discord.js');
const bot = new Discord.Client();

const topPlays = require('./Commands/getUserBest.js');
const osurecent = require('./Commands/userRecent.js');
const uwufy = require('./Commands/uwufy.js');

bot.on('message', (message) => { //Grab Message

    let contentArgs = message.content.split(" "); //Split Message for simpler Access
    if (contentArgs[0] === "!padoru") {
        message.channel.send("HASHIRE SORIYO KAZE NO YOU NI TSUKIMIHARAWO PADORU PADORU");
        return;
    }
    if (contentArgs[0] === "!uwufy") {
        uwufy.uwufyMessage(message, contentArgs);
    }

    if (message.content.startsWith('!osu')) { //Here all osu! related Code
        if (contentArgs[0] === ('!osurecent')) { //Sends last played Map passed or unpassed
            osurecent.getRecent(message);
        }
        if (contentArgs[0] === '!osuplays') {
            message.channel.send(topPlays.getTopPlays(contentArgs[1]));
            console.log("HAHA PEEEPE")
        }
    }
});

bot.login(token.token); //Starts Bot