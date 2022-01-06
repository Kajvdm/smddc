const botConfig = require("../botConfig.json");

module.exports.run = async (client, message, args) => {
  try {
    var prefix = botConfig.prefix;
    var response = "**Command guide**\r\n\n";
    var general = "**Algemeen**\r\n";
    var staff = "\n**Staff**\r\n";

    client.commands.forEach((command) => {
      switch (command.help.category) {
        case "general":
          general += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
          break;

        case "staff":
          staff += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
          break;
      }
    });

    response += general + staff;

    message.author
      .send(response)
      .then(() => {
        return message.reply("We have sent you instructions in your DM.");
      })
      .catch(() => {
        return message.reply(
          "Please make sure to enable your private messages."
        );
      });
  } catch (error) {
    message.reply("Something went wrong!");
    console.log(error);
  }
};

module.exports.help = {
  name: "help",
  category: "general",
  description: "Shows you all the current commands available for you.",
};
