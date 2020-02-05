const token = require('botToken.json');
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

function osuRecent() {

}

async function getRecent(message) {
    let contentArgs = message.content.split(" ");
    if (contentArgs[1] == null) {
        return 'No User given';
    }

    s = osuAPI.getUserRecent({ u: contentArgs[1] }).then( //osuAPI-Call
        async result => {

            recentScore = result[0];

            var Acc = recentScore.accuracy * 100;

            let endMessage = "Score:    ".concat(recentScore.score)
                .concat("\nCombo:    ").concat(recentScore.maxCombo)
                .concat("\nTitle:    ").concat(recentScore.beatmap.title)
                .concat("\nLink:     ").concat("https://osu.ppy.sh/beatmapsets/").concat(recentScore.beatmap.beatmapSetId)
                .concat("\nDiff:     ").concat(recentScore.beatmap.version)
                .concat("\nStarDiff: ").concat(recentScore.beatmap.difficulty.rating)
                .concat("\nBPM:      ").concat(recentScore.beatmap.bpm)
                .concat("\nAcc:      ").concat(Acc).concat("%");
            console.log(message.author);

            if (recentScore.pp != null) {
                endMessage = endMessage.concat("\nPP:       ").concat(recentScore.pp);
            }
            return endMessage;
        }
    ).catch(error => {
        console.log(error);
    });

    let result = await s;
    message.channel.send(result);
}


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


bot.on('message', (message) => { //Grab Message

    let contentArgs = message.content.split(" ");
    if (contentArgs[0] === "!padoru") {
        message.channel.send("HASHIRE SORIYO KAZE NO YOU NI TSUKIMIHARAWO PADORU PADORU");
        return;
    }
    if (contentArgs[0] === "!uwufy") {
        message.channel.send(uwufyMessage(message, contentArgs));
    }

    if (message.content.startsWith('!osu')) { //Here all osu! related Code
        if (contentArgs[0] === '!osurecent') {
            getRecent(message);
        }
    }


});

bot.login(token.token);