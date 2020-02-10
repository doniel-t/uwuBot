const fs = require('fs');
const LogFile = 'Bot.log';

module.exports = {
    log: function(error) {
        console.log(error);
    },

    get: function(message) {
        message.channel.send("Clear Log manual", { files: ["./Bot.log"] });
    },

    isAdmin: function(message) {
        if (message.author.id == '270929192399536138' || message.author.id == '222398053703876628') {
            return true;
        } else {
            console.log(message.author.username + " executed an Admin command");
        }
    }
}