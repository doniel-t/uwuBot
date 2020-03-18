const fs = require('fs');
const Logger = require('./Logger');

module.exports = {
    get: function (Path) {
        try {
            return require(Path);
        } catch (error) {

            Logger.log(error);
            if (create(Path)) {
                return require(Path);
            } else {
                return undefined;
            }
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
                return undefined;
            }
        }

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
    }
}

function create(Path) {
    let splitted = Path.split('/');
    let Filename = splitted[splitted.length - 1];
    switch (Filename) {
        case 'whatToDraw.json':
            writeFile('Files/local/' + Filename, []);
            break;
        case 'LeagueChannel.json':
            writeFile('Files/local/' + Filename, "");
            break;
        case 'names.json':
            writeFile('Files/local/' + Filename, {});
            break;
    }
    return false;
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