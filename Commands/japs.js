const Logger = require('../Admin.js');
const translate = require('@vitalets/google-translate-api');

module.exports = {
    japs: function(message) {
       
        translate(message.content.substring(6), {to: 'ja'}).then(res => {   //Translate
            message.channel.send(res.text); //Japanese Symbols
            message.channel.send(res.pronunciation);   //Japanese Pronunciation
        }).catch(error => {
            Logger.log(error);
        });
    }
}