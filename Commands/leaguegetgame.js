const Logger = require('../Admin.js');
const RiotAPIKey = require('../Dependencies/RiotAPIKey.json'); //Has RiotAPIKey under RiotAPIKey.key
const champions = require('../Files/champions.json');
let LeagueAPI = require('leagueapiwrapper');
LeagueAPI = new LeagueAPI(RiotAPIKey.key, Region.EUW);

module.exports = {

    leaguegetgame: async function (message) {

        name = getleagueName(message);

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

function getleagueName(message) { //Gives back a NameString 

    let contentArgs = message.content.split(" ");

    if (contentArgs[1] == null) { //Hardcoded Names
        switch (message.author.username) {

            case "ackhack": //Discordname
                return "ackhack"; //leaguename

            case "Human Daniel":
                return "Epicly Bad Gamer";

            case "LeftDoge":
                return "JohnTheVirtuoso";

            case "HST_Tutorials":
                return "HST KZSZ";

            default:
                return "No User given";
        }
    } else {
        return contentArgs[1]; //When Name given
    }
}