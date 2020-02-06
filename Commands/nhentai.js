const nHentaiApi = require('nhentai-api-js')
let api = new nHentaiApi();

module.exports = {
    nhentai: function(message) {
        let contentArgs = message.content.split(" "); //Split Message for simpler Access
        if (contentArgs[1] === '' || contentArgs[1] == null) {
            let randomId = '';
            let randomPromise = api.random().then(async result => {
                randomId = await result.id;
                message.channel.send("https://nhentai.net/g/".concat(randomId));
            });
        } else {
            message.channel.send("https://nhentai.net/g/".concat(contentArgs[1]));
        }
    }
}