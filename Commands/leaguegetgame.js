const Logger = require("./Logger.js");
const Discord = require('discord.js');
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

                let mes = new Discord.RichEmbed();
                mes.setTitle('LEAGUE GAME');

                for (var x = 0; x < activeGames.participants.length; x++) {
                    let Link = '[' + activeGames.participants[x].summonerName + '](' + 'https://euw.op.gg/summoner/userName=' + activeGames.participants[x].summonerName.replace(/ /g, '_') + ')';
                    mes.addField(getChamp(activeGames.participants[x].championId), Link);
                }
                message.channel.send(mes);
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
        return message.content.substring(contentArgs[0].length+1);  //When Name given
    }
}