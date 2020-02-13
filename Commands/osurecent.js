const Logger = require('../Admin.js');
const osu = require('node-osu');
const osuAPIKey = require('../Dependencies/osuAPIKey.json'); //Has APIKey under osuAPIKEY.key
const osuAPI = new osu.Api(osuAPIKey.key, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});
const BotID = require("../Dependencies/BotID.json");

const osuName = require("./getosuName.js");
const parseMods = require("./parseMods.js");

module.exports = {

    osurecent: async function(message) { //Gets most recent Play(passed or unpassed)

        name = osuName.getosuName(message);

        let emojiIds = ["<:hit300:677469703798521881>", //300
            "<:hit100:677469559875305473>", //100
            "<:hit50:677469611725422625>", //50
            "<:hit0:677469777274601491>" //miss
        ];

        console.log(message);

        s = osuAPI.getUserRecent({ u: name }).then( //osuAPI-Call
            async result => {
                recentScore = result[0];

                var Acc = recentScore.accuracy * 100;
                let ObjectCount = Number.parseInt(recentScore.beatmap.objects.normal) +
                    Number.parseInt(recentScore.beatmap.objects.slider) +
                    Number.parseInt(recentScore.beatmap.objects.spinner);

                let ScoreCount = Number.parseInt(recentScore.counts["50"]) +
                    Number.parseInt(recentScore.counts["100"]) +
                    Number.parseInt(recentScore.counts["300"]) +
                    Number.parseInt(recentScore.counts["miss"]);

                let percentagePassed = (ScoreCount / ObjectCount) * 100;

                let endMessage = "Score:    ".concat(recentScore.score)
                    .concat("\nCombo:    ").concat(recentScore.maxCombo)
                    .concat("\nTitle:    ").concat(recentScore.beatmap.title)
                    .concat("\nLink:      ").concat("https://osu.ppy.sh/beatmapsets/").concat(recentScore.beatmap.beatmapSetId)
                    .concat("\nDiff:     ").concat(recentScore.beatmap.version)
                    .concat("\nStarDiff: ").concat(recentScore.beatmap.difficulty.rating)
                    .concat("\nBPM:      ").concat(recentScore.beatmap.bpm)
                    .concat("\nAcc:      ").concat(Acc.toFixed(2)).concat("%\n")
                    .concat(recentScore.counts["300"]).concat(emojiIds[0] + " ")
                    .concat(recentScore.counts["100"]).concat(emojiIds[1] + " ")
                    .concat(recentScore.counts["50"]).concat(emojiIds[2] + " ")
                    .concat(recentScore.counts["miss"]).concat(emojiIds[3] + " ");

                let parsedMods = parseMods.parseMods(recentScore.mods);

                if (!(parsedMods === "" || parsedMods == null)) {
                    endMessage = endMessage.concat("\nMods:     ").concat(parsedMods);
                } else {
                    endMessage = endMessage.concat("\nMods:     NoMod");
                }
                if (recentScore.pp != null) {
                    endMessage = endMessage.concat("\nPP:       ").concat(recentScore.pp);
                }
                if (percentagePassed !== 100) {
                    endMessage = endMessage.concat("\nPassed:    ").concat(percentagePassed.toFixed(2)).concat("%");
                }
                return endMessage;
            }
        ).catch((error) => {
            Logger.log(error);
            message.channel.send("Username not found or this user has not played today!");
        });

        let result = await s; //wait for PromiseResolve
        message.channel.send(result);
    }
}