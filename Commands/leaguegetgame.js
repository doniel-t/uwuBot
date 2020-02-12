const Logger = require('../Admin.js');
const RiotAPIKey = require('../Dependencies/RiotAPIKey.json'); //Has RiotAPIKey under RiotAPIKey.key
const leagueName = require("./getleagueName.js");
const champions = require('../Files/champions.json');
let LeagueAPI = require('leagueapiwrapper');
LeagueAPI = new LeagueAPI(RiotAPIKey.key, Region.EUW);

module.exports = {

    leaguegetgame: async function (message) {

        name = leagueName.getleagueName(message);

        LeagueAPI.getSummonerByName(name)
            .then(async function (accountObject) {

                return await LeagueAPI.getActiveGames(accountObject);
            }).catch()
            .then(function (activeGames) {

                let res = 'LEAGUE GAME \n';

                for (var x = 0; x < activeGames.participants.length; x++) {
                    res = res.concat(activeGames.participants[x].summonerName).concat(' plays as ').concat(getChamp(activeGames.participants[x].championId)).concat('\n');
                }
                message.channel.send(res);


                let opgg= "OP.GG LINKS:\n";

                for (var y = 0; y < activeGames.participants.length; y++) {
                    opgg = opgg.concat('https://euw.op.gg/summoner/userName=').concat(activeGames.participants[y].summonerName.replace(/ /g,'_')).concat('\n');
                }
                message.channel.send(opgg);

            })
            .catch(error => {
                message.channel.send('An Error occured');
                Logger.log(error);
            });
    }

}

function getChamp(ID) {
    for (var champ in champions.data) {
        c = champions.data[champ];
        if (c.key == ID) {
            return c.id;
        }
    }
}