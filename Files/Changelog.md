//CHANGE VERSION && SET DEBUG TO FALSE AGAIN

5.0.4: 22.10.2021
    -Added setAnnoy-command
    -Added annoyOffFlag-command
    -Added ToAnnoyData.json

5.0.3: 24.04.2021
    -Updated Packages

5.0.2: 26.12.2020
    -Fixed Music
    -fixed radio

5.0.1: 12.12.2020
    -Fixed Music not working
    -Fixed Bot crashing when Auto.js triggers

5.0.0: 11.12.2020
    -Updated to discord.js v12.5.1

4.5.7: 08.12.2020
    -Fixed Playlists not working

4.5.6: 05.12.2020
    -Fixed Music
    -Removed ytdl-core-discord Module
    -Bot cant join Channel if he is already in one
    -Removed some console.logs

4.5.4: 28.11.2020
    -Added Message if not in Channel while !radio

4.5.3: 07.11.2020
    -Updated npm Modules
    -Fixed Music not working

4.5.2: 23.10.2020
    -Updated README.md
    -Code-Cleanup
    -Removed Dorime MusicShortcut since Video is private

4.5.1: 21.10.2020
    -Help uses generic prefixes

4.5.0: 12.10.2020
    -Added radio Function
    -Fixed some MusicShortcuts

4.4.8: 28.09.2020
    -Music Playlists can be randomly added
    -Music Playlists dont have size limit

4.4.7: 27.09.2020
    -Fixed Music sometimes stopping
    -Updated ytpl to 1.0.1

4.4.6: 22.09.2020
    -Bot ignores DMs
    -Fixed hangman not working
    -Fixed 2048 crashing

4.4.5: 18.09.2020
    -Updated uwu-commands to 2.0.1

4.4.4: 17.09.2020
    -Updated uwu-commands to 2.0.0
    -Update Modules:
        + ffmpeg-static@4.2.7
        + annotations@1.2.0

4.4.3: 12.08.2020
    -Fixed wrong Settings Initialization

4.4.2: 23.07.2020
    -Fixed Music

4.4.1: 21.07.2020
    -Added wsbot_run.bat
    -Simplified Music

4.4.0: 13.07.2020
    -Added reload Function
    -Added Module ytdl-core-discord
    -Fixed Music not playing
    -Updated Modules:
        + ytdl-core@2.1.7
        + ffmpeg-static@4.2.5
        + cleverbot-free@1.0.4
        + ytpl@0.1.22
        + ws@7.3.1
        + annotations@1.2.0

4.3.5: 30.05.2020
    -Fixed help not working when a File has no Annotations
    -Updated uwu-commands to 1.1.0

4.3.4: 19.05.2020
    -Made WSIP saved in a Localfile

4.3.3: 14.05.2020
    -Fixed Bot initing when DiscordConnection interruptes
    -Made Updater update to package.json-Stats
    -Fixed goodbadBot
    -Removed some Modules

4.3.2: 13.05.2020
    -Added helpText to ping Command
    -Changed Documentation

4.3.1: 06.05.2020
    -Added setting for automated Messages

4.3.0: 05.05.2020
    -Added invite Command
    -uwuBot can now join Servers while running
    -Added global.guilds.guild.Admins
    -Changed Admins.isAdmin
    -Changed Admins.addAdmin
    -Changed Admins.removeAdmin

4.2.0: 02.05.2020
    -Added ping Command
    -Updated ffmpeg-static to 4.2.0

4.1.6: 02.05.2020
    -Added better Title to league-Embed    
    -Added ConfirmationMessage to notify

4.1.5: 01.05.2020
    -Refractored Shortcuts.js
    -Changed league Detection
    -Fixed Prefix change not working
    -Made WebsocketIp as global Object for easy swap
    -Added bot.on('error')
    -Made Logger display objects

4.1.4: 30.04.2020
    -Refractored league Detection
    -Refractored name to botwide Names
    -Made Settings/Prefix/Channels global Object
    -Added Documentation
    -Added DebugMode

