const Discord = require("discord.js")
module.exports.run = (client , message , db , args) => {
  function str(playBoard){
  const str = playBoard.join("\n").replace(/0/g , ":green_square:")
  const str2 = str.replace(/1/g , ":white_circle:")
  const str3 = str2.replace(/2/g , ":black_circle:")
  const strfinal = str3.replace(/,/g ,"")
   return strfinal;
  }
 //0:　何もない, 1: 白, 2: 黒 
  const json = db.get("osero").find({id : message.author.id})
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//---------------------------------------スタート----------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
  if(!json) {
    var playBoard = [
      [":black_large_square:",":one:",":two:",":four:",":five:",":six:",":seven:",":eight:"]
      [":one:",0,0,0,0,0,0,0,0],
      [":two:",0,0,0,0,0,0,0,0],
      [":three:",0,0,0,0,0,0,0,0],
      [":four:",0,0,0,1,2,0,0,0],
      [":five:",0,0,0,2,1,0,0,0],
      [":six:",0,0,0,0,0,0,0,0],
      [":seven:",0,0,0,0,0,0,0,0],
      [":eight:",0,0,0,0,0,0,0,0]
    ] 
  json.push({id : message.author.id, board : playBoard})
  let embed = Discord.RichEmbed()
    .setTitle("オセロがスタート！")
    .setDescription(str(playBoard))
  message.channel.send(embed)
  } else {
  if(!args[2]) return message.channel.send("石または座標を指定してください。\n例:`!n osero b 1 1`")
    if(args[0] === "b") {
      args[0] = "2"
    } else {
      args[0] = "1"
    }
    const playBoard = json.value().board
    if(playBoard[args[1][args[2]]] !==　0) return message.channel.send("そこはすでに配置されています。")
    playBoard[args[1]][args[2]] === args[0]
  json.assigin({board : playBoard})
  }
}