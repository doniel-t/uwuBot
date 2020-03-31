const cleverbot = require("cleverbot-free");

module.exports = {
    chat: function(message) {
        cleverbot(message.content.split(" ").splice(1)).then(ans => {
            message.channel.send(ans);
        })
    }
}