const {Client, Intents, Collection} = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("fs");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.help.name, command);

  console.log(`File ${command.help.name}.js loaded`);
}

client.once("ready", () => {
  console.log(`${client.user.username} is online.`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  var prefix = botConfig.prefix;

  var messageArray = message.content.split(" ");

  var command = messageArray[0];

  if (!message.content.startsWith(prefix)) return;

  const commandData = client.commands.get(command.slice(prefix.length));

  if (!commandData) return;

  var arguments = messageArray.slice(1);

  try {
    await commandData.run(client, message, arguments);
  } catch (error) {
    console.log(error);
    await message.reply("There was a problem while executing this command.");
  }
});

client.login(process.env.token);