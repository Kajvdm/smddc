const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (message.channel.name.toLowerCase() !== "support")
    return message.reply(
      "Please perform this action in the determined channel"
    );
  var ch = message.guild.channels.cache.find(
    (ch) => ch.name === message.author.id
  );
  if (ch) return message.channel.send("You already have a ticket open.");
  message.guild.channels
    .create(`${message.author.id}`, {
      type: "text",
      parent: "895697644184293396",
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ["VIEW_CHANNEL"],
        },
        {
          id: message.author.id,
          allow: [
            "VIEW_CHANNEL",
            "SEND_MESSAGES",
            "ADD_REACTIONS",
            "ATTACH_FILES",
          ],
        },
      ],
    })
    .then(async (channel) => {
      message.reply(`Click <#${channel.id}> to view your ticket.`);
      var ticketEmbed = new discord.MessageEmbed()
        .setTitle("**New Ticket**")
        .setDescription(
          `${message.author}, welcome to your ticket! We will react to your ticket you as soon as possible. Please leave your question here.`
        )
        .setFooter("DevScriptr Support")
        .setTimestamp();
      channel.send({embeds: [ticketEmbed]});
    });
};

module.exports.help = {
  name: "new",
  category: "general",
  description: "Create a ticket.",
};
