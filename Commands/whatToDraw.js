const prompts = require('../Files/prompt.json');

module.exports = {
    whatToDraw: function(message) {
        var promtList = prompts.prompts;
        message.channel.send(promtList[Math.floor(Math.random() * promtList.length)]);
    }
}