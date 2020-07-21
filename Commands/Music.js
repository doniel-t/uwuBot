const ytdl = require('ytdl-core');
const ytdldis = require('ytdl-core-discord');
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

async function playSong(first, Channel) { //Plays a Song

    let Song = getNextSong(Channel.guild.id);
    if (!first) Channel.send("Now playing " + Song);

    playyt(Song, Channel.guild.id).then(dispatcher => { //Throws error in console if url isnt valid
        Musicdispatcher[Channel.guild.id] = dispatcher;
        Musicdispatcher[Channel.guild.id].on('end', () => {
            if (MusicQueues[Channel.guild.id].length > 0) {
                playSong(false, Channel);
            } else {
                Channel.send('End of Queue');
                stop(Channel.guild.id);
            }
        })
    }).catch(_ => { })
}

function join(voiceID, Channel) { //Joins VoiceChannel of Caller

    global.bot.channels.get(voiceID).join().then(connection => {
        MusicQueues[guildID] = [];
        Musicconnection[Channel.guild.id] = connection;
        playSong(true, Channel);
    });
}

async function play(message) { //Adds Music to Queue and starts Playing if not playing already

    if (message.author.lastMessage.member.voiceChannelID) { //Only add if User is in a VoiceChannel

        var Link = message.content.substring(message.content.indexOf(' ') + 1); //Remove command

        ytdl.getBasicInfo(Link).then(() => {  //If no Info is given, it isnt a Video

            addSong(Link, message.guild.id);

            if (!Musicconnection[message.guild.id]) {
                join(message.author.lastMessage.member.voiceChannelID, message.channel);
            } else {
                message.channel.send("Added Song to Queue: " + MusicQueues[message.guild.id].length);
            }

        }).catch(() => { //Not a Video

            if (ytpl.validateURL(Link)) { //validate Playlist

                ytpl(Link).then(playlist => { //Get Playlist

                    for (var song of playlist.items) { //Iterate through Songs in Playlist
                        addSong(song.url_simple, message.guild.id);
                    }

                    if (!Musicconnection[message.guild.id]) {
                        join(message.author.lastMessage.member.voiceChannelID, message.channel);
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

function stop(guildID) {       //Stops Music, cleares Queue and leaves Channel
    try {
        global.bot.channels.get(Musicconnection[guildID].channel.id).leave(); //Can fail if Bot is kicked from Channel
    } catch (ignored) { }
    MusicQueues[guildID] = undefined;
    Musicdispatcher[guildID] = undefined;
    Musicconnection[guildID] = undefined;

}

function pause(message) {      //Stops Music, remains Queue and stays in Channel
    Musicdispatcher[message.guild.id].pause();
}

function resume(message) {     //Returns Music if pause was called before
    Musicdispatcher[message.guild.id].resume();
}

function next(message) {       //Ends current Song
    Musicdispatcher[message.guild.id].end();
}

async function playyt(url, guildID) {    //Plays the URL

    var stream = await ytdldis(url);

    stream.on('error', err => {
        Logger.log(err);
    });

    return Musicconnection[guildID].playOpusStream(stream);
}

function getNextSong(guildID) { //Returns next Song on MusicQueues and deletes it from Queue   
    return MusicQueues[guildID].shift();
}

function addSong(Link, guildID) { //Adds Song to Queue
    MusicQueues[guildID].push(Link);
}