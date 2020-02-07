const Logger = require('../Logger.js');
const RiotAPIKey = require('../Dependencies/RiotAPIKey.json'); //Has RiotAPIKey under RiotAPIKey.key
const leagueName = require("./getleagueName.js");
const champions = require('../Files/champions.json');
let LeagueAPI = require('leagueapiwrapper');
LeagueAPI = new LeagueAPI(RiotAPIKey.key, Region.EUW);

module.exports = {

    leaguegetgame: async function(message) {

        name = leagueName.getleagueName(message);

        LeagueAPI.getSummonerByName(name)
            .then(async function(accountObject) {

                return await LeagueAPI.getActiveGames(accountObject);
            }).catch()
            .then(function(activeGames) {
                let res = 'LEAGUE GAME \n';

                for (var x = 0; x < activeGames.participants.length; x++) {
                    res = res.concat("https://euw.op.gg/summoner/userName=").concat(activeGames.participants[x].summonerName).concat(' plays as ').concat(getChamp(activeGames.participants[x].championId)).concat('\n');
                }

                message.channel.send(res);
            })
            .catch(error => {
                if (error.status.status_code == 404) {
                    message.channel.send('No active Game');
                } else {
                    Logger.log(error);
                }
            });
    }

}

function getChamp(ID) {
    for (var champ in champions.data) {
        eval('var c = champions.data.' + champ);
        if (c.key == ID) {
            return c.id;
        }
    }
}