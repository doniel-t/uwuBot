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
        localNames = fh.get('../Files/local/names.json');

        let contentArgs = message.content.split(' ');

        if (!games.includes(contentArgs[2])) {
            message.channel.send('Not a valid game, use !help name for help');
            return;
        }

        switch (contentArgs[1]) {
            case 'add': //Add Person
                add(message, contentArgs[2]);
                break;
            case 'remove': //Remove Person
                remove(message, contentArgs[2]);
                break;
            case 'get':  //Get Name
                get(message, contentArgs[2]);
                break;
            default:
                message.channel.send("No valid Argument given");
        }
    },


    /**
     * 
     * @param {String} game A vaild game name (const games) 
     * @param {String} id ID of the person to find
     */
    getName: function (game, id) { //Only for other .js-Files
        return getP(game, id);
    },

    validGames: games
}

function add(message, game) { //!name add GAME NAME

    let id = message.author.id;
    let igname = message.content.substring(game.length + 10);

    if (!localNames[id]) { //Create Person if it doesnt exist
        localNames[id] = {};
    }

    localNames[id][game] = igname; //Add name to game

    writeJSON();
    message.channel.send('Added ' + igname + ' to your ' + game);

}

function remove(message, game) {//!name remove GAME

    let id = message.author.id;

    if (!localNames[id]) {
        message.channel.send('Person not found');
        return;
    }

    localNames[id][game] = undefined; //Remove name from game

    writeJSON();
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

function getP(game, id) {
    try {
        return fh.get('../Files/local/names.json')[id][game];
    } catch (ignored) {
        return undefined;
    }
}

function writeJSON() { //Overwrites names.json with localNames
    fh.write('names.json', localNames);
}