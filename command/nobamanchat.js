  module.exports.run = (client, message) => {
  
    if(message.content.startsWith("!n")) return;
    if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
        message.reply("`ウェブフックの管理(ロールからのばまんに権限を上げてね)`を送ってくれー!");
        return;
    }
    //のばまんchat用webhook
    const option = {
        username: `${message.author.tag}`,
        avatarURL: message.author.displayAvatarURL(/*{
        format : "jpg"
        }*/)
    };
    if (message.attachments.first()) {
        option.file = message.attachments.first().url;
    }
    client.channels.forEach(async c => {
      if (!c.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
      console.log(c.name)
      const hook = await c.fetchWebhooks()
                if (hooks.size === 0) {
                    if (channel.id === message.channel.id) {
                        channel.createWebhook("のばまんchat用webhook").then(hook => {
                            message.channel.send(
                                "あ、つながっちゃった"
                            );
                          if(channel.id !== message.channel.id) {
                            hook.send(message.content, option);
                          }
                        });
                    }
                } else {
              if(channel.id !== message.channel.id) {
                 hooks.first().send(global_msg, hook_option);
                if (message.attachments.first()) {
                  let embed = new Discord.MessageEmbed()
                  .setAuthor(`${message.author.tag}が画像を投稿しました。\n(押すと画像のURLまで行きます)` , message.author.avatarURL()　, message.attachments.first().url)
                  .setImage(message.attachments.first().url)
                      hooks.first().send(embed)
    }
                          }
    })
    
  }
  
  