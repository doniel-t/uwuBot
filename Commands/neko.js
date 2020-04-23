const fh = require('./FileHandler');
const talkedRecently = new Set();

/**
 * @usage !neko
 * @does gives you a random Post from r/neko
 */
module.exports = {
    neko: function (message) {

        if (!fh.get('../Files/local/' + message.guild.id + '/settings.json').canspamneko) {

            if (talkedRecently.has(message.author.id)) {
                message.channel.send("Wait 15 Seconds before typing this again. - " + message.author);

            } else {

                execneko(message);

                talkedRecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(message.author.id);
                }, 15000);
            }
        } else {
            execneko(message);
        }
    }
}

function execneko(message) {

    if (Math.random() <= 0.5) {
        message.content = "con0 nekomimi"; //The same until r/neko is public again
    } else {
        message.content = "con0 nekomimi";
    }
    require('./rngsub').rngsub(message);
}