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
        
        let ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server

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
                ws.close();
            });
        });
    },

    checkForLOLGames: function (bot) {
        autoCheck(bot);
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
        return require('./name').getName('lol', message.author.username,message.guild.id); //Get name from local/names.json
    } else {
        return message.content.substring(contentArgs[0].length + 1); //When Name given
    }
}

var RunningGames = []; //Saves which games have already been send
var Pairs = {}; //Saves Guild to Channel/Name
var CheckNames = {}; //Saves names which will be send to WS

function autoCheck(bot) {

    let ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server

    ws.on('error', function error() {
        Channel.sendAll('League', 'League: Websocket-Server is unreachable');
    });

    ws.on('open', function open() {

        for (let nameX in CheckNames) { //Remove name if Person is not inGame
            let name = CheckNames[nameX];
            let bool = true;
    
            try {
                bool = (bot.users.get(name['id']).presence.game.timestamps) && (bot.users.get(name['id']).presence.game.name == 'League of Legends'); //Test if DiscordUser is ingame
            } catch (ignored) {
                bool = false;
            }
            if (!bool) {
                delete CheckNames[nameX];
            }
        }
    
        for (let guild of bot.guilds) { //Create Pairs for different Guilds
            Pairs[guild[0]] = {
                id: guild[0],
                LeagueChannel: Channel.get('League', guild[0]),
                StandardChannel: Channel.get('Standard', guild[0]),
                Names: fh.get('../Files/local/' + guild[0] + '/names.json')
            };
        }
        
        for (let p in Pairs) { //Create Object with LoL-Name with Array of Guilds
    
            let pair = Pairs[p];
            
            if (!fh.get('../Files/local/' + pair.id + '/settings.json').checkForLOLGames) { //Ignore Guilds with Settings off
                continue;
            }
    
            if (!pair.LeagueChannel && pair.StandardChannel) { //Ignore Guilds with missing Channels
                pair.StandardChannel.send('Please set a LeagueChannel or disable checkForLOLGames in Settings');
                continue;
            }
    
            for (let nameX in pair.Names) { //Add names to RequestList
                let name = pair.Names[nameX];
    
                let bool = true;
    
                try {
                    bool = (bot.users.get(name['id']).presence.game.timestamps) && (bot.users.get(name['id']).presence.game.name == 'League of Legends'); //Test if DiscordUser is ingame
                } catch (ignored) {
                    bool = false;
                }
                
                if (name['lol'] && bool) { //Has LolName in names.json and is ingame
                    if (!CheckNames[name.lol]) { //Add Name to RequestList
                        CheckNames[name.lol] = { id: name['id'], guilds: [pair.id] };
                    } else {
                        CheckNames[name.lol].guilds.push(pair.id);
                    }
                }
            }
        }

        for (let name in CheckNames) { //Send RequestList   
            ws.send('LeagueAPI ' + name);
        }

        setTimeout(() => { //Loop
            Pairs = {};
            autoCheck(bot);
        }, 300000);
    });

    ws.on('message', function incoming(data) { //Answer

        if (data == 'ERROR') {
            return;
        }

        let response = JSON.parse(data);

        if (!RunningGames.includes(response[0])) { //Dont send message if there is already a message with this game   

            for (let id of CheckNames[response[2]].guilds) { //Send GameMessage to corresponding Guilds
                
                Pairs[id].LeagueChannel.send(makeEmbed(response[1]));
            }
            RunningGames.push(response[0]);
        }
    });
}
