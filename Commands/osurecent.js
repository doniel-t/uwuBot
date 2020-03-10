const Discord = require('discord.js');
const Logger = require("./Logger.js");
const osu = require('node-osu');
const osuAPIKey = require('../Dependencies/osuAPIKey.json'); //Has APIKey under osuAPIKEY.key
const osuAPI = new osu.Api(osuAPIKey.key, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});

module.exports = {

    osurecent: function (message, bot) { //Gets most recent Play(passed or unpassed)

        name = getosuName(message);

        osuAPI.getUserRecent({ u: name }).then( //osuAPI-Call
            result => {
                recentScore = result[0];

                let ObjectCount = Number.parseInt(recentScore.beatmap.objects.normal) +
                    Number.parseInt(recentScore.beatmap.objects.slider) +
                    Number.parseInt(recentScore.beatmap.objects.spinner);

                let ScoreCount = Number.parseInt(recentScore.counts["50"]) +
                    Number.parseInt(recentScore.counts["100"]) +
                    Number.parseInt(recentScore.counts["300"]) +
                    Number.parseInt(recentScore.counts["miss"]);

                let Acc = recentScore.accuracy * 100;
                let percentagePassed = (ScoreCount / ObjectCount) * 100;
                let parsedMods = parseMods(recentScore.mods);

                var emb = new Discord.RichEmbed()
                    .setTitle(recentScore.beatmap.artist + ' - ' + recentScore.beatmap.title)
                    .setURL('https://osu.ppy.sh/beatmapsets/' + recentScore.beatmap.beatmapSetId + '#osu/' + recentScore.beatmap.id)
                    .setColor('#0099ff')
                    .setFooter(recentScore.date)
                    .addField('Score', recentScore.score, true)
                    .addField('Combo', recentScore.maxCombo, true)
                    .addField('BPM', recentScore.beatmap.bpm, true)
                    .addField('Status', recentScore.beatmap.approvalStatus)
                    .addField('Difficulty', recentScore.beatmap.version, true)
                    .addField('StarRating', parseFloat(recentScore.beatmap.difficulty.rating).toFixed(2), true)

                if (!(parsedMods === "" || parsedMods == null)) {
                    emb.addField('Mods', parsedMods, true)
                }

                if (percentagePassed !== 100) {
                    emb.addField('Passed', percentagePassed.toFixed(2).concat("%"))
                } else {
                    emb.addBlankField()
                }

                emb.addField('Hits', recentScore.counts["300"].concat(getEmoji('hit300', bot) + " ")
                    .concat(recentScore.counts["100"]).concat(getEmoji('hit100', bot) + " ")
                    .concat(recentScore.counts["50"]).concat(getEmoji('hit50', bot) + " ")
                    .concat(recentScore.counts["miss"]).concat(getEmoji('hit0', bot) + " "))

                message.channel.send(emb);
            }
        ).catch((error) => {
            Logger.log(error);
            message.channel.send("Username not found or this user has not played today!");
        });
    }
}

function parseMods(mods) {
    let result = "";
    for (let x = 0; x < mods.length; x++) {

        if (mods[x] != 'FreeModAllowed' && mods[x] != 'ScoreIncreaseMods') {
            result += mods[x] + ',';
        }
    }

    result = result.substring(0, result.length - 1);
    return result;
}

function getosuName(message) {       //Gives back a NameString 

    let contentArgs = message.content.split(" ");

    if (contentArgs[1] == null) {   //Hardcoded Names
        switch (message.author.username) {

            case "ackhack":         //Discordname
                return "ackh4ck";   //osuname

            case "Human Daniel":
                return "Human Daniel";

            case "DragonHunter428":
                return "DH428";

            case 'Yalina':
                return 'IIAleII';

            default:
                return "No User given";
        }
    }
    else {
        contentArgs.shift();
        return contentArgs.join().replace(/,/g, ' ');  //When Name given
    }
}

function getEmoji(emojiName, bot) {
    var emoji = bot.emojis.find(e => e.name == emojiName);   //get Emoji from Server
    return '<:' + emoji.name + ':' + emoji.id + '>'; //Build emojiString
}