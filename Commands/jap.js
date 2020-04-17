const Logger = require("./Logger.js");
const translate = require('@vitalets/google-translate-api');

/**
 * @usage !jap <sentence>
 * @does translates sentence to japanese, or english if it was japanese
 * @Shortcut j
 */
module.exports = {
    jap: function(message) {

        translate(message.content.substring(message.content.indexOf(' ')+1), { to: 'ja' }).then(res => { //Translate from x to Japanese

            if (res.from.language.iso == 'ja') { //If Language was Japanese translate to English
                translate(message.content.substring(message.content.indexOf(' ')+1), { to: 'en' }).then(res => { //Translate
                    message.channel.send(res.text); //English Text
                })
            } else {
                message.channel.send(res.text + '\n' + res.pronunciation); //Japanese Symbols + Japanese Pronunciation 
            }
        }).catch(error => {
            Logger.log(error);
        });
    }
}