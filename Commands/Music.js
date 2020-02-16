const ytdldc = require('ytdl-core-discord');
const ytdl = require('ytdl-core');
const Logger = require('../Admin.js');

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
var ogmessage;
var Musicdispatcher;
var Musicconnection;
var MusicQueue = [];
var inChannel = false;

async function playSong() { //Plays a Song

    let Song = MusicQueue.pop();
    ogmessage.channel.send("Now playing " + Song);

    playyt(Musicconnection, Song).then(dispatcher => { //Throws error in console if url isnt valid
        Musicdispatcher = dispatcher;
        Musicdispatcher.on('end', () => {
            if (MusicQueue.length > 0) {
                playSong();
            } else {
                ogmessage.channel.send('End of Queue');
                stop();
            }
        })
    })
}

function join(message, bot) { //Joins VoiceChannel of Caller

    dcbot = bot;
    ogmessage = message;

    dcbot.channels.get(ogmessage.author.lastMessage.member.voiceChannelID).join().then(connection => {

        Musicconnection = connection;
        inChannel = true;
        playyt(connection, MusicQueue.pop()).then(dispatcher => { //Has to be called here so the Promise is returned

            Musicdispatcher = dispatcher;

            dispatcher.on('end', () => {

                if (MusicQueue.length > 0) {
                    playSong();
                } else {
                    ogmessage.channel.send('End of Queue');
                    stop();
                }
            })
        })
    });
}

async function play(message, bot) { //Adds Music to Queue and starts Playing if not playing already

    if (message.author.lastMessage.member.voiceChannelID) { //Only add if User is in a VoiceChannel

        var Link = message.content.substring(6);

        ytdl.getBasicInfo(Link).then(() => {  //If no Info is given, it isnt a Video
            MusicQueue.push(Link);

            if (Musicdispatcher != undefined) {
                if (Musicdispatcher.time != 0) {
                    message.channel.send("Added Song to Queue at Position " + MusicQueue.length);
                }
            }

            if (MusicQueue.length == 1) {
                if (!inChannel) {
                    join(message, bot);
                }
            }
        }).catch(() => {
            message.channel.send('Not a valid Link');
        })
    } else {
        message.channel.send('Please join a VoiceChannel');
    }
}

function stop() {       //Stops Music, cleares Queue and leaves Channel

    MusicQueue = [];
    inChannel = false;
    dcbot.channels.get(ogmessage.author.lastMessage.member.voiceChannelID).leave();
    ogmessage = undefined;
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

async function playyt(connection, url) {    //Plays the URL
    try {
        var YTStream = await ytdldc(url);
    } catch (error) {
        Logger.log(error);
    }
    return connection.playOpusStream(YTStream);
}