const Discord = require('discord.js');
const fh = require('./FileHandler');
const WebSocket = require('ws');
const champions = require('../Files/champions.json');
const RunningGames = [];

module.exports = {

    league: function (message) {

        var ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server
        var name = getleagueName(message);

        ws.on('error', function error() {
            message.channel.send('Websocket-Server is unreachable');
        })

        ws.on('open', function open() { //Request
            ws.send('LeagueAPI ' + name);

            ws.on('message', function incoming(data) { //Answer

                if (data == 'ERROR') {
                    message.channel.send('An Error occured or Player isn`t ingame');
                    return;
                }

                sendMessage(message.channel, JSON.parse(data));
            });
        });
    },

    checkForLOLGames: function (bot) {
        autoCheck(bot);
    }
}

function getChamp(ID) {
    for (var champ in champions.data) {
        if (champions.data[champ].key == ID) {
            return champ;
        }
    }
}

function getleagueName(message) { //Gives back a NameString 

    let contentArgs = message.content.split(" ");

    if (contentArgs[1] == null) { //Hardcoded Names
        return require('./name').getName('lol', message.author.username); //Get name from local/names.json
    } else {
        return message.content.substring(contentArgs[0].length + 1);  //When Name given
    }
}

function sendMessage(channel, activeGames) { //Sends a message to channel with given activeGames

    try {
        let mes = new Discord.RichEmbed();
        mes.setTitle('LEAGUE GAME');

        for (var x = 0; x < 5; x++) {
            let Link1 = '[' + activeGames.participants[x].summonerName + '](' + 'https://euw.op.gg/summoner/userName=' + activeGames.participants[x].summonerName.replace(/ /g, '_') + ')';
            mes.addField(getChamp(activeGames.participants[x].championId), Link1, true);

            if (x == 0) {
                mes.addField('VS', 'VS', true);
            } else {
                mes.addBlankField(true);
            }

            let Link2 = '[' + activeGames.participants[x + 5].summonerName + '](' + 'https://euw.op.gg/summoner/userName=' + activeGames.participants[x + 5].summonerName.replace(/ /g, '_') + ')';
            mes.addField(getChamp(activeGames.participants[x + 5].championId), Link2, true);
        }
        channel.send(mes);
    } catch (ignored) { }
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
                bool = (bot.users.get(name.id).presence.game.timestamps != null) && (bot.users.get(name.id).presence.game.name == 'League of Legends'); //Test if DiscordUser is ingame
            } catch (ignored) {
                bool = false;
            }

            if (name.lol != undefined && bool) { //Has LolName in names.json and is ingame

                ws.send('LeagueAPI ' + name.lol); //Requests for every name that has a lol-name

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

        if (RunningGames.includes(activeGames.gameId)) { //Dont send message if there is already a message with this game
            return;
        }

        RunningGames.push(activeGames.gameId);
        sendMessage(leaguechannel, activeGames);
    });
}