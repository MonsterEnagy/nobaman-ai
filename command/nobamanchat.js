module.exports.run = (client, message) => {
  const Discord = require("discord.js");
  const chat = require("../database/chat.json");
  if (message.content.startsWith("!n") && message.content.startsWith("のばまん、")) return;
  if(chat[message.channel.id].ban) return message.channel.send("あなたはBANされています");
  if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
    message.reply(
      "`ウェブフックの管理(ロールからのばまんに権限を上げてね)`を送ってくれー!"
    );
    return;
  }
    var rannsuu = Math.floor(Math.random() * 99999)
  //のばまんchat用webhook
  const option = {
    username: `${message.author.tag}`,
    avatarURL: message.author.avatarURL
  };
  if (message.attachments.first()) {
    option.file = message.attachments.first().url;
  }
  client.channels.forEach(async c => {
    if (!c.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
     if (!chat[c.id]) return;
    const hook = await c.fetchWebhooks();
    if (hook.size === 0) {
      if (c.id === message.channel.id) {
        c.createWebhook("のばまんchat用webhook").then(hook => {
          message.channel.send("あ、つながっちゃった");
          if (c.id !== message.channel.id) {
            hook.send(message.content, option);
          }
        });
      }
    } else {
      if (c.id !== message.channel.id) {
        hook.first().send(message.content, option);
      }
    }
  });
};
