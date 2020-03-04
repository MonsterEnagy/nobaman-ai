const Discord = require("discord.js")
const request = require("request")
const { Attachment } = require('discord.js');
const fs = require("fs")
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
    
  if(body.icon) {
    const base64 = body.icon.split(',')[1];
    var decode = new Buffer.from(base64,'base64');

  }
    let embed = new Discord.RichEmbed()
    .setTitle(`${body.motd.text : "詳細なし"} : ${body.serverStatus}`)
    .setDescription(`IP:${body.serverip} | ${body.version}`)
    .addField("players" , `${body.players} / ${body.maxplayers}`)
    .addField("protocol" , body.protocol)
    .attachFile(new Attachment(typeof decode != undefined ? decode : "なし"))
    message.channel.send(embed)
  })
}