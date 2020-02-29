const Music = require('./Music.js');

module.exports = {
    play: function (message, bot) {

        switch (message.contents) { //AutoComplete for certain KeyWords
            case 'akari':
                message.contents = '!play https://www.youtube.com/watch?v=3EEtoN8KOSI';
                break;
            case 'ayaya':
                message.contents = '!play https://www.youtube.com/watch?v=D0q0QeQbw9U';
                break;
            case 'bruh':
                message.contents = '!play https://www.youtube.com/watch?v=2ZIpFytCSVc';
                break;
            case 'john':
                message.contents = '!play https://www.youtube.com/watch?v=__owglEs2qE';
                break;
            default:
                break;
        }

        Music.play(message, bot); //All Logic is in Music
    }
}
