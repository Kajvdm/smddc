const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  return message.channel.send(
    "**SMD** Officiele Discord Bot \n play.smdserver.nl -> 1.18"
  );
};

module.exports.help = {
  name: "ip",
  category: "general",
  description: "Server IP.",
};
