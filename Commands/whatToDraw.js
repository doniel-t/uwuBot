const characters = require('../Files/characters.json');
const fh = require('./FileHandler');
const Logger = require('./Logger');
const localFile = 'whatToDraw.json';
var localList; // represents whatToDraw.json
var List; // Combined List of localList and characters

/**
 * @usage !whatToDraw
 * @does returns a random Anime Character and its MAL link
 * @hasOwnHelp
 */
module.exports = {
    whatToDraw: function (message) {

        localList = fh.get('../Files/local/' + localFile);

        List = localList.concat(characters);

        let contentArgs = message.content.split(' ');



        if (contentArgs.length == 1) { //Normal Call
            message.channel.send(List[Math.floor(Math.random() * List.length)]); //Returns random Character
        }

        if (contentArgs[1] == 'add') { //Add Call
            if (contentArgs.length < 4) {
                message.channel.send("Could not add this Character! You gave the wrong Arguments");
            } else {
                let dataString = contentArgs[2].concat(" \n").concat(contentArgs[3]);
                addPrompt(dataString, message);
            }
        }

        if (contentArgs[1] == 'remove') { //Remove Call
            removeLatest(message);
        }
        if (contentArgs[1] == 'get') {

            writeJSON(List, 'Files/local/characterFiles.json')

            message.author.createDM().then(async dmChannel => { //asks for word in private channel
                await dmChannel.send("Here is the Character List", { files: ['Files/local/characterFiles.json'] });
                try {
                    fs.unlinkSync('Files/local/characterFiles.json');
                } catch (err) {
                    Logger.log(err);
                }
            }).catch(error => {
                Logger.log(error);
            });
        }
    }
}

function addPrompt(data, message) { //Adds entry to list

    if (!data.includes('https://')) {
        message.channel.send("The Link is not valid");
        return;
    }

    let linkString = data.split('https://');

    for (let animeChar of List) {
        if (animeChar.includes(linkString[1])) {
            message.channel.send("Your Character is already in there!");
            return;
        }
    }

    localList.push(data);
    writeJSON(localList, localFile);
    message.channel.send(data + " has been added!")
}

function removeLatest(message) { //Removes last entry in list

    Logger.log(localList.length);

    if (localList.length > 0) {
        message.channel.send(localList[localList.length - 1] + " was removed!");
        localList.pop();
        writeJSON(localList, localFile);
    }
}

function writeJSON(promptsJsonString, path) { //Overwrites whatToDraw.json
    fh.write(path,promptsJsonString);
}