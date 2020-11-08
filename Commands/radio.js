const m3u8stream = require('m3u8stream');
const https = require('https');
/**
 * @usage !radio <optional: stop> <optional: master.m3u8-Link>
 * @does Plays Internetradio in your Channel
 */
module.exports = {
   radio: function (message) {

      let contentArgs = message.content.split(" "); //Split Message for simpler Access

      const voiceChannel = message.member.voiceChannel;

      if (contentArgs[1] == 'stop') { //Stop playing
         try {
            voiceChannel.leave();
         } catch (_) { }
         return;
      }

      let playlist = 'https://1livediggiuni-lh.akamaihd.net/i/1LIVEdiggi_HDS@179579/index_3_a-p.m3u8'; //Default

      if (contentArgs[1]) {
         let isMaster = contentArgs[1].match(/(.*\/master\.m3u8).*/);
         if (isMaster[1]) {
            let streams = '';
            https.get(isMaster[1], (res) => {//Read master.m3u8

               res.on('data', (data) => {
                  streams += data;
               });

               res.on('end', _ => {
                  let findstream = streams.match(/^(https:\/\/.*)/gm);
                  if (findstream[1]) {//Get first stream in master.m3u8
                     playlist = findstream[1];
                  } else {
                     message.channel.send('This master.m3u8 doesn`t contain any streams');
                  }
               })
            }).on('error', _ => {
               message.channel.send('I can`t resolve that File, running default');
            });
         } else {
            message.channel.send('I can`t resolve that Link, running default');
         }
      }

      voiceChannel.join() //Playing logic
         .then(connnection => {
            let stream = m3u8stream(playlist, {
               chunkReadahead: 20,
               highWaterMark: 1 << 25
            });
            const dispatcher = connnection.playStream(stream);
            dispatcher.on('end', () => {
               voiceChannel.leave();
            });
         });
   }
}