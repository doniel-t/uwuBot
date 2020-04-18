const fh = require('./FileHandler');

/**
 * @usage N/A
 * @does runs automated Functions
 */
module.exports = {
    goodbadBot: function (bot) {
        gbBot(bot);
    }
}

function gbBot(bot, first) { //Evalutes the day

    let counter = fh.get('../Files/local/counter.json');
    let Standardchannel = bot.channels.get(fh.get('../Files/local/StandardChannel.json'));
    let offset = 86_400_000;

    if (!Standardchannel) {
        Logger.log('Please set a Standard Channel or some Features wont work');
        return;
    }

    if (!first)
        offset = getNextMidnight();

    setTimeout(function () {

        if (!counter.called && counter.good == 0 && counter.bad == 0) {
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
        counter.called = false;
        fh.write('counter.json', counter);

        gbBot(bot, false);
    }, offset)
}

function getNextMidnight() { //Returns time in ms until next Midnight
    
    let time = 86_400_000; //86400000 == 1 day
    let date = new Date();
    let val = date.getTime() - date.getTimezoneOffset() * 60 * 1000;//Get time with TimezoneOffset

    return (val - (val % time)) + time - val; //Time until next Midnight
}