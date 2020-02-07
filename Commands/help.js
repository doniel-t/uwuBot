const file = require('../Files/helptext.json');

module.exports = {
    help: function(message) {

        var textarray = file.helpList;
        var text = '';

        for (var line of textarray) {
            text = text.concat(line).concat('\n');
        }

        message.channel.send(text);
    }
}