module.exports.run = async (client, message, db, args) => {
  message.delete();
  try {
    if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
  } catch (e) {}
  const hook = await message.channel.fetchWebhooks();
  if (hook.size === 0) {
    message.channel.createWebhook("のばまん用webhook");
  }
  const option = {
    username: `${message.member.displayName} `,
    avatarURL: message.author.avatarURL
  };
  const json = db.get("sho").find({ id: message.author.id });
  if (!json.value()[args[0]]) {
    message.channel.send("存在しません").then(msg => msg.delete(5000));
  } else {
    hook.send(json.value()[args[0]], option);
  }
};