4.1.3: 28.04.2020
    -Fixed league Detection not working
    -Fixed WebSocket-Error-Handling

4.1.2: 25.04.2020
    -Emojis are case insensitive
    -Fixed league-Detection
    -Updated ws to 7.2.5
    -Updated run.bat
    -Fixed error when trying to merge with package.json/package-lock.json
    -Made validGames in !help name dynamic
    -Names are now safe via ID, not DiscordName
    -Made bot a global variable and replaced it everywhere

4.1.1: 24.04.2020
    -Fixed Commands without args not working

4.1.0: 24.04.2020
    -Custom Prefix for every Server
    -Updated ytdl-core to 2.1.1

4.0.1: 24.04.2020
    -Fixed error in FileHandler.create
    -Added FailSafes to name.getName Calls
    -Fixed twitch.checkForStreams

4.0.0: 23.04.2020
    -Added MultiServer-Support
    -Added Auto.getTimeUntil for future use
    -Added FileHandler.initSettings
    -Removed FileHandler.getSettings
    -Fixed neko Command
    -Added Channel.js for Handling Channels
    -Added Admin.addAdmin/Admin.removeAdmin per Server
    -Made Music/league/twitch/name/FileHandler/Auto/Admin/neko/osuplays/osurecent MultiServer-functional
    -Added ws.close() to every WS-Connection
    -Changed Changelog to Changelog.md

3.7.10: 21.04.2020
    -Changed some unefficient Code
    -Refractored weebiefy.js
    -Fixed Admin.restart
    -Fixed poll command

3.7.9: 19.04.2020
    -Changed some unefficient Code
    -Fixed Bug in help when there are too many MusicShortcuts
    -Added VS-Code-Extension uwu-commands 1.0.0

3.7.8: 18.04.2020
    -Changed some unefficient Code
    -HelpMessages are now EmbedMessages

3.7.7: 17.04.2020
    -Fixed Error in help
    -Added getNextMidnight function in Auto
    -Changed help to not show nonusable Commands
    -Added !help admin
    -Changed Admin.getLogFile
    -Removed all executeFunctionByName

3.7.6: 17.04.2020
    -Added Comments to various Functions
    -Updated Admin.update
    -Updated Admin.restart
    -Refractored help.js
    -Added annotations-Module
    -Added Annotations to every Command

3.7.5: 15.04.2020
    -Updated ytdl-core to 2.1.0
    -Updated ffmpeg-static to 4.1.1
    -Added error event to Music
    -Fixed some WebSocket-Call errors

3.7.4: 08.04.2020
    -Removed version.json (Version now tracked in package.json)
    -Changed CalledTracker to save value to counter.json

3.7.3: 07.04.2020
    -Updated discord.js to 11.6.4
    -Updated ffmpeg-static to 4.1.0
    -Removed ytdl-core-discord module
    -Updated Music to not use ytdl-core-discord

3.7.2: 04.04.2020
    -Fixed good/bad bot message timing

3.7.1: 03.04.2020
    -Fixed settings resetting

3.7.0: 02.04.2020
    -Added Handling for fh.get('../Files/local/settings.json')
    -Added StandardChannel
    -Added good/bad bot counter and message at 0:00am
    -Fixed bug when no Files are in local

3.6.1: 01.04.2020
    -Fixed things in help
    -Added 'No Command entered' when only ! or uwuadmin are entered
    -Updated README.md
    -Refractored all toggleX commands to settings

3.6.0: 01.04.2020
    -Added rng Command

3.5.1: 01.04.2020
    -Fixed an error in jap Translator

3.5.0: 01.04.2020
    -Added chat command
    -AdminCommands now run with uwuadmin
    -Removed Dependencies Folder
    -Removed Dependencies_Template.rar
    -Moved botToken.json into Files/local
    -Chat function works with @uwu-bot
    -Updated README.md
    -Removed fs-module from Admin
    -Added readdirSync to FileHandler
    -Added catch to bot.login
    -Removed Dependencies from gitignore

3.4.9: 32.03.2020
    -Updated discord.js to 11.6.3

