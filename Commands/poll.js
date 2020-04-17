const Discord = require('discord.js');

/**
 * @usage !poll <title> or !poll <title>; <option 1>; <option 2>; ... <option n>
 * @does gives you a reaction poll or gives you a poll based on your title
 */
module.exports = {
    poll: function (message) {
        let contentArgs = message.content.split(";"); //Split Message for simpler Access

        if (message.content.indexOf(';') == -1) {   //If no ; is given do React Poll

            message.react('🤷');
            message.react('👎');
            message.react('👍');
        } else {

            let title = contentArgs[0].substring(contentArgs[0].indexOf(' '));  //Get Title
            var args = [];
            let counter = 0;

            for (var x of contentArgs) {  //Get Answers excludeding contentArgs[0] becuase its the Title
                if (x != contentArgs[0]) {
                    args[counter] = x;
                    counter++;
                }
            }

            const Embed = new Discord.RichEmbed().setTitle(title);  //Build an Embeded Message

            for (var p = 0; p < args.length; p++) {
                Embed.addField(getEmote(p) + ' ' + args[p], '----');
            }

            message.channel.send(Embed).then(function (answer) {
                for (var o = 0; o < args.length; o++) { //Reacts to message with Emojis
                    answer.react(getEmote(o));
                }
            });
        }
    }
}

function getEmote(number) { //Returns an Emoji
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