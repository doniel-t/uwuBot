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
    osuplays: function (message) { //Gets Top 5 PP Plays!

        name = getosuName(message);

        osuAPI.getUserBest({ u: name }).then(scores => {
            var emb = new Discord.RichEmbed()
                .setTitle(name + '`s Top 5 Plays');
            for (let index = 0; index < 5; index++) {
                let Link = '[' + [scores[index].beatmap.title] + '](https://osu.ppy.sh/beatmapsets/' + scores[index].beatmap.beatmapSetId + '#osu/' + scores[index].beatmap.id + ')';
                let n = index+1;
                emb.addField('#' + n,
                    Link.concat("\nAcc: ").concat(scores[index].accuracy * 100).concat("\nPP: ").concat(scores[index].pp));
            }
            message.channel.send(emb);
        }).catch((error) => {
            Logger.log(error);
            message.channel.send("An Error occured");
        });
    }
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
        return message.content.substring(contentArgs[0].length+1);  //When Name given
    }
}