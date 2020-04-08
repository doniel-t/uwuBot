const fh = require('./FileHandler');

module.exports = {
    goodbadBot: function (bot) {
        gbBot(bot);
    }
}

function gbBot(bot, first) { //Evalutes the day

    let counter = fh.get('../Files/local/counter.json');
    let Standardchannel = bot.channels.get(fh.get('../Files/local/StandardChannel.json'));
    let offset;

    if (!Standardchannel) {
        Logger.log('Please set a Standard Channel or some Features wont work');
        return;
    }

    let time = 86_400_000; //86400000 == 1 day

    if (!first) {
        let date = new Date();

        let val = date.getTime() - date.getTimezoneOffset() * 60 * 1000;//Get time with TimezoneOffset
        let val1 = (val - (val % time)) + time; //Get next Midnight

        offset = val1 - val; //Time until next Midnight
    } else {
        offset = time;
    }

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