const fh = require('./FileHandler');
var localNames; // represents whatToDraw.json
const games = [
    'lol',
    'osu'
]

/**
 * @usage !name
 * @does Saves usernames for other Commands
 * @hasOwnHelp
 */
module.exports = {
    name: function (message) {
        localNames = fh.get('../Files/local/' + message.guild.id + '/names.json');

        let contentArgs = message.content.split(' ');

        if (!games.includes(contentArgs[2])) {
            message.channel.send('Not a valid game, use !help name for help');
            return;
        }

        if (contentArgs[1] == 'add') { //Add Person
            add(message, contentArgs[2], message.guild.id);
        }

        if (contentArgs[1] == 'remove') { //Remove Person
            remove(message, contentArgs[2], message.guild.id);
        }
        if (contentArgs[1] == 'get') {  //Get Name
            get(message, contentArgs[2]);
        }
    },


    /**
     * 
     * @param {String} game A vaild game name (const games) 
     * @param {String} id ID of the person to find
     * @param {*} guildID GuildID of that Person
     */
    getName: function (game, id, guildID) { //Only for other .js-Files
        return getP(game, id, guildID);
    },

    validGames: games
}

function add(message, game, guildID) { //!name add GAME NAME

    let id = message.author.id;
    let igname = message.content.substring(game.length + 10);

    if (!localNames[id]) { //Create Person if it doesnt exist
        localNames[id] = {};
    }

    localNames[id][game] = igname; //Add name to game

    writeJSON(guildID);
    message.channel.send('Added ' + igname + ' to your ' + game);

}

function remove(message, game, guildID) {//!name remove GAME

    let id = message.author.id;

    if (!localNames[id]) {
        message.channel.send('Person not found');
        return;
    }

    localNames[id][game] = undefined; //Remove name from game

    writeJSON(guildID);
    message.channel.send('Removed name from your ' + game);
}

function get(message, game) { //!name get GAME

    let id = message.author.id;

    if (!localNames[id]) {
        message.channel.send('Person not found');
        return;
    }

    message.channel.send(localNames[id][game]);
}

function getP(game, id, guildID) {
    try {
        return fh.get('../Files/local/' + guildID + '/names.json')[id][game];
    } catch (ignored) {
        return undefined;
    }
}

function writeJSON(guildID) { //Overwrites names.json with localNames
    fh.write('names.json', localNames, guildID);
}