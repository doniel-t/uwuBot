const Logger = require('../Admin.js');
const osu = require('node-osu');
const osuAPIKey = require('../Dependencies/osuAPIKey.json'); //Has APIKey under osuAPIKEY.key
const osuAPI = new osu.Api(osuAPIKey.key, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});

module.exports = {
    osuplays: async function(message) { //Gets Top 5 PP Plays!

        name = getosuName(message);

        let apiCall = osuAPI.getUserBest({ u: name }).then(async scores => {
            let topPlays = "";
            for (let index = 0; index < 5; index++) {
                topPlays = topPlays.concat("Name: ").concat(scores[index].beatmap.title)
                    .concat(" Acc: ").concat(scores[index].accuracy * 100)
                    .concat(" PP: ").concat(scores[index].pp)
                    .concat(" Link: https://osu.ppy.sh/beatmapsets/").concat(scores[index].beatmap.beatmapSetId)
                    .concat("\n\n");
            }
            return topPlays;
        }).catch((error) => {
            Logger.log(error);
            message.channel.send("An Error occured");
        });

        let result = await apiCall;
        message.channel.send(result);
    }
}

function getosuName(message) {       //Gives back a NameString 

    let contentArgs = message.content.split(" ");

    if (contentArgs[1] == null) {   //Hardcoded Names
        switch (message.author.username) {
            
            case "ackhack":         //Discordname
                return "ackh4ck";   //osuname

            case "Human Daniel":
                return "daninator";

            case "DragonHunter428":
                return "DH428";

            default:
                return "No User given";
        }
    }
    else {
        return contentArgs[1];  //When Name given
    }
}