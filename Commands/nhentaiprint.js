const nHentaiApi = require('nhentai-api-js')
let api = new nHentaiApi();

module.exports = {
    nhentaiprint: function(message) {

        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        if (contentArgs[1] === '' || contentArgs[1] == null) {

            api.random().then(async result => {

                randomId = await result.id;
                api.g(randomId).then(async result => {

                    let pages = await result.getPages("https://i.nhentai.net/g/".concat(randomId));
                    let tempString = [];

                    for (let i = 0; i < pages.length; i++) {
                        tempString[i] = pages[i].valueOf();
                        let splitString = tempString[i].split("/");
                        pages[i] = splitString[5] + '/' + splitString[6] + '/' + splitString[7];
                    }

                    for (page of pages) {
                        message.channel.send("https://i.nhentai.net/".concat(page));
                    }

                }).catch(() => {
                    message.channel.send("There was a problem");
                });
            });
        } else {

            api.g(contentArgs[1]).then(async result => {

                let pages = await result.getPages("https://i.nhentai.net/g/".concat(contentArgs[1]));
                let tempString = [];

                for (let i = 0; i < pages.length; i++) {
                    tempString[i] = pages[i].valueOf();
                    let splitString = tempString[i].split("/");
                    pages[i] = splitString[5] + '/' + splitString[6] + '/' + splitString[7];
                }

                for (page of pages) {
                    message.channel.send("https://i.nhentai.net/".concat(page));
                }

            }).catch(() => {
                message.channel.send("There was a problem");
            });
        }
    }
}