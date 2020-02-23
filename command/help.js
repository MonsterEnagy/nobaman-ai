const Discord = require("discord.js")
module.exports.run = (client, message, args , db) => {
const benri = ["memo" , "todo" , "userinfo" , "news" , "weather" , "bun" , "poll" , "sikaku" , "totuzenn"]
const oasobi = ["fortnite" , "Symmetry" , "image" , "Colorinversion" , "game" , "omikuji" , "nobamanchat" , "wadai" , "youtube" , "moji"]
     if (!args[0]) {
      let embed = new Discord.RichEmbed()
        .setTitle("nobaman aiの機能")
        .setDescription("`!n help 〇〇`で確認してね")
        .addField("お遊び" ,`\`${oasobi.join("` `")}\``)
        .addField("便利系", `\`${benri.join("` `")}\``)
      message.channel.send(embed);
    } else {
      if(!db.get("help").find(args[0]).value().description) return message.channel.send("その機能のhelpはつくられていません")
let embed = new Discord.RichEmbed()
.setTitle(`${args[0]}の機能`)
.setDescription(db.get("help").find(args[0]).value().description)
message.channel.send(embed)
    }
  
  /*else if (args[0] === "fortnite") {
      let embed = new Discord.RichEmbed()
        .setTitle(" Fortnite機能説明")
        .addField(
          "!n fortnite shop",
          "Fortniteのショップが見れます。(通知注意)"
        )
        .addField(
          "!n fortnite stats (名前)",
          "Fortniteのユーザー情報が見れます"
        );
      message.channel.send(embed);
    } else if (args[0] === "todo") {
      let embed = new Discord.RichEmbed()
        .setTitle("Todo(やることリスト)機能説明！")
        .addField("!n todo", "Todoの作成/Todoの表示ができるコマンド")
        .addField("!n todo create", "Todoの追加ができるコマンド")
        .addField("!n todo delete", "Todoの初期化ができるコマンド。")
        .addField(
          "!n todo clear (消したいTodoの番号)",
          "Todoをクリアできるコマンド"
        );
      message.channel.send(embed);
    } else if (args[0] === "memo") {
      let embed = new Discord.RichEmbed()
        .setTitle("メモ機能説明！")
        .addField("!n memo", "メモ一覧の表示ができるコマンド")
        .addField("!n memo create (名前) (内容)", "メモの作成ができるコマンド")
        .addField(
          "!n memo delete (消したいメモの名前)",
          "メモの削除ができるコマンド。"
        )
        .addField("!n memo (見たいメモの名前)", "メモの閲覧ができるコマンド");
      message.channel.send(embed);
    }*/
}