const fs = require('fs');
const Logger = require('./Logger');

/**
 * @usage N/A
 * @does handels all File-related Actions
 */
module.exports = {

    /**
     * @summary Failsafe require(Path)
     * @param {string} Path eg '../Files/local/FILENAME'
     */
    get: function (Path) {

        try {
            return require(Path);
        } catch (error) {
            Logger.log('File not found :' + error);
            return create(Path);
        }
    },

    /**
     * @summary Failsafe fs.writeFileSync(Path,Object)
     * @param {string} Path Automatically goes to Files/local/guildID?/FILENAME
     * @param {Object} Object any Object (maybe use JSON.stringify)
     * @param {Number} guildID the guildID (message.guild.id)
     */
    write: function (Path, Object, guildID) {

        let splitted = Path.split('/');
        let Filename = splitted[splitted.length - 1];

        if (guildID) {
            if (!fs.existsSync('Files/local/' + guildID)) {
                fs.mkdirSync('Files/local/' + guildID);
            }
            return writeFile('Files/local/' + guildID + '/' + Filename, Object);

        } else {
            return writeFile('Files/local/' + Filename, Object);
        }
    },

    readdirSync: function (path) { //just calls fs.readDirSync
        return fs.readdirSync(path);
    },

    /**
     * @summary inits all settings.json
     */
    initSettings(bot) {

        try {   //Try to create the local Folder
            fs.mkdirSync('Files/local');
        } catch (ignored) { }

        const initset = require('../Files/initsettings.json');

        for (let guild of bot.guilds) {

            var set;
            try {
                set = require('../Files/local/' + guild[0] + '/settings.json'); //Test if settings.json is valid

            } catch (ignored) { //No settings.json

                try {   //Try to create the local Folder
                    fs.mkdirSync('Files/local/' + guild[0]);
                } catch (ignored) { }

                try {
                    fs.writeFileSync('Files/local/' + guild[0] + '/settings.json', JSON.stringify(initset)); //Create settings.json
                    set = undefined;
                    continue;
                } catch (error) {
                    Logger.log(error);
                }
            }

            for (let setting in initset) { //Test for new Settings in initsettings.json
                if (!set[setting]) {
                    set[setting] = initset[setting];
                }
            }

            try { //Write new Settings into settings.json
                fs.writeFileSync('Files/local/' + guild[0] + '/settings.json', JSON.stringify(set));
            } catch (error) {
                Logger.log(error);
            }
            set = undefined;
        }
    }
}

function create(Path) {

    let splitted = Path.split('/');
    let Filename = splitted[splitted.length - 1];
    let guildID = splitted[splitted.length - 2];
    let File;

    if (!isNaN(guildID) && !fs.existsSync('Files/local/' + guildID)) {
        fs.mkdirSync('Files/local/' + guildID);
    }

    switch (Filename) {

        case 'counter.json': //Only one per Bot
            writeFile('Files/local/botToken.json', { "good": 0, "bad": 0, "called": false });
            return;

        case 'botToken.json': //Only one per Bot
            writeFile('Files/local/botToken.json', { "token": "" });
            return;

        case 'whatToDraw.json': //Only one per Bot
            writeFile('Files/local/whatToDraw.json', []);
            return;

        case 'Streamers.json':
        case 'Admins.json':
            File = [];
            break;

        case 'LeagueChannel.json':
        case 'TwitchChannel.json':
        case 'StandardChannel.json':
            File = "";
            break;

        case 'names.json':
        case 'Channels.json':
            File = {};
            break;

        case 'settings.json': //Should never happen, but just in case
            File = require('../Files/initsettings.json');
            break;

        default:
            File = undefined;
            break;
    }
    return writeFile('Files/local/' + guildID + '/' + Filename, File) ? File : undefined;
}

function writeFile(Path, Object) {
    try {
        fs.writeFileSync(Path, JSON.stringify(Object));
        return true;
    } catch (error) {
        Logger.log(error);
        return false;
    }
}