const Discord = require('discord.js');
const fh = require('./FileHandler');
const WebSocket = require('ws');
const champions = require('../Files/champions.json');
const RunningGames = [];

module.exports = {

    league: function(message) {

        var ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server
        var name = getleagueName(message);

        ws.on('error', function error() {
            message.channel.send('Websocket-Server is unreachable');
        })

        ws.on('open', function open() { //Request
            ws.send('LeagueAPI ' + name);

            ws.on('message', function incoming(data) { //Answer
                if (data == "ERROR") {
                    message.channel.send('An Error occured or Player isn`t ingame');
                    return;
                }

                message.channel.send(makeEmbed(JSON.parse(data)[1]));
            });
        });
    },

    checkForLOLGames: function(bot) {
        autoCheck(bot);
    }
}

function makeEmbed(players) {
    return new Discord.RichEmbed().setColor('#0099ff').setTitle("League Game")

    .addField("Blue Team", players[0].name + "\n" +
        players[1].name + "\n" +
        players[2].name + "\n" +
        players[3].name + "\n" +
        players[4].name, true)

    .addField("Champion", players[0].champion + "\n" +
        players[1].champion + "\n" +
        players[2].champion + "\n" +
        players[3].champion + "\n" +
        players[4].champion, true)

    .addField("SoloQ Rank ", players[0].playerlevel + " " + players[0].rank + "\n" +
        players[1].playerlevel + " " + players[1].rank + "\n" +
        players[2].playerlevel + " " + players[2].rank + "\n" +
        players[3].playerlevel + " " + players[3].rank + "\n" +
        players[4].playerlevel + " " + players[4].rank, true)

    .addField("Red Team", players[5].name + "\n" +
        players[6].name + "\n" +
        players[7].name + "\n" +
        players[8].name + "\n" +
        players[9].name, true)

    .addField("Champion", players[5].champion + "\n" +
        players[6].champion + "\n" +
        players[7].champion + "\n" +
        players[8].champion + "\n" +
        players[9].champion, true)

    .addField("SoloQ Rank ", players[5].playerlevel + " " + players[5].rank + "\n" +
        players[6].playerlevel + " " + players[6].rank + "\n" +
        players[7].playerlevel + " " + players[7].rank + "\n" +
        players[8].playerlevel + " " + players[8].rank + "\n" +
        players[9].playerlevel + " " + players[9].rank, true);
}

function getleagueName(message) { //Gives back a NameString 

    let contentArgs = message.content.split(" ");

    if (contentArgs[1] == null) { //Hardcoded Names
        return require('./name').getName('lol', message.author.username); //Get name from local/names.json
    } else {
        return message.content.substring(contentArgs[0].length + 1); //When Name given
    }
}

function autoCheck(bot) {

    var ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server;
    var leaguechannel = bot.channels.get(fh.get('../Files/local/LeagueChannel.json'));
    var Names = fh.get('../Files/local/names.json');

    if (!fh.get('../Files/local/settings.json').checkForLOLGames || leaguechannel == undefined) { //Stop loop if boolean is false or leaguechannel is undefined
        return;
    }

    ws.on('error', function error() {
        message.channel.send('Websocket-Server is unreachable');
    })

    ws.on('open', function open() {

        for (let nameX in Names) {

            let name = Names[nameX];
            var bool = true;

            try {
               bool = (bot.users.get(name['id']).presence.game.timestamps != null) && (bot.users.get(name['id']).presence.game.name == 'League of Legends'); //Test if DiscordUser is ingame
            } catch (ignored) {
                bool = false;
            }

            if (name['lol'] != undefined && bool) { //Has LolName in names.json and is ingame

                ws.send('LeagueAPI ' + name['lol']); //Requests for every name that has a lol-name

            }
        }
        setTimeout(() => { //Loop
            leaguechannel = undefined;
            Names = undefined;
            ws = undefined;
            autoCheck(bot);

        }, 300000);
    });
    ws.on('message', function incoming(data) { //Answer

        if (data == 'ERROR') {
            return;
        }

        activeGames = JSON.parse(data);

        if (RunningGames.includes(activeGames[0])) { //Dont send message if there is already a message with this game
            return;
        }

        RunningGames.push(activeGames[0]);
        leaguechannel.send(makeEmbed(activeGames[1]));
    });
}