3.4.8: 29.03.2020
    -Bot can leave every VoiceChannel now

3.4.7: 28.03.2020
    -Removed npm-Module List from README.md
    -Updated ytdl-core-discord to masterBranch
    -Changed Music.js

3.4.6: 28.03.2020
    -Added OP.GG-Links to league-EmbedMessage

3.4.5: 25.03.2020
    -Fixed bot crashing when there is no LeagueChannel/TwitchChannel set

3.4.4: 25.03.2020
    -Fixed bot crashing when WebSocket is offline

3.4.3: 24.03.2020
    -Fixed league ingame Detection

3.4.2: 23.03.2020
    -Added Rank display in league

3.4.1: 22.03.2020
    -Fixed FileHandler

3.4.0: 22.03.2020
    -Added twitch Command
    -Added twitch Stream Detection

3.3.3: 19.03.2020
    -Fixed league ingame Detection

3.3.2: 18.03.2020
    -Added name to help.json

3.3.1: 18.03.2020
    -Fixed league ingame Detection

3.3.0: 18.03.2020
    -Added FileHandler
    -Improved league ingame Detection

3.2.1: 17.03.2020
    -Added WebSocket-Server Timeout

3.2.0: 17.03.2020
    -Changed osurecent Message
    -Renamed leaguegetgame to league
    -Changed league Message
    -Added league ingame Detection

3.1.2: 17.03.2020
    -Fixed win condition bug in tictactoe

3.1.1: 16.03.2020
    -Added Picture to osurecent Message

3.1.0: 16.03.2020
    -Added name Command
    -Changed leaguegetgame,osurecent,osuplays to use name.js

3.0.3: 16.03.2020
    -Simplified leaguegetgame
    -Changed champion.json

3.0.2: 15.03.2020
    -Added get function in whatToDraw.js
    -fixed help.js

3.0.1: 14.03.2020
    -Moved getleagueName to Clientside

3.0.0: 14.03.2020
    -Moved API-Calls to WebSocket-Server

2.2.2: 13.03.2020
    -Fixed leaguegetgame not working whenname has spaces
    -Cleaned up botMain

2.2.1: 13.03.2020
    -Added Comments to botMain
    -Added More: to help
    -Moved next,pause,play,resume,stop to !help music
    -Changed leaguegetgame to EmbedMessage
    -Refractored ask.js
    -Removed getosuName.js
    -Added stop() to hangman
    -Changed jap answer to one message
    -Added Comments to play
    -Refractored uwufy.js
    -Minor Changes to notify,weebiefy,zins

2.2.0: 12.03.2020
    -Added choose Command

2.1.5: 11.03.2020
    -Changed osuplays to EmbedMessage
    -Changed osurecent to EmbedMessage

2.1.4: 10.03.2020
    -Emoji Detection will ignore already useable Emojis

2.1.3: 10.03.2020
    -Emoji Detection now works with :EmojiName:

2.1.2: 10.03.2020
    -!emoji all will show big emojis

2.1.1: 10.03.2020
    -Added !emoji all

2.1.0: 09.03.2020
    -added notify Command

2.0.3: 08.03.2020
    -settings.json will now init new settings from initsettings.json

2.0.2: 08.03.2020
    -Fixed bot not working when settings.json is missing

2.0.1: 08.03.2020
    -Fixed Installer.bat

2.0.0: 08.03.2020
    YOU NEED TO REINSTALL THE BOT WITH THE NEW Installer.bat
    -Added local settings.json

1.11.5: 07.03.2020
    -Fixed compatibility with Emoji Detection and !emoji

1.11.4: 07.03.2020
    -Changed MusicQueue from Stack to Set
    -Created settings.json for local settings
    -Added Emoji Detection in every message (with toggle)

1.11.3: 07.03.2020
    -Fixed whatToDraw remove not working

1.11.2: 06.03.2020
    -Refractored whatToDraw
    -Refractored help Structure

1.11.1: 05.03.2020
    -Added whatToDraw check for already existing Characters
    
1.11: 05.03.2020
    -Added whatToDraw add and remove
    
