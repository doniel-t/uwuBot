const Discord = require('discord.js');
const WebSocket = require('ws');

/**
 * @usage !osuplays <optional: osuName>
 * @does returns 5 best osu plays from osuName or savedName in name.json
 */
module.exports = {
    osuplays: function (message) { //Gets Top 5 PP Plays!

        let ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server
        
        name = getosuName(message);
        
        ws.on('error', function error(){
            message.channel.send('Websocket-Server is unreachable');
        })

        ws.on('open', function open() { //Request
            ws.send('osuAPI plays ' + name);
        });

        ws.on('message', function incoming(data) { //Answer

            if (data == 'ERROR') {
                message.channel.send('Username not found or this user has no TopPlays!');
                return;
            }
            
            result = JSON.parse(data);
            scores = result[0];
            AccArray = result[1];
            
            let emb = new Discord.RichEmbed()
                .setTitle(name + '`s Top 5 Plays');
            for (let index = 0; index < 5; index++) {
                let Link = '[' + [scores[index]._beatmap.title] + '](https://osu.ppy.sh/beatmapsets/' + scores[index]._beatmap.beatmapSetId + '#osu/' + scores[index]._beatmap.id + ')';
                let n = index+1;
                emb.addField('#' + n,
                    Link.concat("\nAcc: ").concat(parseFloat(AccArray[index] * 100).toFixed(2)).concat(" %\nPP: ").concat(scores[index].pp));
            }
            message.channel.send(emb);
            ws.close();
        });
    }
}

function getosuName(message) {       //Gives back a NameString 

    let contentArgs = message.content.split(" ");

    return contentArgs[1] ? message.content.substring(contentArgs[0].length+1) : require('./name').getName('osu',message.author.username,message.guild.id);
}