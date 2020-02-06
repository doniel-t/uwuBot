const Discord = require('discord.js');
const requireDir = require('require-dir');
const bot = new Discord.Client();

module.exports = {
    nhentai: function(message) {
        let contentArgs = message.content.split(" "); //Split Message for simpler Access
        message.channel.send("https://nhentai.net/g/".concat(contentArgs[1]));
    }
}