1.10.4: 03.03.2020
    -Fixed help

1.10.3: 02.03.2020
    -Updated README.md
    -Added MusicShortcut.json
    -Added !help music

1.10.2: 02.03.2020
    -Added !SONGNAME support
    -Updated README.md

1.10.1: 01.03.2020
    -Updated discord.js to 11.6.1
    -Changed v1.9.9 to 1.10.0

1.10.0: 29.02.2020
    -Added whatToDraw

1.9.8: 29.02.2020
    -Fixed KeyWords
    -Fixed some String splitters

1.9.7: 29.02.2020
    -Added KeyWords in play

1.9.6: 29.02.2020
    -Added Logger to Shortcuts
    -Fixed Music not working under certain conditions
    -Fixed jap not working with Shortcut

1.9.5: 28.02.2020
    -Fixed youtu.be Links in play

1.9.4: 28.02.2020
    -Added Playlist support to play

1.9.3: 28.02.2020
    -Bot won't process own messages

1.9.2: 28.02.2020
    -Fixed Formatting in help
    -Changed weebyfy to weebiefy

1.9.1: 27.02.2020
    -Updated README.md

1.9.0: 26.02.2020
    -Added Shortcuts a,d,e,j,p,s,w
    -updated snoowrap to 1.21
    -Added weebyfy Command

1.8.0: 25.02.2020
    -Added emoji Command

1.7.3: 25.02.2020
    -Fixed stop not working under some conditions

1.7.2: 19.02.2020
    -Changed TicTacToe in help.json
    -Fixed TicTacToe

1.7.1: 19.02.2020
    -Fixed Issues in MineSweeper
    -Fixed bugs in TicTacToe and added qol changes

1.7.0: 19.02.2020
    -Added Tictactoe
    -Fixed missing commands in help.json

1.6.0: 19.02.2020
    -Fixed Comments in MineSweeper
    -Added 2048 Command

1.5.5: 18.02.2020
    -Fixed wrong Parameter Detection in MineSweeper

1.5.4: 18.02.2020
    -Fixed Bot crashing when Minesweeper got wrong format guess

1.5.3: 18.02.2020
    -Fixed Minesweeper without Parameter
    -Added BombRatio if no BombNumber was given
    -Only one MinesweeperGame can run at once
    -Fixed Admin.js

1.5.2: 18.02.2020
    -Fixed Updater not working
    -Fixed Updater removing FFMPEG

1.5.1: 18.02.2020
    -Fixed MineSweeper
    -Added more Features to MineSweeper
    -Changed help.json

1.5.0: 17.02.2020
    -Fixed AdminCommands
    -Fixed neko Command
    -Added MineSweeper Command
    -Added MineSweeper to help.json

1.4.2: 17.02.2020
    -Refractored Files
    -Moved log to Logger.js
    -Moved Admin into Commands
    -Moved Dependencies_Template.rar / Installer.bat / Updater.bat into ./Files
    -Added Comments in botMain and hangman
    -Added Changelog
    -Fixed hangman not resetting HP

1.4.1: 17.02.2020
    -Added HP Feedback to Hangman messages

1.4.0: 17.02.2020
    -Updated README.md
    -Removed message Parameter from Admin.restart
    -Added hangman Command
    -Changed japs to jap
    -Added shutdown Command
    -Added hangman / jap / next / pause / resume / shutdown to help.json
    -Changed run.bat so LogFile will work if Time is SingleDigit

1.3.6: 16.02.2020
    -Updated README.md    
    -Cleared Musicdispatcher and Musicconnection when Bot leaves VoiceChannel
    -Removed ReturnParameter in ytdl.getBasicInfo

1.3.5: 15.02.2020
    -Added LinkValidation in Music.play

1.3.4: 15.02.2020
    -Updated README.md
    -Added Installer.bat

1.3.3: 15.02.2020
    -Added Translator English -> Japanese
    -Added ffmpeg-static and @discord.js/opus to modules

1.3.2: 15.02.2020
    -Fixed Updater not working

