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
  const json = db.get("osero").find({id : message.channel.id})
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
      [":one:",    0,0,0,0,0,0,0,0],
      [":two:",    0,0,0,0,0,0,0,0],
      [":three:",  0,0,0,0,0,0,0,0],
      [":four:",   0,0,0,1,2,0,0,0],
      [":five:",   0,0,0,2,1,0,0,0],
      [":six:",    0,0,0,0,0,0,0,0],
      [":seven:",  0,0,0,0,0,0,0,0],
      [":eight:",  0,0,0,0,0,0,0,0]
    ] 
  json.push({id : message.channel.id, board : playBoard , flg:Math.floor(Math.random() * 2 + 1)})
  const ban = json.value().flg.replace(/2/ , "黒").replace(/1/ , "白")
  let embed = Discord.RichEmbed()
    .setTitle("オセロがスタート！")
    .setDescription(str(playBoard))
    .setFooter("先攻:" + ban)
  message.channel.send(embed)
  } else {
  if(!args[1]) return message.channel.send("石または座標を指定してください。\n例:`!n osero 1 1`")

    const playBoard = json.value().board
    if(playBoard[args[0][args[1]]] !==　0) return message.channel.send("そこはすでに配置されています。")
    playBoard[args[0]][args[1]] === json.value().flg
  json.assign({board : playBoard})
kakunin(playBoard)
  if(json.value().flg === "1") {
    json.assign({flg : 2})
  var embed = new Discord.RichEmbed()
    .setTitle("オセロ！")
    .setDescription(str(playBoard))
    .setFooter("黒の番です。")
  } else {
        json.assign({flg : 1})
  var embed = new Discord.RichEmbed()
    .setTitle("オセロ！")
    .setDescription(str(playBoard))
    .setFooter("白の番です。")
  }
  message.channel.send(embed)
  }
}


function kakunin(ban_ar , db , message){
var check_reverse_cnt = 0
  var white_cnt = 0
var black_cnt = 0
for (var x = 1; x < 9; x++) {
for (var y = 1; y < 9; y++) {
// 空白マスのみおけるのでチェック
// それ以外は石の数を加算
switch( ban_ar[x][y] ) {
case 0:
check_reverse_cnt = check_reverse_cnt + check_reverse(x,y)
// バックアップから元に戻す
for (var i = 1; i < 9; i++) {
for (var ii = 1; ii < 9; ii++) {
ban_ar[i][ii] = db.get("osero").find({ id :message.channel.id}).value().playBoard
}
}
break;
case -1:
white_cnt++
break
case 1:
black_cnt++
break
}
}
}
}
