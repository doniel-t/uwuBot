const Music = require('./Music.js');

module.exports = {
    play: function (message, bot) {

        let song = message.content.substring(message.content.indexOf(' ') + 1);

        switch (song) { //AutoComplete for certain KeyWords
            case 'akari':
                message.content = 'https://www.youtube.com/watch?v=3EEtoN8KOSI';
                break;
            case 'ayaya':
                message.content = 'https://www.youtube.com/watch?v=D0q0QeQbw9U';
                break;
            case 'bruh':
                message.content = 'https://www.youtube.com/watch?v=2ZIpFytCSVc';
                break;
            case 'john':
                message.content = 'https://www.youtube.com/watch?v=__owglEs2qE';
                break;
            case 'papa':
                message.content = 'https://www.youtube.com/watch?v=T-FrH49c_f0';
                break;
            case 'dorime':
                message.content = 'https://www.youtube.com/watch?v=zQ4LiyFF8RU';
                break;
            case 'padoru':
                message.content = 'https://www.youtube.com/watch?v=dQ_d_VKrFgM';
                break;
            case 'shutdown':
                message.content = 'https://www.youtube.com/watch?v=Gb2jGy76v0Y';
                break;
            default: //Its a Link
                break;
        }

        Music.play(message, bot); //All Logic is in Music
    },

    playKey: function (message, bot) {

        var notShortcut = false;

        switch (message.content) { //AutoComplete for certain KeyWords
            case 'akari':
                message.content = 'https://www.youtube.com/watch?v=3EEtoN8KOSI';
                break;
            case 'ayaya':
                message.content = 'https://www.youtube.com/watch?v=D0q0QeQbw9U';
                break;
            case 'bruh':
                message.content = 'https://www.youtube.com/watch?v=2ZIpFytCSVc';
                break;
            case 'john':
                message.content = 'https://www.youtube.com/watch?v=__owglEs2qE';
                break;
            case 'papa':
                message.content = 'https://www.youtube.com/watch?v=T-FrH49c_f0';
                break;
            case 'dorime':
                message.content = 'https://www.youtube.com/watch?v=zQ4LiyFF8RU';
                break;
            case 'padoru':
                message.content = 'https://www.youtube.com/watch?v=dQ_d_VKrFgM';
                break;
            case 'shutdown':
                message.content = 'https://www.youtube.com/watch?v=Gb2jGy76v0Y';
                break;
            default:
                notShortcut = true;
                break;
        }

        if (!notShortcut) { //Handling for botMain
            Music.play(message, bot); //All Logic is in Music
            return true;            
        } else {
            return false;
        }
    }
}