1.3.1: 15.02.2020
    -Moved MusicCommands to Music.js
    -Added next Command
    -Added pause Command
    -Added resume Command

1.3.0: 14.02.2020
    -Updated README.md
    -Added play Command
    -Added stop Command
    -Added Music to dorime and padoru
    -Added play and stop to help.json
    -Updated Updater.bat to get new npm modules
    -Added bot as Parameter in botMain
    -Added Modules: @discordjs/uws / ffmpeg-binaries / ytdl-core-discord

1.2.0: 14.02.2020
    -Updated README.md
    -Refractored Files
    -Added japs Command
    -Moved getosuName into both osuFiles
    -Moved getleagueName into leaguegetgame
    -Moved parseMods into osurecent.json
    -Added Comments in rngsub and poll
    -Added module @vitalets/google-translate-api
    -Changed BotStatus to online

1.1.11: 13.02.2020
    -Renamed ransub to rngsub in help.json
    -Changed rngsub

1.1.10: 13.02.2020
    -Removed consol.log in osurecent
    -Renamed ransub to rngsub

1.1.9: 13.02.2020
    -Changed Emojis in osurecent

1.1.8: 13.02.2020
    -Added Emojis in osurecent

1.1.7: 12.02.2020
    -Cleaned osuplay
    -Changed osurecent

1.1.6: 12.02.2020
    -Show NoMod instead of NM

1.1.5: 12.02.2020
    -Show NM if parseMods returns nothing in osurecent

1.1.4: 12.02.2020
    -Added Percentage Cleared in osurecent

1.1.3: 12.02.2020
    -Fixed Admin.update

1.1.2: 12.02.2020
    -Added random Selection in ransub if no Subreddit was given

1.1.1: 12.02.2020
    -Refractored README.md

1.1.0: 12.02.2020
    -Added Comments in Admin.js
    -Added Admin.version Command
    -Changed help.js to use help.json
    -Refractored helptext.txt to help.json
    -Added versionDisplay on DiscordPresence
    -Added ransub Command
    -Fixed OP.GG Links in leaguegetgame
    -Removed eval in leaguegetgame
    -Added Dependencies_Template.rar

1.0.10: 11.02.2020
    -Fixed Typo in neko.js

1.0.9: 11.02.2020
    -Updated README.md
    -Fixed Typo in Admin.toggleneko
    -Added SpamProtection to neko Command
    -Changed get to getLogFile Command

1.0.8: 10.02.2020
    -Fixed Updater.bat

1.0.7: 10.02.2020
    -Updated README.md
    -Changed Updater.bat
    -Removed Admin.searchUpdate
    -Changed Admin.applyUpdate to Admin.update

1.0.6: 10.02.2020
    -Changed Updater.bat

1.0.5: 10.02.2020
    -Removed test_ignore.txt

1.0.4: 10.02.2020
    -Changed Admin.applyUpdate
    -Changed Admin.restart

1.0.3: 10.02.2020
    -Changed test_ignore.txt

1.0.2: 10.02.2020
    -Changed .gitignore
    -Changed Admin.stop
    -Changed Admin.restart
    -Added module child_process
    -Added Updater.bat
    -Changed run.bat

1.0.1: 10.02.2020
    -Updated README.md
    -Changed Logger.js to Admin.js
    -Simplified neko.js
    -Added module xmlhttprequest and snoowrap
    -Added BotID.json
    -Added test_ignore.txt
    -Changed run.bat
    -Added Admin.stop
    -Added Admin.restart

1.0.0: Everything before 10.02.2020
    -Added ask Command
    -Added dorime Command
    -Added getleagueName
    -Added getosuName
    -Added help Command
    -Added leaguegetgame Command
    -Added neko Command
    -Added osuplays Command
    -Added osurecent Command
    -Added padoru Command
    -Added parseMods
    -Added poll Command
    -Added uwufy Command
    -Added zins Command
    -Added champions.json File
    -Added helptext.txt File
    -Added Logger.js
    -Added botMain.js
    -Added run.bat
    -Added README.md
    -Added .gitignore
