const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const channelId = "896706830816903168";

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName);

  const emojis = {
    announcements: "announcements",
    events: "events",
    coder: "coder",
  };

  const reactions = [];

  let emojiText = "Add a reaction to claim a role\n\n";
  for (const key in emojis) {
    const emoji = getEmoji(key);
    reactions.push(emoji);

    const role = emojis[key];
    emojiText += `${emoji} = ${role}\n`;
  }

  message.channel.send(client, channelId, emojiText, reactions);

  client.on("messageReactionAdd", (reaction, user) => {
    console.log("add");
  });

  client.on("messageReactionRemove", (reaction, user) => {
    console.log("remove");
  });
};

module.exports.help = {
  name: "role",
  category: "general",
  description: "Get a role.",
};
