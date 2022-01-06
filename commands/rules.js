const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  var ruleEmbed = new discord.MessageEmbed()
    .setTitle("**Server Rules**")
    .setDescription(
      "Welcome to the server. Please read the documentation about the rules for the server below. Have fun!"
    )
    .addFields(
      {
        name: "**Rule 1:**",
        value:
          "- This is a english server so please keep writing and talking in english!",
      },
      {
        name: "**Rule 2:**",
        value: "- Keep advertising in the prescribed channels.",
      },
      {
        name: "**Rule 3:**",
        value:
          "- We are not responsible for any payments done without Kaj#4049.",
      },
      {
        name: "**Rule 4:**",
        value: "- Please be respectful to each other individual.",
      }
    )
    .setImage(
      "https://www.kindpng.com/picc/m/115-1151841_handshake-icon-transparent-png-shaking-hands-png-download.png"
    )
    .setTimestamp();
  message.delete();
  return message.channel.send({embeds: [ruleEmbed]});
};

module.exports.help = {
  name: "rules",
  category: "staff",
  description: "Displays all rules in the specified channels.",
};
