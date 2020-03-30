const ytdldc = require('ytdl-core-discord');
const { getBasicInfo } = require('ytdl-core');
const ytpl = require('ytpl');
const Logger = require("./Logger.js");

//This file is not reachable through Commands-only, method must be called through corresponded .js

module.exports = {

    join: function (message, bot) { //Joins VoiceChannel of Caller
        join(message, bot);
    },

    play: function (message, bot) { //Adds Music to Queue and starts Playing if not playing already
        play(message, bot);
    },

    stop: function () {     //Stops Music, cleares Queue and leaves Channel
        stop();
    },

    pause: function () {    //Stops Music, remains Queue and stays in Channel
        pause();
    },

    resume: function () {   //Returns Music if pause was called before
        resume();
    },

    next: function () {     //Skips to next Song in Queue, calls stop when Queue is empty
        next();
    }
}

var dcbot;
var Musicdispatcher;
var Musicconnection;
var MusicQueue = new Set();
var inChannel = false;

async function playSong(first,Channel) { //Plays a Song

    let Song = getNextSong();
    if (!first) Channel.send("Now playing " + Song);

    playyt(Song).then(dispatcher => { //Throws error in console if url isnt valid
        Musicdispatcher = dispatcher;
        Musicdispatcher.on('end', () => {
            if (MusicQueue.size > 0) {
                playSong(false,Channel);
            } else {
                Channel.send('End of Queue');
                stop();
            }
        })
    })
}

function join(voiceID,Channel) { //Joins VoiceChannel of Caller

    dcbot.channels.get(voiceID).join().then(connection => {

        Musicconnection = connection;
        inChannel = true;
        playSong(true,Channel);
    });
}

async function play(message, bot) { //Adds Music to Queue and starts Playing if not playing already

    dcbot = bot;

    if (message.author.lastMessage.member.voiceChannelID) { //Only add if User is in a VoiceChannel

        var Link = message.content.substring(message.content.indexOf(' ') + 1); //Remove command

        getBasicInfo(Link).then(() => {  //If no Info is given, it isnt a Video

            MusicQueue.add(Link);

            if (!inChannel) {
                join(message.author.lastMessage.member.voiceChannelID,message.channel);
            } else {
                message.channel.send("Added Song to Queue: " + MusicQueue.size);
            }

        }).catch(() => { //Not a Video

            if (ytpl.validateURL(Link)) { //validate Playlist

                ytpl(Link).then(playlist => { //Get Playlist

                    for (var song of playlist.items) { //Iterate through Songs in Playlist
                        MusicQueue.add(song.url_simple);
                    }

                    if (!inChannel) {
                        join();
                    } else {
                        message.channel.send("Added Playlist to Queue");
                    }
                }).catch(() => {
                    message.channel.send('Playlist couldn`t be resolved');
                })
            } else { //When neither Video or Playlist
                message.channel.send('Not a valid Link or use !help music');
            }
        })

    } else {
        message.channel.send('Please join a VoiceChannel');
    }
}

function stop() {       //Stops Music, cleares Queue and leaves Channel

    dcbot.channels.get(Musicconnection.channel.id).leave();
    MusicQueue = new Set();
    inChannel = false;
    dcbot = undefined;
    Musicdispatcher = undefined;
    Musicconnection = undefined;
}

function pause() {      //Stops Music, remains Queue and stays in Channel
    Musicdispatcher.pause();
}

function resume() {     //Returns Music if pause was called before
    Musicdispatcher.resume();
}

function next() {       //Ends current Song
    Musicdispatcher.end();
}

async function playyt(url) {    //Plays the URL
    try {
        var YTStream = await ytdldc(url);
    } catch (error) {
        Logger.log(error);
    }
    return Musicconnection.playOpusStream(YTStream);
}

function getNextSong() { //Returns next Song on MusicQueue and deletes it from Queue
    var ret = Array.from(MusicQueue)[0];
    MusicQueue.delete(ret);
    return ret;
}