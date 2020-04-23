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
        localNames = fh.get('../Files/local/'+ message.guild.id + '/names.json');

        let contentArgs = message.content.split(' ');

        if (!games.includes(contentArgs[2])) {
            message.channel.send('Not a valid game, use !help name for help');
            return;
        }

        if (contentArgs[1] == 'add') { //Add Person
            add(message, contentArgs[2],message.guild.id);
        }

        if (contentArgs[1] == 'remove') { //Remove Person
            remove(message, contentArgs[2],message.guild.id);
        }
        if (contentArgs[1] == 'get') {  //Get Name
            get(message, contentArgs[2]);
        }
    },

    getName: function (game, name, guildID) { //Only for other .js-Files
        return getP(game, name, guildID);
    }
}

function add(message, game, guildID) { //!name add GAME NAME

    let name = message.author.username;
    let igname = message.content.substring(game.length + 10);

    if (!localNames[name]) { //Create Person if it doesnt exist
        localNames[name] = {};
    }

    localNames[name][game] = igname; //Add name to game
    localNames[name]['id'] = message.author.id;

    writeJSON(guildID);
    message.channel.send('Added ' + igname + ' to ' + name + '`s ' + game);

}

function remove(message, game, guildID) {//!name remove GAME

    let name = message.author.username;

    if (!localNames[name]) {
        message.channel.send('Person not found');
        return;
    }

    localNames[name][game] = undefined; //Remove name from game

    writeJSON(guildID);
    message.channel.send('Removed name from ' + name + '`s ' + game);
}

function get(message, game) { //!name get GAME

    let name = message.author.username;

    if (!localNames[name]) {
        message.channel.send('Person not found');
        return;
    }

    message.channel.send(localNames[name][game]);
}

function getP(game, name, guildID) {
    try {
        return fh.get('../Files/local/'+ guildID +'/names.json')[name][game];
    } catch (ignored) {
        return undefined;
    }
}

function writeJSON(guildID) { //Overwrites names.json with localNames
    fh.write('names.json', localNames, guildID);
}