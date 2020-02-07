const Logger = require('../Logger.js');
const fs = require('fs');

module.exports = {
    help: function(message) {
        try {
            var text = fs.readFileSync("./Files/helptext.txt").toString('utf-8'); //Read from helptext.txt
        } catch(error) {
            Logger.log(error);
        }
        
        message.channel.send(text);
    }
}