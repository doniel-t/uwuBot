const Music = require('./Music.js');

/**
 * @usage !resume
 * @does resumes Music
 */
module.exports = {
    resume: function (message) {

        Music.resume(message); //All Logic is in Music
    }
}
