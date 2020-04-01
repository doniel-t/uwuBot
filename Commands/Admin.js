const Discord = require('discord.js')
const { spawn } = require('child_process');
const fh = require('./FileHandler');
const version = require('../Files/version.json');
const Logger = require('./Logger.js');

module.exports = {

    getLogFile: function (message) { //Bot will give you the current LogFile

        var logFile;
        let array = fh.readdirSync('.');

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

    version: function (message) { //returns current version
        message.channel.send(version.version);
    },

    setLeagueChannel: function (message) {
        fh.write('Files/local/LeagueChannel.json', message.channel.id);
        message.channel.send('This is now the Standard LoL Channel');
    },

    setTwitchChannel: function (message) {
        fh.write('Files/local/TwitchChannel.json', message.channel.id);
        message.channel.send('This is now the Standard Twitch Channel');
    },

    settings: function (message, bot) { //SettingsHandler
        var Settings = fh.getSettings(); //Get Settings
        var etn = {};
        var msg;
        var i = 0;

        var Emojis = [
            '0️⃣',
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣',
            '6️⃣',
            '7️⃣',
            '8️⃣',
            '9️⃣',
            '🔟',
            '⬜'
        ]

        var writeMessage = function () { //Returns Embed Message
            var emb = new Discord.RichEmbed().setTitle('Settings (Will be removed after 5 minutes)');

            for (let setting in Settings) {
                emb.addField(Emojis[i] + ' ' + setting, Settings[setting]);
                etn[Emojis[i]] = setting;
                i++;
            }
            return emb;
        }

        var listener = function (emoji) { //EmojiListener

            Settings[etn[emoji._emoji.name]] = !Settings[etn[emoji._emoji.name]];

            if (Settings[etn[emoji._emoji.name]]) { //Custom Commands for some Settings
                switch (etn[emoji._emoji.name]) {
                    case 'checkForLOLGames':
                        require('./league').checkForLOLGames(bot);
                        break;
                    case 'checkForTwitchStreams':
                        require('./twitch').checkForStreams(bot);
                        break;
                    default:
                        break;
                }
            }

            if (!saveSettings(Settings)) { //Save Settings to settings.json
                message.channel.send('An Error occured while saving Settings');
            }
            i = 0;
            msg.edit(writeMessage());
        }

        message.channel.send(writeMessage()).then(ans => {
            msg = ans;

            for (let x = 0; x < i; x++) {
                ans.react(Emojis[x]);
            }

            collector = ans.createReactionCollector(m => m.users.has(message.author.id)); //Emoji Listener
            collector.on('collect', listener);

            ans.delete(300000); //Delete Message after 5 minutes
        })
    }
}

var Admins = [ //Add DiscordID for AdminAccess
    '270929192399536138', //ackhack
    '222398053703876628' //Human Daniel
]

var stopvar = false;

function saveSettings(Settings) { //Saves values to settings.json
    return fh.write('Files/local/settings.json', Settings);
}