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

  // teste do bot
  if (message.content === "!ping") {
    return message.reply("Pong!");
  }

  // detectar link da Gamers Club automaticamente
  if (message.content.includes("gamersclub.com")) {

    const link = message.content;

    const embed = new EmbedBuilder()
      .setTitle("🎮 Lobby Gamers Club")
      .setDescription("Clique no link abaixo para acessar a partida")
      .addFields(
        { name: "🔗 Entrar na lobby", value: `[Clique aqui](${link})` },
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
