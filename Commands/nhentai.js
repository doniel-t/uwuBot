module.exports = {
    nhentai: function(message) {
        let contentArgs = message.content.split(" "); //Split Message for simpler Access
        message.channel.send("https://nhentai.net/g/".concat(contentArgs[1]));
    }
}