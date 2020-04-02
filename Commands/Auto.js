module.exports = {
    goodbadBot: function (bot) {
        gbBot(bot);
    }
}

function gbBot(bot) { //Evalutes the day
    let Standardchannel = bot.channels.get(fh.get('../Files/local/StandardChannel.json'));

    if (!Standardchannel) {
        Logger.log('Please set a Standard Channel or some Features wont work');
        return;
    }

    let val = Date.now();
    let val1 = val % 86400000; //86400000 == 1 day
    val1 = val - val1 + 86400000; //Get next Midnight
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
        fh.write('../Files/local/counter.json', counter);

        gbBot(bot);
    }, val)
}