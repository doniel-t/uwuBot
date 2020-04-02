const fh = require('./FileHandler');

module.exports = {
    goodbadBot: function (bot) {
        gbBot(bot);
    },

    chatCalled: function () {
        called = true;
    }
}

var called = false;

function gbBot(bot) { //Evalutes the day
    let counter = fh.get('../Files/local/counter.json');
    let Standardchannel = bot.channels.get(fh.get('../Files/local/StandardChannel.json'));

    if (!Standardchannel) {
        Logger.log('Please set a Standard Channel or some Features wont work');
        return;
    }

    let time = 86_400_000; //86400000 == midnight
    let date = new Date();

    let val = date.getTime() - date.getTimezoneOffset() * 60 * 1000;//Get time with TimezoneOffset
    let val1 = (val - (val % time)) + time; //Get next Midnight

    val = val1 - val; //Time until next Midnight

    setTimeout(function () {

        if (!called) {
            Standardchannel.send('Nobody talked to me today 😞');
        } else {
            let tmp = 'Good: ' + counter.good + ' Bad: ' + counter.bad + ' \n';

            if (counter.good > counter.bad) {
                Standardchannel.send(tmp + 'I was a good Bot today 😀');
            } else {
                Standardchannel.send(tmp + 'I was a bad Bot today 😞');
            }
        }

        counter.good = 0; //Reset values
        counter.bad = 0;
        fh.write('counter.json', counter);
        called = false;

        gbBot(bot);
    }, val)
}