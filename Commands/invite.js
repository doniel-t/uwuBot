/**
 * @usage !invite
 * @does sends you the Invite-Link of uwuBot
 */
module.exports = {
   invite: function (message) {
      global.bot.generateInvite().then(inv => {
         message.channel.send(inv);
      })
   }
}