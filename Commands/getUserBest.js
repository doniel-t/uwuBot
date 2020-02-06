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


module.exports = {
    getTopPlays: async function(username) {
        let topPlays = "";
        if (username === 'daninator') console.log("pog");
        let apiCall = osuAPI.getUserBest({ u: username }).then(async scores => {
            for (let index = 0; index < 10; index++) {
                topPlays = topPlays.concat("Name: ").concat(scores[index].beatmap.title).concat(" Acc: ").concat(scores[index].accuracy)
                    .concat(" PP: ").concat(scores[index].pp).concat(" Link: https://osu.ppy.sh/beatmapsets/").concat(scores[index].beatmap.beatmapSetId).concat("\n");
            }
            return topPlays
        });
        let topPlays = await apiCall;
        return topPlays;
    }
};