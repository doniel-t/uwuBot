const prompts = require('../Files/prompt.json');
const fs = require('fs');


function addPrompt(data, message) {
    var promptList = prompts;
    let linkString = data.split('https://');
    for (let animeChar of promptList) {
        if (animeChar.includes(linkString[1])) {
            message.channel.send("Your Character is already in there!");
            return;
        }
    }
    promptList.push(data);
    var jsonString = JSON.stringify(promptList);
    deleteJSON();
    writeJSON(jsonString);
}

function deleteJSON() {
    try {
        fs.unlinkSync('Files/prompt.json');
    } catch (err) {
        console.log(err);
    }
}

function writeJSON(promtsJsonString) {
    try {
        fs.writeFileSync('Files/prompt.json', promtsJsonString);
    } catch (err) {
        console.log(err);
    }
}

function removeLatest(message) {
    var promptList = prompts;
    if (promptList.length > 0) {
        var removedCharacter = promptList[promptList.length - 1];
        promptList.pop();
        var jsonString = JSON.stringify(promptList);
        deleteJSON();
        writeJSON(jsonString);
        message.channel.send(removedCharacter + " Was removed!");
    }
}

module.exports = {
    whatToDraw: function(message) {
        var contentArgs = message.content.split(' ');
        if (contentArgs[1] == 'add') {
            if (contentArgs.length < 4) {
                message.channel.send("Could not add this Character! You gave the wrong Arguments");
            } else {
                let dataString = contentArgs[2].concat("\n").concat(contentArgs[3]);
                addPrompt(dataString, message);
            }
        } else if (contentArgs.length == 1) {
            var promtList = prompts;
            message.channel.send(promtList[Math.floor(Math.random() * promtList.length)]);
        } else if (contentArgs[1] == 'remove') {
            removeLatest(message);
        }
    }
}