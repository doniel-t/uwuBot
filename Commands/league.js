const Discord = require('discord.js');
const fh = require('./FileHandler');
const Channel = require('./Channel');
const WebSocket = require('ws');

/**
 * @usage !league <optional: leagueName>
 * @does returns LeagueGame from leagueName or savedName in name.json
 */
module.exports = {

    league: function (message) {

        name = getleagueName(message);

        if (!name) {
            message.channel.send('No name specified');
            return;
        }

        let ws = new WebSocket(global.wsip, { handshakeTimeout: 5000 }); //Connection to Server

        ws.on('error', function error() {
            message.channel.send('Websocket-Server is unreachable');
        })

        ws.on('open', function open() { //Request
            ws.send('LeagueAPI ' + name);

            ws.on('message', function incoming(data) { //Answer
                if (data.startsWith('ERROR')) {
                    message.channel.send('An Error occured or Player isn`t ingame: ' + data);
                    return;
                }

                message.channel.send(makeEmbed(JSON.parse(data)[1]));
                ws.close();
            });
        });
    },

    checkForLOLGames: function () {

        global.bot.on("presenceUpdate", function (_, newMember) {
            try {
                if (newMember.user.presence.game.name == 'League of Legends') {
                    if (newMember.user.presence.game.assets.largeText && !inGamePlayers.has(newMember.user.id)) { //Shows Champion of Player only in LoadingScreen/InGame
                        checkPlayer(newMember.user.id);
                        return;
                    }
                }
                checkedPlayers.delete(newMember.user.id);
                inGamePlayers.delete(newMember.user.id); //Remove Player if he isnt ingame
            } catch (ignored) { } //Not in a game
        });
    }
}

function makeEmbed(players) {
    return new Discord.RichEmbed().setColor('#0099ff').setTitle("League Game")

        .addField("Blue Team", '[' + players[0].name + '](' + 'https://euw.op.gg/summoner/userName=' + players[0].name.replace(/ /g, '_') + ')\n' +
            '[' + players[1].name + '](' + 'https://euw.op.gg/summoner/userName=' + players[1].name.replace(/ /g, '_') + ')\n' +
            '[' + players[2].name + '](' + 'https://euw.op.gg/summoner/userName=' + players[2].name.replace(/ /g, '_') + ')\n' +
            '[' + players[3].name + '](' + 'https://euw.op.gg/summoner/userName=' + players[3].name.replace(/ /g, '_') + ')\n' +
            '[' + players[4].name + '](' + 'https://euw.op.gg/summoner/userName=' + players[4].name.replace(/ /g, '_') + ')\n', true)

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

        .addField("Red Team", '[' + players[5].name + '](' + 'https://euw.op.gg/summoner/userName=' + players[5].name.replace(/ /g, '_') + ')\n' +
            '[' + players[6].name + '](' + 'https://euw.op.gg/summoner/userName=' + players[6].name.replace(/ /g, '_') + ')\n' +
            '[' + players[7].name + '](' + 'https://euw.op.gg/summoner/userName=' + players[7].name.replace(/ /g, '_') + ')\n' +
            '[' + players[8].name + '](' + 'https://euw.op.gg/summoner/userName=' + players[8].name.replace(/ /g, '_') + ')\n' +
            '[' + players[9].name + '](' + 'https://euw.op.gg/summoner/userName=' + players[9].name.replace(/ /g, '_') + ')\n', true)

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
        return require('./name').getName('lol', message.author.id); //Get name from local/names.json
    } else {
        return message.content.substring(contentArgs[0].length + 1); //When Name given
    }
}

var RunningGames = []; //Saves which games have already been sent
var Pairs = {}; //Saves Guild to Channel/Name
var first = true;
var inGamePlayers = new Set(); //Players that are inGame
var checkedPlayers = new Set(); //Players that have been checked

function checkPlayer(user) {

    inGamePlayers.add(user);

    if (first) {
        first = false;
    } else {
        return;
    }


    setTimeout(_ => { //Wait a second for more PresenceUpdates
        let ws = new WebSocket(global.wsip, { handshakeTimeout: 5000 }); //Connection to Server
        let names = fh.get('../Files/local/names.json')

        ws.on('error', function error() {
            Channel.sendAll('League', 'League: Websocket-Server is unreachable');
        });

        ws.on('open', function open() {

            for (let guild of global.bot.guilds) { //Create Pairs for different Guilds
                Pairs[guild[0]] = {
                    LeagueChannel: Channel.get('League', guild[0]),
                    StandardChannel: Channel.get('Standard', guild[0]),
                };
            }

            for (let id of inGamePlayers) { //Check every id of NameStack
                if (names[id] && !checkedPlayers.has(id)) {
                    checkedPlayers.add(id);
                    if (names[id]['lol']) {
                        ws.send('LeagueAPI ' + names[id]['lol']);
                    }
                }
            }
            first = true;
        });

        ws.on('message', function incoming(data) { //Answer

            if (data.startsWith('ERROR')) {
                return;
            }

            let response = JSON.parse(data);

            //response[0] == gameID
            //response[1] == gameObject
            //response[2] == ingame name of requester

            if (!RunningGames.includes(response[0])) { //Dont send message if there is already a message with this game   

                RunningGames.push(response[0]);

                let nameIndex = '';

                for (let name in names) {
                    if (names[name].lol == response[2]) {
                        nameIndex = names[name];
                        break;
                    }
                }

                for (let id of nameIndex.guilds) { //Send GameMessage to corresponding Guilds

                    if (!global.guilds[id].settings.checkForLOLGames) { //Ignore Guilds with Settings off
                        continue;
                    }

                    if (!Pairs[id].LeagueChannel && Pairs[id].StandardChannel) { //Ignore Guilds with missing Channels
                        Pairs[id].StandardChannel.send('Please set a LeagueChannel or disable checkForLOLGames in Settings');
                        continue;
                    }

                    Pairs[id].LeagueChannel.send(makeEmbed(response[1]));
                }
            }
        });
    }, 1000)
}