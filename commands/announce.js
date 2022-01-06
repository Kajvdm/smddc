const discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  // announcement title // message // color // channel

  if (!message.member.permissions.has("KICK_MEMBERS"))
    return message.reply("You are not authorized to perform this action.");

  var seperator = "|";

  if (args[0] == null) {
    var usageEmbed = new discord.MessageEmbed()
      .setTitle("**Usage**")
      .addFields({
        name: "You have used the command incorrect, below is a guide on how to use this command.",
        value: `?announcement (title) ${seperator} (message) ${seperator} (color)`,
      });

    return message.reply({embeds: [usageEmbed]});
  }

  var argsList = args.join(" ").split(seperator);

  if (argsList[2] === undefined) argsList[2] = "#eeeeee";

  var options = {
    title: argsList[0],
    message: argsList[1] || "No arguments specified.",
    color: argsList[2].trim(),
  };

  var announceEmbed = new discord.MessageEmbed()
    .setTitle("**New Announcement**")
    .setColor(options.color)
    .addFields({
      name: options.title,
      value: options.message,
    })
    .setTimestamp();

  var channel = message.member.guild.channels.cache.get("893578213698191420");
  if (!channel) return message.reply("Channel not found.");

  channel.send({embeds: [announceEmbed]});
};

module.exports.help = {
  name: "announcement",
  category: "staff",
  description: "Announce a specific thing to the specified channel.",
};
