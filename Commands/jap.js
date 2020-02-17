const Logger = require("./Logger.js");
const translate = require('@vitalets/google-translate-api');

module.exports = {
    jap: function(message) {

        translate(message.content.substring(6), { to: 'ja' }).then(res => { //Translate from x to Japanese

            if (res.from.language.iso == 'ja') { //If Language was Japanese translate to English
                translate(message.content.substring(6), { to: 'en' }).then(res => { //Translate
                    message.channel.send(res.text); //English Text
                })
            } else {
                message.channel.send(res.text); //Japanese Symbols
                message.channel.send(res.pronunciation); //Japanese Pronunciation 
            }
        }).catch(error => {
            Logger.log(error);
        });
    }
}