const fs = require("fs");
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("KICK_MEMBERS"))
    return message.reply("You are not authorized to perform this action.");

  var usageEmbed = new discord.MessageEmbed().setTitle("**Usage**").addFields({
    name: "You have used the command incorrect, below is a guide on how to use this command.",
    value: "?warn {user} {reason}",
  });
  if (!args[0]) return message.reply({embeds: [usageEmbed]});
  if (!args[1]) return message.reply({embeds: [usageEmbed]});

  var warnUser = message.guild.members.cache.get(
    message.mentions.users.first().id || message.guild.members.get(args[0]).id
  );

  var reason = args.slice(1).join(" ");

  if (!warnUser) return message.reply("Coudln't find the user.");

  if (warnUser.permissions.has("MANAGE_MESSAGES"))
    return message.reply("You are not authorized to perform this action.");

  const warns = JSON.parse(fs.readFileSync("./warnings.json", "UTF8"));

  if (!warns[warnUser.id])
    warns[warnUser.id] = {
      warns: 0,
    };

  warns[warnUser.id].warns++;

  var embed = new discord.MessageEmbed()
    .setColor("#ff0000")
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(
      `**Warned user:** ${warnUser.user.username} (${warnUser.id})
       **By:** ${message.author}
       **Reason: ** ${reason}`
    )
    .addField("Current Warns", warns[warnUser.id].warns.toString());

  const channel = message.member.guild.channels.cache.get("893578213698191420");

  if (!channel) return;

  channel.send({embeds: [embed]});

  if (warns[warnUser.id].warns == 3) {
    var mes = new discord.MessageEmbed()
      .setTitle("Watch out " + warnUser.user.username + "!")
      .setColor("#ee0000")
      .addField("WARNING:", "After this warning you will be kicked.");

    message.channel.send({embeds: [mes]});
  } else if (warns[warnUser.id].warns == 4) {
    message.guild.members.kick(warnUser, {reason: reason});
    message.channel.send(
      `${warnUser} is kicked by the bot for overriding the limited warns.`
    );
  } else if (warns[warnUser.id].warns == 6) {
    message.guild.members.ban(warnUser, {reason: reason});
    message.channel.send(
      `${warnUser} is banned by the bot for overriding the limited warns.`
    );

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err);
    });
  }
};

module.exports.help = {
  name: "warn",
  category: "staff",
  description: "Warns a user in the discord.",
};
