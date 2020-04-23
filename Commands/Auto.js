const fh = require('./FileHandler');
const Channel = require('./Channel');

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

    let counter = fh.get('../Files/local/counter.json'); //is Global
    let offset = 86_400_000;

    if (!first)
        offset = getNextMidnight();

    setTimeout(function () {

        if (!counter.called && counter.good == 0 && counter.bad == 0) {
            Channel.sendAll('Standard', 'Nobody talked to me today 😞');
        } else {
            let tmp = 'Good: ' + counter.good + ' Bad: ' + counter.bad + ' \n';

            if (counter.good > counter.bad) {
                Channel.sendAll('Standard', tmp + 'I was a good Bot today 😀');
            } else {
                Channel.sendAll('Standard', tmp + 'I was a bad Bot today 😞');
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

//@param hour 0 = Midnight, 1 = 1am, 1.5 = 1:30am, ...
function getTimeUntil(hour) {  //Returns time in ms until hour

    if (isNaN(hour) || hour < 0 || hour >= 24) {
        return -1;
    }

    let t = getNextMidnight();

    if (t - (24 - hour) * 3_600_000 > 0) { //Check if time is before Midnight
        return t - (24 - hour) * 3_600_000;
    } else {
        return t + hour * 3_600_000;
    }
}