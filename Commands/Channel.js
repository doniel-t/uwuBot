const Logger = require('./Logger');
const fh = require('./FileHandler');
/**
* @usage N/A
* @does ChannelHandler for multiple Servers/Guilds
*/
module.exports = {
   /**
    * @param {String} name Name of the Channel eg. Standard
    * @param {Number} guildID The guildID (message.guild.id)
    */
   get: function (name, guildID) {
      return get(name, guildID);
   },
   /**
    * @param {String} name Name of the Channel eg. Standard
    */
   getAll: function (name) {
      return getAll(name);
   },
   /**
    * @param {String} name Name of the Channel eg. Standard
    * @param {Number} channelID The channelID (message.channel.id)
    * @param {Number} guildID The guildID (message.guild.id)
    */
   set: function (name, channelID, guildID) {
      return set(name, channelID, guildID);
   },
   /**
    * @param {String} name Name of the Channels eg. Standard
    * @param {String} msg Message to send
    */
   sendAll: function (name, msg) {
      return sendAll(name, msg);
   },
}

function get(name, guildID) {
   try {
      let Channels = fh.get('../Files/local/' + guildID + '/Channels.json');   
      return global.bot.channels.get(Channels[name]);

   } catch (err) {     
      Logger.log(err);
      return undefined;
   }
}

function set(name, channelID, guildID) {
   try {
      let Channels = fh.get('../Files/local/' + guildID + '/Channels.json');
      Channels[name] = channelID;
      return fh.write('Channels.json', Channels, guildID);
   } catch (err) {
      Logger.log(err);
      return false;
   }
}

function getAll(name) {
   let arr = {};
   for (let guild of global.bot.guilds) {
      arr[guild.id] = get(name, guild.id);
   }
   return arr;
}

function sendAll(name, msg) {
   for (let guild of global.bot.guilds) {
      try {
         get(name, guild[1].id).send(msg);
      }catch (ignored) {}
   }
}