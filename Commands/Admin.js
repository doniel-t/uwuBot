const { spawn } = require('child_process');
const fs = require('fs');
const version = require('../Files/version.json');
const Logger = require('./Logger.js');
const Settings = getSettings();

module.exports = {

    getLogFile: function (message) { //Bot will give you the current LogFile

        var logFile;
        let array = fs.readdirSync('.');

        for (var i = 0; i < array.length; i++) { //Search for File ending on .log
            if (array[i].endsWith('.log')) {
                logFile = array[i];
            }
        }

        if (logFile == null) {
            Logger.log("NO LOG FILE");
            message.channel.send("There is no LogFile");
        } else {
            message.channel.send("LogFile", { files: [logFile] }); //Send File
        }


    },

    isAdmin: function (message) { //Checks if User that called an AdminCommand is an Admin, is useless if called in Discord
        if (Admins.includes(message.author.id)) {
            return true;
        } else {
            Logger.log(message.author.username + " executed an Admin command");
            return false;
        }
    },

    update: function (message) { //Updates the Bot to the newest version on github, will restart the Bot so LogFile is lost
        message.channel.send("Updating now");

        let pro = spawn('start', ['cmd.exe', '/c', '.\\Files\\Updater.bat'], { shell: true });

        pro.on('exit', m => {
            process.exit(0);
        })

    },

    stop: function (message) { //Stops the Bot if called twice within 10 Seconds

        if (stopvar) {

            message.channel.send("Stoping now");
            process.exit(0);
        } else {

            message.channel.send("If you really want to stop the Bot call this function again within 10 sec");
            stopvar = true;
            setTimeout(function () { stopvar = false; }, 10000);
        }
    },

    restart: function () { //Restarts the Bot, will delete the LogFile until now so be careful

        let pro2 = spawn('start', ['cmd.exe', '/c', 'run.bat'], { shell: true });

        pro2.on('exit', m => {
            process.exit(0);
        })

    },

    toggleNeko: function (message) { //Toggles !neko Spamability

        Settings.canspamneko = !Settings.canspamneko;

        if (saveSettings()) {
            if (Settings.canspamneko) {
                message.channel.send("Can spam now");
            } else {
                message.channel.send("Can't spam now");
            }
        } else {
            message.channel.send('An Error occured while saving Settings');
        }
    },

    version: function (message) { //returns current version
        message.channel.send(version.version);
    },

    toggleEmojiDetection: function (message) { //Toggles if bot searches for emojis in every message

        Settings.emojiDetection = !Settings.emojiDetection;

        if (saveSettings()) {
            if (Settings.emojiDetection) {
                message.channel.send("Will detect Emojis");
            } else {
                message.channel.send("Won't detect Emojis");
            }
        } else {
            message.channel.send('An Error occured while saving Settings');
        }
    },
}

var Admins = [ //Add DiscordID for AdminAccess
    '270929192399536138', //ackhack
    '222398053703876628' //Human Daniel
]

var stopvar = false;

function saveSettings() { //Saves values to settings.json
    try {
        fs.writeFileSync('Files/local/settings.json', JSON.stringify(Settings));
        return true;
    } catch (error) {
        Logger.log(error);
        return false;
    }
}

function getSettings() {
    return require('../Files/local/settings.json');
}