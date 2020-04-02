const fs = require('fs');
const Logger = require('./Logger');

module.exports = {
    get: function (Path) {

        if (Path == '../Files/local/settings.json') {
            return this.getSettings();
        }

        try {
            return require(Path);
        } catch (error) {
            Logger.log(error);
            return create(Path);
        }
    },

    write: function (Path, Object) {
        let splitted = Path.split('/');
        let Filename = splitted[splitted.length - 1];
        return writeFile('Files/local/' + Filename, Object);
    },

    getSettings: function () {
        var set;
        try {
            set = require('../Files/local/settings.json'); //Test if settings.json is valid

        } catch (ignored) { //No settings.json

            try {
                try {   //Try to create the local Folder
                    fs.mkdirSync('Files/local');
                } catch (ignored) { }

                fs.writeFileSync('Files/local/settings.json', JSON.stringify(require('../Files/initsettings.json'))); //Create settings.json
                return require('../Files/local/settings.json');

            } catch (error) {
                Logger.log(error);
                return require('../Files/initsettings.json');
            }
        }
        set = {};
        var initset = require('../Files/initsettings.json');

        for (var setting in initset) { //Test for new Settings in initsettings.json
            if (set[setting] == undefined) {
                set[setting] = initset[setting];
            }
        }

        try { //Write new Settings into settings.json
            fs.writeFileSync('Files/local/settings.json', JSON.stringify(set));
        } catch (error) {
            Logger.log(error);
        }

        return set;
    },

    readdirSync: function (path) { //just calls fs.readDirSync
        return fs.readdirSync(path);
    }
}

function create(Path) {

    let splitted = Path.split('/');
    let Filename = splitted[splitted.length - 1];
    let File;

    switch (Filename) {

        case 'counter.json':
            File = { "good": 0, "bad": 0 };
            break;

        case 'botToken.json':
            File = { "token": "" };
            break;

        case 'whatToDraw.json':
        case 'Streamers.json':
            File = [];
            break;

        case 'LeagueChannel.json':
        case 'TwitchChannel.json':
        case 'StandardChannel.json':
            File = "";
            break;

        case 'names.json':
            File = {};
            break;

        default:
            File = undefined;
            break;
    }
    writeFile('Files/local/' + Filename, File);
    return File;
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