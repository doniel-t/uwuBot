const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const Logger = require("./Logger.js");

//This file is not reachable through Commands-only, method must be called through corresponded .js
/**
 * @usage N/A
 * @does Can play YT-Videos/YT-Playlists
 * @hasOwnHelp
 */
module.exports = {

    play: function (message) { //Adds Music to Queue and starts Playing if not playing already
        play(message);
    },

    stop: function (message) {     //Stops Music, cleares Queue and leaves Channel
        stop(message.guild.id);
    },

    pause: function (message) {    //Stops Music, remains Queue and stays in Channel
        pause(message);
    },

    resume: function (message) {   //Returns Music if pause was called before
        resume(message);
    },

    next: function (message) {     //Skips to next Song in Queue, calls stop when Queue is empty
        next(message);
    }
}

var Musicdispatcher = {};
var Musicconnection = {};
var MusicQueues = {};

function playSong(first, Channel) { //Plays a Song

    let Song = getNextSong(Channel.guild.id);
    if (!first) Channel.send("Now playing " + Song);

    let stream = ytdl(Song, {
        format: 'audioonly',
        dlChunkSize: 0
    });

    stream.on('error', err => {
        Logger.log(err);

        Channel.send('Video not playable, maybe private');
        if (MusicQueues[Channel.guild.id].length > 0) {
            playSong(false, Channel);
        } else {
            Channel.send('End of Queue');
            stop(Channel.guild.id);
        }
    });

    Musicdispatcher[Channel.guild.id] = Musicconnection[Channel.guild.id].play(stream);
    Musicdispatcher[Channel.guild.id].on('speaking', speaking => {

        if (!speaking)
            if (MusicQueues[Channel.guild.id].length > 0) {
                playSong(false, Channel);
            } else {
                Channel.send('End of Queue');
                stop(Channel.guild.id);
            }
    })
}

function join(voiceID, Channel) { //Joins VoiceChannel of Caller

    let inChannel = false;
    global.bot.voice.connections.every(conn => {
        if (conn.channel.guild.id == Channel.guild.id) {
            inChannel = true;
        }
    });

    if (inChannel) {
        Channel.send("Im already in a Channel");
        MusicQueues[Channel.guild.id] = undefined;
        Musicdispatcher[Channel.guild.id] = undefined;
        Musicconnection[Channel.guild.id] = undefined;
        return;
    }

    global.bot.channels.cache.get(voiceID).join().then(connection => {
        Musicconnection[Channel.guild.id] = connection;
        playSong(true, Channel);
    });
}

async function play(message) { //Adds Music to Queue and starts Playing if not playing already

    if (message.member.voice.channel) { //Only add if User is in a VoiceChannel

        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        var Link = contentArgs[1];

        //Check if normal Youtube-Video
        if (ytdl.validateURL(Link)) {

            ytdl.getBasicInfo(Link).then(() => {

                addSong(Link, message.guild.id);

                if (!Musicdispatcher[message.guild.id]) {
                    join(message.member.voice.channel.id, message.channel);
                } else {
                    message.channel.send("Added Song to Queue: " + MusicQueues[message.guild.id].length);
                }
            }).catch(ex => {
                message.channel.send('Video couldn`t be resolved. Use !help music');
                Logger.log(ex);
            })
            return;
        }

        //Check if normal Youtube-Playlist
        if (ytpl.validateID(Link)) {

            ytpl(Link, {
                limit: Infinity
            })
                .then(playlist => {

                    for (var song of playlist.items) { //Iterate through Songs in Playlist
                        addSong(song.shortUrl, message.guild.id);
                    }

                    if (contentArgs[2] == 'r') { //Randomise Playlist if wanted
                        MusicQueues[message.guild.id] = shuffle(MusicQueues[message.guild.id]);
                    }

                    if (!Musicconnection[message.guild.id]) {
                        join(message.member.voice.channel.id, message.channel);
                    } else {
                        message.channel.send("Added Playlist to Queue");
                    }
                }).catch(ex => {
                    message.channel.send('Playlist couldn`t be resolved. Use !help music');
                    Logger.log(ex);
                })
            return;
        }

        //Link doesnt have a valid Format
        message.channel.send('Link couldn`t be resolved. Use !help music');
    } else {
        message.channel.send('Please join a VoiceChannel');
    }
}

function stop(guildID) {       //Stops Music, cleares Queue and leaves Channel
    try {
        MusicQueues[guildID] = [];
        global.bot.channels.cache.get(Musicconnection[guildID].channel.id).leave(); //Can fail if Bot is kicked from Channel
    } catch (ignored) { }
    MusicQueues[guildID] = undefined;
    Musicdispatcher[guildID] = undefined;
    Musicconnection[guildID] = undefined;
}

function pause(message) {      //Stops Music, remains Queue and stays in Channel
    Musicdispatcher[message.guild.id].pause(true);
}

function resume(message) {     //Returns Music if pause was called before
    Musicdispatcher[message.guild.id].resume();
}

function next(message) {       //Ends current Song
    Musicdispatcher[message.guild.id].end();
}

//function playyt(url, guildID) {    //Plays the URL

//     var stream = ytdl(url, {
//         filter: "audioonly",
//         quality: 'highestaudio',
//         highWaterMark: 1 << 25
//     });

//     stream.on('error', err => {
//         Logger.log(err);
//     });

//     return Musicconnection[guildID].playOpusStream(stream);
// }

function getNextSong(guildID) { //Returns next Song on MusicQueues and deletes it from Queue   
    return MusicQueues[guildID].shift();
}

function addSong(Link, guildID) { //Adds Song to Queue
    if (!MusicQueues[guildID]) {
        MusicQueues[guildID] = [];
    }
    MusicQueues[guildID].push(Link);
}

function shuffle(array) { //Used for random Playlist
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}