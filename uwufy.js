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

function getRecent(string) {
    
    if (string.length == 9) {
        return 'No User given';
    }
    
    name = string.substring(11);

    osuAPI.getUserRecent({ u: name }).then(scores => { //osuAPI-Call
        recentScore= scores[0];
        endMessage =    'User: ' + recentScore.user.name + 
                        '\nScore: ' + recentScore.score + 
                        '\nCombo: ' + recentScore.maxCombo +
                        '\nPP: ' + recentScore.pp +
                        '\nTitle: ' + recentScore.beatmap.title +
                        '\nDiff: ' + recentScore.beatmap.version +
                        '\nStarDiff: ' + recentScore.beatmap.rating +
                        '\nBPM: ' + recent.beatmap.bpm
                        '\nMods '
                        ;
        
        for (var mod in recentScore.mods) {
            endMessage += mod.toString();
        }
        return endMessage;
    });
}
// token to login
const token = require('botToken.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const osu = require('node-osu');    //Need node-osu to run osuAPI
const osuAPIKey = require('osuAPIKey.json'); //Has APIKey under osuAPIKEY.key
const osuAPI = new osu.Api(osuAPIKey.key, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});

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
    if(message.startsWith('!osu')) {        //Here all osu! related Code
        if (message.startsWith('!osurecent')) {
            message.channel.send(getRecent(message));
        }
    }
});

bot.login(token.token);
