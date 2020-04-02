const fh = require('./FileHandler');
const localFile = 'names.json';
var localNames; // represents whatToDraw.json
const games = [
    'lol',
    'osu'
]

module.exports = {
    name: function (message) {
        localNames = fh.get('../Files/local/' + localFile);

        let contentArgs = message.content.split(' ');

        if (!games.includes(contentArgs[2])) {
            message.channel.send('Not a valid game, use !help name for help');
            return;
        }

        if (contentArgs[1] == 'add') { //Add Person
            add(message, contentArgs[2]);
        }

        if (contentArgs[1] == 'remove') { //Remove Person
            remove(message, contentArgs[2]);
        }
        if (contentArgs[1] == 'get') {  //Get Name
            get(message, contentArgs[2]);
        }
    },

    getName: function (game, name) { //Only for other .js-Files
        return getP(game, name);
    }
}

function add(message, game) { //!name add GAME NAME

    let name = message.author.username;
    let igname = message.content.substring(game.length + 10);

    if (!localNames[name]) { //Create Person if it doesnt exist
        localNames[name] = {};
    }

    localNames[name][game] = igname; //Add name to game
    localNames[name]['id'] = message.author.id;

    writeJSON();
    message.channel.send('Added ' + igname + ' to ' + name + '`s ' + game);

}

function remove(message, game) {//!name remove GAME

    let name = message.author.username;

    if (!localNames[name]) {
        message.channel.send('Person not found');
        return;
    }

    localNames[name][game] = undefined; //Remove name from game

    writeJSON();
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

function getP(game, name) {
    try {
        return fh.get('../Files/local/names.json')[name][game];
    } catch (ignored) {
        return undefined;
    }
}

function writeJSON() { //Overwrites names.json with localNames
    fh.write(localFile, localNames);
}