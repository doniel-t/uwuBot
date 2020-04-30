const WebSocket = require('ws');
const fh = require('./FileHandler');
const Channel = require('./Channel');

/**
 * @usage !twitch <optional: add> <NAME>
 * @does checks if Streamer is live or adds him to AutoCheck list
 */
module.exports = {
    twitch: function (message) {

        let Streamers = fh.get('../Files/local/' + message.guild.id + '/Streamers.json');
        let contentArgs = message.content.split(" ");

        if (contentArgs[1] == 'add') {

            if (!Streamers.includes(message.content.substring(contentArgs[0].length + 5))) {

                Streamers.push(message.content.substring(contentArgs[0].length + 5));
                fh.write('Streamers.json', Streamers, message.guild.id);
                message.channel.send(message.content.substring(contentArgs[0].length + 5) + ' has been added');
                return;

            } else {
                message.channel.send(message.content.substring(contentArgs[0].length + 5) + ' is already in List');
                return;
            }

        }

        let ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server
        let name = message.content.substring(contentArgs[0].length + 1);

        ws.on('error', function error() {
            message.channel.send('Websocket-Server is unreachable');
        })

        ws.on('open', function open() { //Request
            ws.send('TwitchAPI ' + name);

            ws.on('message', function incoming(data) { //Answer

                if (data.startsWith('ERROR')) {
                    message.channel.send('An Error occured or Player isn`t ingame');
                    return;
                }
                message.channel.send('https://www.twitch.tv/' + name + ' is ' + (data.startsWith('Online') ? 'online' : 'offline'));
                ws.close();
            });
        });
    },

    checkForStreams: function () {
        autoCheck();
    }
}

var ActiveStreamers = new Set(); //Saves which games have already been send
var Pairs = {}; //Saves Guild to Channel/Name
var CheckNames = {}; //Saves names which will be send to WS

function autoCheck() {

    let ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server


    ws.on('error', function error() {
        Channel.sendAll('Twitch', 'Twitch: Websocket-Server is unreachable');
    });

    ws.on('open', function open() {

        for (let guild of global.bot.guilds) { //Create Pairs for different Guilds
            Pairs[guild[0]] = {
                id: guild[0],
                TwitchChannel: Channel.get('Twitch', guild[0]),
                StandardChannel: Channel.get('Standard', guild[0])
            };
        }

        for (let p in Pairs) {
            let pair = Pairs[p];

            if (!fh.get('../Files/local/' + pair.id + '/settings.json').checkForTwitchStreams) { //Ignore Guilds with Settings off
                continue;
            }

            if (!pair.TwitchChannel && pair.StandardChannel) { //Ignore Guilds with missing Channels
                pair.StandardChannel.send('Please set a TwitchChannel or disable checkForLOLGames in Settings');
                continue;
            }

            for (let streamer of fh.get('../Files/local/' + pair.id + '/Streamers.json')) {

                if (!CheckNames[streamer]) { //Add Name to RequestList
                    CheckNames[streamer] = [pair.id];
                } else {
                    CheckNames[streamer].push(pair.id);
                }
            }
        }

        for (let name in CheckNames) { //Send RequestList
            ws.send('TwitchAPI ' + name);
        }

        setTimeout(() => { //Loop
            Pairs = {};
            autoCheck();
        }, 300000);
    });

    ws.on('message', function incoming(data) { //Answer

        if (data.startsWith('ERROR')) {
            return;
        }

        let response = data.split(' '); //0 status 1 name

        if (!ActiveStreamers.has(response[1]) && response[0] == 'Online') { //Dont send message if there is already a message with this game  

            for (let id of CheckNames[response[1]]) { //Send GameMessage to corresponding Guilds

                Pairs[id].TwitchChannel.send('https://www.twitch.tv/' + response[1] + ' is online');
            }
            ActiveStreamers.add(response[1]);
        }
        if (response[0] == 'Offline') {
            ActiveStreamers.delete(response[1]);
        }
    });
}