const Discord = require('discord.js');

module.exports = {
    poll: function (message) {
        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        if (contentArgs[2] == null) {

            message.react('🤷');
            message.react('👎');
            message.react('👍');
        } else {

            let title = contentArgs[1];
            var args = [];
            let counter = 0;

            for (var x of contentArgs) {
                if (!(x == contentArgs[1] || x == contentArgs[0])) {
                    args[counter] = x;
                    counter++;
                }
            }

            const Embed = new Discord.RichEmbed().setTitle(title);

            for (var p = 0; p < args.length; p++) {
                Embed.addField(getEmote(p) + ' ' + args[p], '----');
            }

            message.channel.send(Embed).then(function (answer) {
                for (var o = 0; o < args.length; o++) {
                    answer.react(getEmote(o));
                }
            });
        }
    }
}

function getEmote(number) {
    switch (number) {
        case 0:
            return '0️⃣';
        case 1:
            return '1️⃣';
        case 2:
            return '2️⃣';
        case 3:
            return '3️⃣';
        case 4:
            return '4️⃣';
        case 5:
            return '5️⃣';
        case 6:
            return '6️⃣';
        case 7:
            return '7️⃣';
        case 8:
            return '8️⃣';
        case 9:
            return '9️⃣';
        default:
            return '👍';
    }
}