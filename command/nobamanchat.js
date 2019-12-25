  module.exports.run = (client, message) => {
  
    if(message.content.startsWith("!n")) return;
    message.channel.fetchWebhooks()
    .then(hook => {
      hook.find(i => i.name === "のばまんchat用webhook")
    })
    
    client.channels.forEach(c => {
      console.log(c.name)
      c.fetchWebhooks()
      .then(hook => hook.find(i => i.name === "のばまんchat用webhook").send("aaa 接続成功"))
    })
    
  }
  
  