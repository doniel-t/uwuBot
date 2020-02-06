const token = require('../Dependencies/osuAPIKey.json'); //Has DiscordToken under token.token
const osuName = require("./getosuName.js");
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


module.exports = {
    getTopPlays: async function(message) {

        let topPlays = "";
        let contentArgs = message.content.split(" ");
        var name;
        if (contentArgs[1] == null) {
            name = osuName.getosuName(message);
        } else {
            name = contentArgs[1];
        }

        let apiCall = osuAPI.getUserBest({ u: name }).then(async scores => {
            for (let index = 0; index < 5; index++) {
                topPlays = topPlays.concat("Name: ").concat(scores[index].beatmap.title).concat(" Acc: ").concat(scores[index].accuracy * 100)
                    .concat(" PP: ").concat(scores[index].pp).concat(" Link: https://osu.ppy.sh/beatmapsets/").concat(scores[index].beatmap.beatmapSetId).concat("\n\n");
            }
            return topPlays
        }).catch(() => {
            message.channel.send("Username not found");
        });
        let result = await apiCall;
        message.channel.send(result);
    }
};