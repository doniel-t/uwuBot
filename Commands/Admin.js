const Discord = require('discord.js')
const { spawn } = require('child_process');
const fh = require('./FileHandler');
const { version } = require('../package.json');
const Logger = require('./Logger');
const Channel = require('./Channel');

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
     * @summary Checks if User that called an AdminCommand is an Admin/Developer, is useless if called in Discord
     * @returns boolean
     */
    isAdmin: function (message) {
        if (this.isDev(message)) {
            return true;
        }
        return fh.get('../Files/local/' + message.guild.id + '/Admins.json').includes(message.author.id); //To be replaced with perServer-Check
    },

    /**
     * @summary Checks if User that called an AdminCommand is a Developer, is useless if called in Discord
     * @returns boolean
     */
    isDev: function (message) {
        return Devs.includes(message.author.id);
    },

    /**
     * @summary Updates the Bot to the newest version on github, will restart the Bot so LogFile is lost
     * @DevOnly
     */
    update: function (message) {
        if (this.isDev(message)) {
            message.channel.send("Updating now").then(_ => {

                spawn('start', ['cmd.exe', '/c', '.\\Files\\Updater.bat'], { shell: true })
                    .on('exit', _ => {
                        process.exit(0);
                    })
            });
        } else {
            message.channel.send('You are not a Developer');
        }
    },

    /**
     * @summary Stops the Bot if called twice within 10 Seconds
     * @DevOnly
     */
    stop: function (message, bot) {
        if (this.isDev(message)) {
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
        } else {
            message.channel.send('You are not a Developer');
        }
    },

    /**
     * @summary Restarts the Bot, will delete the LogFile until now so be careful
     * @DevOnly
     */
    restart: function (message) {
        if (this.isDev(message)) {
            message.channel.send('Restarting now').then(_ => {

                spawn('start', ['cmd.exe', '/c', 'run.bat'], { shell: true })
                    .on('exit', m => {
                        process.exit(0);
                    })
            })
        } else {
            message.channel.send('You are not a Developer');
        }
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
        Channel.set('League', message.channel.id, message.guild.id);
        message.channel.send('This is now the Standard LoL Channel');
    },

    /**
    * @summary sets the TwitchChannel to the current Channel
    */
    setTwitchChannel: function (message) {
        Channel.set('Twitch', message.channel.id, message.guild.id);
        message.channel.send('This is now the Standard Twitch Channel');
    },

    /**
    * @summary sets the StandardChannel to the current Channel
    */
    setStandardChannel: function (message) {
        Channel.set('Standard', message.channel.id, message.guild.id);
        message.channel.send('This is now the Standard Channel for automated Messages');
    },

    /**
     * @summary SettingsHandler
     * @returns Settings-Embed to Discord-Chat
     */
    settings: function (message, bot) {

        var Settings = fh.get('../Files/local/' + message.guild.id + '/settings.json'); //Get Settings
        var Emojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '⬜'];
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

                if (Devs.includes(user[0])) { //to be changed to perSever-Check

                    msg.clearReactions();

                    Settings[etn[emoji._emoji.name]] = !Settings[etn[emoji._emoji.name]];

                    if (!fh.write('settings.json', Settings, message.guild.id)) { //Save Settings to settings.json
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
    },
    /**
     * @summary Adds a DiscordUser to AdminList for this Server/Guild
     */
    addAdmin: function (message, bot) {
        let Admins = fh.get('../Files/local/' + message.guild.id + '/Admins.json');
        let user = message.content.substring(message.content.indexOf(' ') + 9);
        user = user.substring(4, user.length - 1);

        if (!bot.users.find(u => u.id == user)) {
            message.channel.send('No User tagged');
            return;
        }

        if (Admins.indexOf(user) == -1) {
            Admins.push(user);
            fh.write('Admins.json', Admins, message.guild.id);
            message.channel.send('Added <@!' + user + '> to the AdminList');

        } else {
            message.channel.send('<@!' + user + '> is already in the AdminList');
        }


    },
    /**
     * @summary Removes a DiscordUser to AdminList for this Server/Guild
     */
    removeAdmin: function (message, bot) {
        let Admins = fh.get('../Files/local/' + message.guild.id + '/Admins.json');
        let user = message.content.substring(message.content.indexOf(' ') + 12);
        user = user.substring(4, user.length - 1);

        if (!bot.users.find(u => u.id == user)) {
            message.channel.send('No User tagged');
            return;
        }

        if (Admins.indexOf(user) > -1) {
            Admins.splice(Admins.indexOf(user), 1);
            fh.write('Admins.json', Admins, message.guild.id);
            message.channel.send('Removed <@!' + user + '> from the AdminList');

        } else {
            message.channel.send('<@!' + user + '> is not on the AdminList');
        }
    },
    /**
     * @summary sets prefix of normal Commands (default: !)
     * @usage uwuadmin setPrefix PREFIX
     * @note if you want a space at the end, but \n instead => please\n
     */
    setPrefix: function (message) {

        let prefix = message.content.substring(message.content.indexOf(' ') + 11);
        if (prefix.endsWith('\\n')) {
            prefix = prefix.substring(0, prefix.length - 2) + ' ';
        }
        
        fh.write('prefix.json', prefix, message.guild.id);

        message.channel.send('Changed Prefix to: ' + prefix);
        Channel.get('Standard', message.guild.id).send(message.author.username + ' changed the Prefix to: \'' + prefix + '\'');
        let { updatePrefix } = require('../botMain');
        updatePrefix(prefix, message.guild.id);
    },
    /**
     * @returns Prefix to DiscordChat
     */
    getPrefix: function (message) {
        let { getPrefix } = require('../botMain');
        message.channel.send(getPrefix(message.guild.id));
    }
}

var Devs = [ //Add DiscordID for DevAccess
    '270929192399536138', //ackhack
    '222398053703876628' //Human Daniel
]

var stopvar = false;