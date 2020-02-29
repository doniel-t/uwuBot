const Music = require('./Music.js');

module.exports = {
    play: function (message, bot) {

        let song = message.content.substring(message.content.indexOf(' ')+1);

        switch (song) { //AutoComplete for certain KeyWords
            case 'akari':
                message.content = '!play https://www.youtube.com/watch?v=3EEtoN8KOSI';
                break;
            case 'ayaya':
                message.content = '!play https://www.youtube.com/watch?v=D0q0QeQbw9U';
                break;
            case 'bruh':
                message.content = '!play https://www.youtube.com/watch?v=2ZIpFytCSVc';
                break;
            case 'john':
                message.content = '!play https://www.youtube.com/watch?v=__owglEs2qE';
                break;
            case 'papa':
                message.content = '!play https://www.youtube.com/watch?v=T-FrH49c_f0';
                break;
            default:
                break;
        }

        console.log(message.content);console.log(song);

        Music.play(message, bot); //All Logic is in Music
    }
}
