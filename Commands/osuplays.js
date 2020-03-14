const Discord = require('discord.js');
const WebSocket = require('ws');

module.exports = {
    osuplays: function (message) { //Gets Top 5 PP Plays!

        const ws = new WebSocket('ws://leftdoge.de:60001'); //Connection to Server
        
        name = getosuName(message);

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
            
            var emb = new Discord.RichEmbed()
                .setTitle(name + '`s Top 5 Plays');
            for (let index = 0; index < 5; index++) {
                let Link = '[' + [scores[index]._beatmap.title] + '](https://osu.ppy.sh/beatmapsets/' + scores[index]._beatmap.beatmapSetId + '#osu/' + scores[index]._beatmap.id + ')';
                let n = index+1;
                emb.addField('#' + n,
                    Link.concat("\nAcc: ").concat(parseFloat(AccArray[index] * 100).toFixed(2)).concat(" %\nPP: ").concat(scores[index].pp));
            }
            message.channel.send(emb);
        });
    }
}

function getosuName(message) {       //Gives back a NameString 

    let contentArgs = message.content.split(" ");

    if (contentArgs[1] == null) {   //Hardcoded Names
        switch (message.author.username) {

            case "ackhack":         //Discordname
                return "ackh4ck";   //osuname

            case "Human Daniel":
                return "Human Daniel";

            case "DragonHunter428":
                return "DH428";

            case 'Yalina':
                return 'IIAleII';

            default:
                return "No User given";
        }
    }
    else {
        return message.content.substring(contentArgs[0].length+1);  //When Name given
    }
}