const Discord = require("discord.js")
module.exports.run = (client , message, args , db) => {
const result = [];
for(var i = 0; i < message.guild.channels.size; i++){
  if(i = 0){
    result.push(`${i}. ${message.guild.channels.first().name}`)
  } else {
    result.push(`${i}. ${message.guild.channels.first(i).name}`)
  }
}
message.channel.send(new Discord.RichEmbed()
.setTitle("設定するチャンネルを選ぶ！")
.addField(result.join("\n"))
).then(msg => {
  const filter = m => m.author.id === message.author.id
// Errors: ['time'] treats ending because of the time limit as an error
  msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
  .then(collected => {
    //ここでチャンネルごとのonoff処理する
    message.channel.send(`${collected.first().content}が選ばれました。\n${collected.first().content}のonoff状態はこうなっております`)
    
    const json = db.get("switch").find({id : message.channnel.id})
    if(!json) {
      const result = [];
      const command = db.get("help").value().forEach((j , i)=> result.push(j.command))
      const command = result.split("\n")
      db.get("switch").push({
        id : message.author.id,
        
      })
    }
    let embed = new Discord.RichEmbed()
    
  })
  .catch(collected => console.log(`キャンセル`));
})

}