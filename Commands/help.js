const fs = require("fs");

module.exports = {
    help: function(message) {

        var text = fs.readFileSync("./Files/helptext.txt").toString('utf-8'); //Read from helptext.txt

        message.channel.send(text);
    }
}