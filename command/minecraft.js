const Discord = require("discord.js")
const request = require("request")
const { Attachment } = require('discord.js');
module.exports.run = (client,message,args) => {
  const option = {
    "url" : `https://api.mojang.com/users/profiles/minecraft/${args[0]}`,
    "method" : "get",
    json:true
  }
  request(option , (error , response , body) => {
    if(response)
      if(response.statusCode == 204) return message.channel.send("プレイヤーが見つかりませんでした")
    const uuid = body.id
    const name = body.name
    request({
      "url" : `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`,
      "method" : "get",
      json : true
    } , (error , response , body) => {
      console.log(body)
      let embed = new Discord.RichEmbed()
      .setTitle(`${name}の情報`)
      .addField("uuid" , uuid)
      .setThumbnail(JSON.parse(Buffer.from(body.properties[0].value,'base64').toString()).textures.SKIN.url)
      message.channel.send(embed)
    })
  })
}

module.exports.server = (client,message,args) => {
  request({
  url : `https://mcapi.xdefcon.com/server/${args}/full/json`,
  method : "get",
  json : true
  } , (error , response , body) => {
  if(Object.keys(body) == 1) return message.channel.send("見つかりませんでした");
    console.log(Buffer.from(body.icon, 'base64'))
    let embed = new Discord.RichEmbed()
    .setTitle(`${body.motd.text} : ${body.serverStatus}`)
    .setDescription(`IP:${body.serverip} | ${body.version}`)
    .addField("players" , `${body.players} / ${body.maxplayers}`)
    .addField("protocol" , body.protocol)
    .attachFile(new Attachment(Buffer.from(body.icon, 'base64')))
    message.channel.send(embed)
  })
}