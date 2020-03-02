const Discord = require("discord.js");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const fs = require("fs");
const adapter = new FileSync("database/teki.json");

const tekidb = low(adapter);

function teki(message , json){
       const teki = tekijson.teki[Math.floor(Math.random() * tekijson.teki.length)];
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`${teki.name}がやってきた！`)
          .addField("HP", json.value().tekihp)
          .addField("攻撃力", json.value().strong)
          .setImage(teki.url)
      );
}
function tekijudge(message , json) {
      if (json.value().tekihp < 0) {
        json
          .assign({
            strong: 10 ,
            level: json.value().level + 1,
            hp: 10
          })
          .write();
        message.channel.send(
          `攻撃しました！敵ののこりHPは${
            json.value().tekihp
          }です。\n倒しました！Lvが${json.value().level}にあがります！`
        );
        return false;
      } else {
        message.channel.send(
          `攻撃しました！敵ののこりHPは${
            json.value().tekihp
          }です。`)
      }
}
function judge(message ,json) {
      if (json.value().hp < 0) {
        json
          .assign({
            strong: 10,
            level: json.value().level - 1,
            hp: 10
          })
          .write();
message.channel.send(
          `攻撃されました！あなたの残りHPは${
            json.value().hp
          }です。\n倒されてしまいました！！Lvが${
            json.value().level
          }に下がります！`
        );
        return false;
      } else {
        message.channel.send(`攻撃されました！あなたの残りHPは${json.value().hp}です。`)
      }
}
/*
db {
mmo : [
  {
  "id" : "id",
  "hp" : 10
  "strong" : "1"
  "teki" : "tekiの名前",
  "url" : "tekiのurl",
  "tekihp" : "敵のHP"
  "tekistrong" : "敵の強さ"
  "level" : "1"
  },
{

}
  ]
}
//初期HP Strong ともに10
//初期敵のHP Strong ともに1
*/
module.exports.run = async (client, message, db, args) => {
  var json = db.get("mmo").find({ id: message.author.id });

  var tekijson = require("../database/teki.json");
  if (args[0] === "attack") {
if(!json.value()) { 
      const teki = tekijson.teki[Math.floor(Math.random() * tekijson.teki.length)];
      db.get("mmo")
        .push({
          id: message.author.id,
          teki: teki.name,
          tekihp: 1,
          url: teki.url,
          strong: 10,
          level: 1,
          hp: 10
        })
        .write();
  message.channel.send("登録完了")
} 
    const strong = 5 * json.value().level
    const tekistrong = 5 * json.value().level
  teki(message , json)
json.assign({ tekihp: json.value().tekihp - strong }).write();
  if(tekijudge(message , json)) return;
 /* while(1){
        json.assign({ hp: json.value().hp - tekistrong}).write();
    if(judge(message , json)) {
      break;
        
    }
        json.assign({ tekihp: json.value().tekihp - strong }).write();
  if(tekijudge(message , json)) {
    break;
      }
  }*/
  } else if (args[0] === "status") {
    if (!json)
      return message.channel.send("一回プレイしてからステータスを見てね");
    let embed = new Discord.RichEmbed()
      .setTitle(`${message.author.username}のステータス`)
      .addField("HP", json.value().hp)
      .addField("攻撃力", json.value().strong)
      .addField("レベル", json.value().level);
    message.channel.send(embed);
  } else if (args[0] === "ranking") {
    const json = db.get("mmo").value();

    const array = [];
    function compareFunc(a, b) {
      return b[0] - a[0];
    }
    const namearray = [];
    for (var i = 0; i < 10; i++) {
      if (!json[i]) {
        array.push(["いない", "なし"]);
      } else {
        array.push([json[i].level, client.users.get(json[i].id).username]);
      }
    }

    array.sort(compareFunc);

    var name = [];
    let embed = new Discord.RichEmbed()
      .setTitle("レベルランキング")
      .addField("1位:" + array[0][1], array[0][0])
      .addField("2位:" + array[1][1], array[1][0])
      .addField("3位:" + array[2][1], array[2][0])
      .addField("4位:" + array[3][1], array[3][0])
      .addField("5位:" + array[4][1], array[4][0])
      .addField("6位:" + array[5][1], array[5][0])
      .addField("7位:" + array[6][1], array[6][0])
      .addField("8位:" + array[7][1], array[7][0])
      .addField("9位:" + array[8][1], array[8][0])
      .addField("10位:" + array[9][1], array[9][0]);
    message.channel.send(embed);
  } else if (!args[0]) {
    let embed = new Discord.RichEmbed()
      .setTitle("**ゲームを始めようーー**")
      .addField(
        "ランキング",
        "`!n game ranking`でレベルのランキングが見られるよ。"
      )
      .addField(
        "ゲームを始める",
        "`!n game attack`でゲームを始める/敵に攻撃することができるよ！"
      )
      .addField(
        "ステータス",
        "`!n game status`自分のHP、攻撃力、レベルが見られるよ"
      );
    message.channel.send(embed);
  } else if (args[0] === "create") {
    if (message.author.id !== "551421671332904960") return;
    const json = require("../database/teki.json");
    const fs = require("fs");
    if (message.attachments.first()) {
      var url = message.attachments.first().url;
    } else {
      var url = args[2];
    }
    json["teki"].push({
      name: args[1],
      url: url
    });
    fs.writeFile("./database/teki.json", JSON.stringify(json), err => {
      if (err) console.log(err);
    });
    message.channel.send("作りました。" + `名前:${args[1]} 写真:${url}`);
  } else if (args[0] === "reset") {
    if (message.author.id !== "551421671332904960") return;
  }
  db.write();
};
