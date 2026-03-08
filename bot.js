const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Bot GC online como ${client.user.tag}`);
});

client.on("messageCreate", (message) => {

  if (message.author.bot) return;

  // comando de teste
  if (message.content === "!ping") {
    message.reply("Pong!");
  }

  // comando da lobby GC
  if (message.content.startsWith("!gc")) {

    const args = message.content.split(" ");
    const link = args[1];

    if (!link) {
      return message.reply("Envie o link da lobby.\nExemplo: `!gc https://gamersclub.com/...`");
    }

    const embed = new EmbedBuilder()
      .setTitle("🎮 Lobby Gamers Club")
      .setDescription("Clique no link abaixo para acessar a partida")
      .addFields(
        { name: "🔗 Link da partida", value: link },
        { name: "🕹 Jogo", value: "Counter-Strike 2", inline: true },
        { name: "📌 Tipo", value: "Lobby Fechada", inline: true }
      )
      .setColor("#5865F2")
      .setFooter({ text: "GC Discord Bot" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });

  }

});

client.login(process.env.TOKEN);
