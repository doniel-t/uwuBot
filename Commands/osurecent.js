const Discord = require('discord.js');
const WebSocket = require('ws');

/**
 * @usage !osurecent <optional: osuName>
 * @does returns latest osu play (passed or not passed) from osuName or savedName in name.json
 */
module.exports = {

    osurecent: function (message, bot) { //Gets most recent Play(passed or unpassed)

        let ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server

        name = getosuName(message);

        ws.on('open', function open() { //Request

            ws.send('osuAPI recent ' + name);

        });

        ws.on('error', function error(){
            message.channel.send('Websocket-Server is unreachable');
        })

        ws.on('message', function incoming(data) { //Answer

            if (data == 'ERROR') {
                message.channel.send('Username not found or this user has not played today!');
                return;
            }

            result = JSON.parse(data);
            recentScore = result[0];

            let ObjectCount = Number.parseInt(recentScore._beatmap.objects.normal) +
                Number.parseInt(recentScore._beatmap.objects.slider) +
                Number.parseInt(recentScore._beatmap.objects.spinner);

            let ScoreCount = Number.parseInt(recentScore.counts["50"]) +
                Number.parseInt(recentScore.counts["100"]) +
                Number.parseInt(recentScore.counts["300"]) +
                Number.parseInt(recentScore.counts["miss"]);

            let Acc = parseFloat(result[2] * 100).toFixed(2);
            let percentagePassed = (ScoreCount / ObjectCount) * 100;
            let parsedMods = result[1];

            let emb = new Discord.RichEmbed()
                .setTitle(recentScore._beatmap.artist + ' - ' + recentScore._beatmap.title)
                .setURL('https://osu.ppy.sh/beatmapsets/' + recentScore._beatmap.beatmapSetId + '#osu/' + recentScore._beatmap.id)
                .setColor('#0099ff')
                .setFooter(recentScore.raw_date)
                .addField('Score', recentScore.score, true)
                .addField('Combo', recentScore.maxCombo, true)
                .addField('BPM', recentScore._beatmap.bpm, true)

                .addField('Status', recentScore._beatmap.approvalStatus, true)
                .addField('Passed', percentagePassed.toFixed(2).concat("%"), true)

            if (!(parsedMods === "" || parsedMods == null)) {
                emb.addField('Mods', parsedMods, true);
            } else {
                emb.addBlankField(true);
            }

            emb.addField('Difficulty', recentScore._beatmap.version, true)
                .addField('StarRating', parseFloat(recentScore._beatmap.difficulty.rating).toFixed(2), true)
                .addBlankField(true)


            emb.addField('Accuracy', Acc + '%', true)
                .addField('Hits', recentScore.counts["300"].concat(getEmoji('hit300', bot) + " ")
                    .concat(recentScore.counts["100"]).concat(getEmoji('hit100', bot) + " ")
                    .concat(recentScore.counts["50"]).concat(getEmoji('hit50', bot) + " ")
                    .concat(recentScore.counts["miss"]).concat(getEmoji('hit0', bot) + " "), true)

                .setImage('https://assets.ppy.sh/beatmaps/' + recentScore._beatmap.beatmapSetId + '/covers/cover.jpg');

            message.channel.send(emb);
            ws.close();
        });
    }
}

function getosuName(message) {       //Gives back a NameString 

    let contentArgs = message.content.split(" ");

    return contentArgs[1] ? message.content.substring(contentArgs[0].length+1) : require('./name').getName('osu',message.author.username,message.guild.id);
}

function getEmoji(emojiName, bot) {
    let emoji = bot.emojis.find(e => e.name == emojiName);   //get Emoji from Server
    return '<:' + emoji.name + ':' + emoji.id + '>'; //Build emojiString
}