module.exports.run = (client, message) => {
  const fs = require("fs");
  const Discord = require("discord.js");
  const chat = require("../database/chat.json");
  if (
    message.content.startsWith("!n") ||
    message.content.startsWith("のばまん、")
  )
    return;
  if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
    message.reply(
      "`ウェブフックの管理(ロールからのばまんに権限を上げてね)`を送ってくれー!"
    );
    return;
  }
  const rannsuu = Math.floor(Math.random() * 99999);
  chat["id"][rannsuu] = {
    サーバーの名前: message.guild.name,
    サーバーのID: message.guild.id,
    チャンネル: message.channel.id,
    名前: message.author.tag,
    ID: message.author.id,
    内容: message.content
  };
  fs.writeFile("./database/chat.json", JSON.stringify(chat), err => {
    if (err) console.log(err);
  });
  //のばまんchat用webhook
  const option = {
    username: `${message.author.tag} ID:${rannsuu}`,
    avatarURL: message.author.avatarURL
  };
  if (message.attachments.first()) {
    option.file = message.attachments.first().url;
  }

  client.channels.forEach(async c => {
    try {
    if(!c.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    } catch (e) {}
    if (!chat[c.id]) return;
    const hook = await c.fetchWebhooks();
    if (hook.size === 0) {
      if (c.id === message.channel.id) {
        c.createWebhook("のばまん用webhook").then(hook => {
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
