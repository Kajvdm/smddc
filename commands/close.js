const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const categoryID = "895697644184293396";

  if (!message.member.permissions.has("KICK_MEMBER"))
    return message.reply("You are not authorized to perform this action.");

  if (message.channel.name === message.author.id) {
    message.channel.delete();
  } else {
    message.reply("You are performing this action in the wrong channel.");
  }
};

module.exports.help = {
  name: "close",
  category: "general",
  description: "Close a ticket.",
};
