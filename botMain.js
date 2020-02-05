const token = require('botToken.json'); //Has DiscordToken under token.token
const Discord = require('discord.js');
const bot = new Discord.Client();
const osu = require('node-osu');
const osuAPIKey = require('osuAPIKey.json'); //Has APIKey under osuAPIKEY.key
const osuAPI = new osu.Api(osuAPIKey.key, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});

bot.on('message', (message) => { //Grab Message

    let contentArgs = message.content.split(" "); //Split Message for simpler Access
    if (contentArgs[0] === "!padoru") {
        message.channel.send("HASHIRE SORIYO KAZE NO YOU NI TSUKIMIHARAWO PADORU PADORU");
        return;
    }
    if (contentArgs[0] === "!uwufy") {
        message.channel.send(uwufyMessage(message, contentArgs));
    }

    if (message.content.startsWith('!osu')) { //Here all osu! related Code
        if (contentArgs[0] === ('!osurecent')) { //Sends last played Map passed or unpassed
            getRecent(message);
        }
    }
});

bot.login(token.token); //Starts Bot