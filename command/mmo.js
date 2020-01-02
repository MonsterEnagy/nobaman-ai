const Discord = require("discord.js");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("database/teki.json");

const tekidb = low(adapter);
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

*/
module.exports.run = async (client, message, db, args) => {
  var json = db.get("mmo").find({ id: message.author.id });

  var tekijson = require("../database/teki.json");
  if (args[0] === "attack") {
    console.log("通ってる");
    if (!json.value()) {
      console.log("通ってる");
      const tekidice = Math.floor(Math.random() * tekijson.teki.length);
      const teki = tekijson.teki[tekidice];
      console.log(tekidice);
      db.get("mmo")
        .push({
          id: message.author.id,
          teki: teki.name,
          tekihp: 5 - 4,
          url: teki.url,
          strong: 1,
          level: 1,
          hp: 1 + 5
        })
        .write();
      var json = db.get("mmo").find({ id: message.author.id });
            var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 8);
      var tekistrong =
        json.value().level +
        json.value().strong - 4 -
        Math.floor(Math.random() * 8);
      console.log(json.value());
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`${teki.value().name}がやってきた！`)
          .addField("HP", json.value().tekihp)
          .addField("攻撃力", json.value().strong -4)
          .setImage(teki.url)
      );
      json
        .assign({ tekihp: json.value().tekihp - strong })
        .write(); //tekihp - json.strong
      message.channel.send(
        `攻撃しました！敵ののこりHPは${json.value().tekihp}です。`
      );
      if (json.value().tekihp < 0) {
        json
          .assign({
            strong: json.value().strong + 1,
            level: json.value().level + 1,
            hp: json.value().level + 5
          })
          .remove({ teki: teki.name, url: teki.url })
          .write();
        return message.channel.send(
          `倒しました！Lvが${json.value().level}にあがります！`
        );
      }
      json.assign({ hp: json.value().hp - tekistrong }).write();

      message.channel.send(
        `攻撃されました！あなたの残りHPは${json.value().hp}です。`
      );

      if (json.value().hp < 0) {
        json
          .assign({
            strong: json.value().strong - 1,
            level: json.value().level - 1,
            hp: json.value().level - 5
          })
          .remove({
            teki: teki.name,
            url: teki.url,
            tekihp: json.value().tekihp,
          })
          .write();
        return message.channel.send(
          `倒されてしまいました！！Lvが${json.value().level}に下がります！`
        );
      }
    } else if (json.value().death === true || json.value().tekideath === true) {//------------------------------------------------------------------------------------------------------------------------------------
      console.log("!json.tekiでーす");
      const tekidice = Math.floor(Math.random() * tekijson.teki.length);
      const teki = tekijson.teki[tekidice];
      var json = db.get("mmo").find({ id: message.author.id });
      json.assign({
        teki : teki.name,
        url : teki.url,
        tekihp: Math.floor(json.value().hp /1.001),
        tekideath:false,
        death:false
}).write()
      console.log(json.value());
    await  message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`${teki.name}がやってきた！`)
          .addField("HP", json.value().tekihp)
          .addField("攻撃力", json.value().strong - 4)
          .setImage(teki.url)
      );
       var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 15);
      var tekistrong =
        json.value().level +
        json.value().strong -2 -
        Math.floor(Math.random() * 15);
            json
        .assign({ tekihp: json.value().tekihp - strong })
        .write(); //tekihp - json.strong
      message.channel.send(
        `攻撃しました！ダメージ${strong}敵ののこりHPは${json.value().tekihp}です。`
      );
      if (json.value().tekihp < 0) {
        json
          .assign({
            strong: json.value().strong + 1,
            level: json.value().level + 1,
            hp: json.value().level + 5,
            tekideath : true
          })
          .remove({ teki: teki.name, url: teki.url })
          .write();
        return message.channel.send(
          `倒しました！Lvが${json.value().level}にあがります！`
        );
      }
      json.assign({ hp: json.value().hp - tekistrong }).write();

      message.channel.send(
        `攻撃されました！${tekistrong}あなたの残りHPは${json.value().hp}です。`
      );

      if (json.value().hp < 0) {
        json
          .assign({
            strong: json.value().strong,
            level: json.value().level - 1,
            hp: json.value().level + json.value().strong,
            death : true
          })
          .remove({
            teki: teki.name,
            url: teki.url,
            tekihp: json.value().tekihp,
          })
          .write();
        return message.channel.send(
          `倒されてしまいました！！Lvが${json.value().level}に下がります！`
        );
      }
    } else { //------------------------------------------------------------------------------------------------------------------------------------
      console.log("else通りでーす！");
      var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 15);
      var tekistrong =
        json.value().level +
        json.value().strong - 1 -
        Math.floor(Math.random() * 15);
      json.assign({ tekihp: json.value().tekihp - strong }).write(); //tekihp - json.strong
      console.log(json.value());
      message.channel.send(
        `攻撃しました！ダメージ${strong}　敵ののこりHPは${json.value().tekihp}です。`
      );
      if (json.value().tekihp < 0) {
        json
          .assign({
            strong: json.value().strong + 1,
            level: json.value().level + 1,
            hp: json.value().level + json.value().strong * 6,
            tekideath : true
          })
          .remove({
            teki: json.value().teki,
            url: json.value().url,
            tekihp: json.value().tekihp,
          })
          .write();
        return message.channel.send(
          `倒しました！Lvが${json.value().level}にあがります！`
        );
      }
      json.assign({ hp: json.value().hp - tekistrong }).write();

      message.channel.send(
        `攻撃されました！ダメージ${tekistrong}　あなたの残りHPは${json.value().hp}です。`
      );

      if (json.value().hp < 0) {
        json
          .assign({
            strong: json.value().strong - 1,
            level: json.value().level - 1,
            hp: json.value().level + json.value().strong *4,
          death:true
          })
          .remove({
            teki: json.value().teki,
            url: json.value().url,
            tekihp: json.value().tekihp,
          })
          .write();
        return message.channel.send(
          `倒されてしまいました！！Lvが${json.value().level}に下がります！`
        );
      }
    }
  } else if(args[0] === "status") {
    let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}のステータス`)
    .addField("HP" , json.value().hp)
    .addField("攻撃力" , json.value().strong)
    .addField("レベル" , json.value().level)
    message.channel.send(embed)
  } else if(args[0] === "ranking") {
          const json = require("../database/db.json");
      const array = [];
      function compareFunc(a, b) {
          return b[0] - a[0];
      }
const namearray = [];
      for (var i = 0; i < json.omikuji.length; i++) {
        array.push([json.omikuji[i].nobaman , client.users.get(json.omikuji[i].id).username])
      }
      
      array.sort(compareFunc);
      
      var name = [];
      let embed = new Discord.RichEmbed()
      .setTitle("のばまん吉獲得数ランキング")
      .addField("1位:" +array[0][1], array[0][0])
      .addField("2位:" +array[1][1], array[1][0])
      .addField("3位:" +array[2][1], array[2][0])
      .addField("4位:" +array[3][1], array[3][0])
      .addField("5位:" +array[4][1], array[4][0])
      .addField("6位:" +array[5][1], array[5][0])
      .addField("7位:" +array[6][1], array[6][0])
      .addField("8位:" +array[7][1], array[7][0])
      .addField("9位:" +array[8][1], array[8][0])
      .addField("10位:"+array[9][1], array[9][0])
      message.channel.send(embed)
  }
  db.write();
};
