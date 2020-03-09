const redditAPI = require('./rngsub.js');

const talkedRecently = new Set();

module.exports = {
    neko: function (message) {

        if (!getSettings().canspamneko) {

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
        message.content = "con0 neko";
    } else {
        message.content = "con0 nekomimi";
    }
    redditAPI.rngsub(message);
}

function getSettings() {
    return require('../Files/local/settings.json');
}