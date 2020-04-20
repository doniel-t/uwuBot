const Discord = require('discord.js')
const { spawn } = require('child_process');
const fh = require('./FileHandler');
const { version } = require('../package.json');
const Logger = require('./Logger.js');

/**
 * @usage uwuadmin <command>
 * @does will execute given Command
 * @hasOwnHelp
 */
module.exports = {

    /**
     * @summary Bot will give you the current LogFile
     * @returns LogFile to Discord-Chat 
     */
    getLogFile: function (message) {

        let array = fh.readdirSync('.');

        for (var i = 0; i < array.length; i++) { //Search for File ending on .log
            if (array[i].endsWith('.log')) {
                message.channel.send("LogFile", { files: [array[i]] }); //Send File
                return;
            }
        }

        Logger.log("NO LOG FILE");
        message.channel.send("There is no LogFile");
    },

    /**
     * @summary Checks if User that called an AdminCommand is an Admin, is useless if called in Discord
     * @returns boolean
     */
    isAdmin: function (message) {
        return Admins.includes(message.author.id);
    },

    /**
     * @summary Updates the Bot to the newest version on github, will restart the Bot so LogFile is lost
     */
    update: function (message, bot) {
        message.channel.send("Updating now").then(_ => {

            spawn('start', ['cmd.exe', '/c', '.\\Files\\Updater.bat'], { shell: true })
                .on('exit', _ => {
                    process.exit(0);
                })
        });
    },

    /**
     * @summary Stops the Bot if called twice within 10 Seconds
     */
    stop: function (message, bot) {

        if (stopvar) {

            message.channel.send("Stopping now").then(_ => {
                bot.user.setPresence({ game: { name: 'on ' + version }, status: 'offline' }).then(_ => {
                    process.exit(0);
                })
            });

        } else {

            message.channel.send("If you really want to stop the Bot call this function again within 10 sec");
            stopvar = true;
            setTimeout(function () { stopvar = false; }, 10000);
        }
    },

    /**
     * @summary Restarts the Bot, will delete the LogFile until now so be careful
     */
    restart: function (message) {
        message.channel.send('Restarting now').then(_ => {

            ('start', ['cmd.exe', '/c', 'run.bat'], { shell: true })
                .on('exit', m => {
                    process.exit(0);
                })
        })
    },

    /**
     * @summary returns current version
     */
    version: function (message) {
        message.channel.send(version);
    },

    /**
    * @summary sets the LeagueChannel to the current Channel
    */
    setLeagueChannel: function (message) {
        fh.write('LeagueChannel.json', message.channel.id);
        message.channel.send('This is now the Standard LoL Channel');
    },

    /**
    * @summary sets the TwitchChannel to the current Channel
    */
    setTwitchChannel: function (message) {
        fh.write('TwitchChannel.json', message.channel.id);
        message.channel.send('This is now the Standard Twitch Channel');
    },

    /**
    * @summary sets the StandardChannel to the current Channel
    */
    setStandardChannel: function (message) {
        fh.write('StandardChannel.json', message.channel.id);
        message.channel.send('This is now the Standard Channel for automated Messages');
    },

    /**
     * @summary SettingsHandler
     * @returns Settings-Embed to Discord-Chat
     */
    settings: function (message, bot) {
        
        var Settings = fh.getSettings(); //Get Settings
        var Emojis = ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','⬜'];
        var etn = {};
        var msg;

        var writeMessage = function () { //Returns Embed Message
            var emb = new Discord.RichEmbed().setTitle('Settings (Will be removed after 5 minutes)');

            let i = 0;
            for (let setting in Settings) {
                emb.addField(Emojis[i] + ' ' + setting, Settings[setting]);
                etn[Emojis[i]] = setting;
                i++;
            }
            return emb;
        }

        var listener = function (emoji) { //EmojiListener

            emoji.users.delete(bot.user.id);

            if (Settings[etn[emoji._emoji.name]] == undefined) {
                return;
            }

            for (let user of emoji.users) {

                if (Admins.includes(user[0])) {

                    msg.clearReactions();

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

                    msg.edit(writeMessage());
                    for (let x = 0; x < Object.keys(Settings).length; x++) {
                        msg.react(Emojis[x]);
                    }
                }
            }
        }

        message.channel.send(writeMessage()).then(ans => {
            msg = ans;

            for (let x = 0; x < Object.keys(Settings).length; x++) {
                ans.react(Emojis[x]);
            }

            collector = ans.createReactionCollector(x => true); //Emoji Listener
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
    return fh.write('settings.json', Settings);
}