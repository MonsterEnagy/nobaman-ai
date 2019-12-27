const Discord = require("discord.js");
const json = require("./database/siritori.json")
module.exports.run = (client , message) => {
  function judge() {
    switch(message.content) {
      case message.content.slice(-1) === "ン" || message.content.slice(-1) === "ん"
    }
  }
  if(!json[message.channel.id]) {
    //新しいゲーム
    json[message.channel.id] = {
      hatugen : []
    }
    message.channel.send("新しいゲームを開始しました。");
    const array = json[message.channel.id].hatugen
  }
}