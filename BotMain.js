
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

async function getRecent(message) {
    let contentArgs = message.content.split(" ");
    var name;
    if (contentArgs[1] == null) {
        switch (message.author.username) {
            case "ackhack":
                name = "ackh4ck";
                break;
            case "RSI > RMI > RPC":
                name = "daninator";
                break;
            case "DragonHunter428":
                name = "DH428";
                break;
            default:
                return "No User given";
            }
    } else {
        name = contentArgs[1];
    }

    s = osuAPI.getUserRecent({ u: name }).then( //osuAPI-Call
        async result => { 

        recentScore= result[0];

        var Acc = recentScore.accuracy * 100;

        let endMessage =            "Score:    "           .concat(recentScore.score)
                                    .concat("\nCombo:    ").concat(recentScore.maxCombo)
                                    .concat("\nTitle:    ").concat(recentScore.beatmap.title)
                                    .concat("\nDiff:     ").concat(recentScore.beatmap.version)
                                    .concat("\nStarDiff: ").concat(recentScore.beatmap.difficulty.rating)
                                    .concat("\nBPM:      ").concat(recentScore.beatmap.bpm)
                                    .concat("\nAcc:      ").concat(Acc).concat("%");
        ;

        if(recentScore.pp != null) {
            endMessage = endMessage .concat("\nPP:       ").concat(recentScore.pp);
        }
    
        return endMessage;
    }
    ).catch(() => {
        message.channel.send("Username not found");
    });

    let result = await s;   //wait for PromiseResolve
    message.channel.send(result);
}


function uwufy(string) {    //uwu a String
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


function uwufyMessage(message, contentArgs) {   //uwu a Message
    // gets rid of <[userID]> => message.content = inputMessage of user
    let returnString = "";
    let index = 0;
    if (message.author.bot) { return; }     //No uwu if Author is Bot himself
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

    let contentArgs = message.content.split(" ");   //Split Message for simpler Access
    if (contentArgs[0] === "!padoru") {
        message.channel.send("HASHIRE SORIYO KAZE NO YOU NI TSUKIMIHARAWO PADORU PADORU");
        return;
    }
    if (contentArgs[0] === "!uwufy") {
        message.channel.send(uwufyMessage(message, contentArgs));
    }

    if(message.content.startsWith('!osu')) {        //Here all osu! related Code
        if (contentArgs[0] === ('!osurecent')) {    //Sends last played Map passed or unpassed
            getRecent(message);
        }
    }
});

bot.login(token.token); //Starts Bot
=======
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

