const Logger = require("./Logger.js");
const jsonFile = require('../Files/help.json');

module.exports = {
    help: function (message) {
        try {
            for (var com in jsonFile) {
                var comm = jsonFile[com];
                message.channel.send(
                    "Command:   ".concat(com)
                    .concat('\nUsage:           ').concat(comm.usage)
                    .concat('\nDoes:             ').concat(comm.does)
                    .concat("\n-----------------------------------"));
            }
        } catch (error) {
            Logger.log(error);
            message.channel.send("Error in help.json");
        }

    }
}