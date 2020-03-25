const WebSocket = require('ws');
const fh = require('./FileHandler');
var Streamers = fh.get('../Files/local/Streamers.json');
var OnlineStreamers = new Set();

module.exports = {
    twitch: function (message) {

        let contentArgs = message.content.split(" ");

        if (contentArgs[1] == 'add') {

            if (!Streamers.includes(message.content.substring(contentArgs[0].length + 5))) {

                Streamers.push(message.content.substring(contentArgs[0].length + 5));
                fh.write('../Files/local/Streamers.json', Streamers);
                message.channel.send(message.content.substring(contentArgs[0].length + 5) + ' has been added');
                return;

            } else {
                message.channel.send(message.content.substring(contentArgs[0].length + 5) + ' is already in List');
                return;
            }

        }

        var ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server
        let name = message.content.substring(contentArgs[0].length + 1);

        ws.on('error', function error() {
            message.channel.send('Websocket-Server is unreachable');
        })

        ws.on('open', function open() { //Request
            ws.send('TwitchAPI ' + name);

            ws.on('message', function incoming(data) { //Answer

                if (data == 'ERROR') {
                    message.channel.send('An Error occured or Player isn`t ingame');
                    return;
                }

                if (data.startsWith('Online')) {
                    message.channel.send('https://www.twitch.tv/' + name + ' is online');
                } else {
                    message.channel.send('https://www.twitch.tv/' + name + ' is offline');
                }
            });
        });
    },

    checkForStreams: function (bot) {
        autoCheck(bot);
    }
}

function autoCheck(bot) {

    var ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server
    var Names = fh.get('../Files/local/Streamers.json');
    var twitchchannel = bot.channels.get(fh.get('../Files/local/TwitchChannel.json'));

    ws.on('error', function error() {
        twitchchannel.send('Twitch: Websocket-Server is unreachable');
    })

    if (!fh.get('../Files/local/settings.json').checkForTwitchStreams || twitchchannel == undefined) { //Stop loop if boolean is false or twitchchannel is undefined
        return;
    }

    ws.on('open', function open() {
        for (let name in Names) {

            ws.send('TwitchAPI ' + Names[name]); //Requests for every Streamer in Streamers.json
        }
        setTimeout(() => { //Loop
            Names = undefined;
            ws = undefined;
            autoCheck(bot);
        }, 60000);
    })

    ws.on('message', function incoming(data) { //Answer

        if (data == 'ERROR') {
            return;
        }

        let name = data.substring(7);

        if (data.startsWith('Online')) {
            if (!OnlineStreamers.has(name)) {
                OnlineStreamers.add(name);
                twitchchannel.send('https://www.twitch.tv/' + name + ' is online');
            }
        } else {
            if (OnlineStreamers.has(name)) {
                OnlineStreamers.delete(name);
            }
        }
    });
}