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
module.exports.run = (client, message, db, args) => {
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
      console.log(json.value());
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`${teki.value().name}がやってきた！`)
          .addField("HP", json.value().tekihp)
          .addField("攻撃力", json.value().tekistrong)
          .setImage(teki.url)
      );
      json.assign({ tekihp: json.value().tekihp - json.strong }).write(); //tekihp - json.strong
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
      json.assign({ hp: json.value().hp - json.value().tekistrong }).write();

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
            tekistrong: json.value().strong
          })
          .write();
        return message.channel.send(
          `倒されてしまいました！！Lvが${json.value().level}に下がります！`
        );
      }
    } else if (!json.teki) {
      var strong = json.level + json.strong - Math.floor(Math.random() * 8);
    } else {
      var strong = json.level + json.strong - Math.floor(Math.random() * 8);
      tekidb.get("teki").find({ name: json.value().teki });
            json.assign({ tekihp: json.value().tekihp - json.strong }).write(); //tekihp - json.strong
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
      json.assign({ hp: json.value().hp - json.value().tekistrong }).write();

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
            tekistrong: json.value().strong
          })
          .write();
        return message.channel.send(
          `倒されてしまいました！！Lvが${json.value().level}に下がります！`
        );
      }
    }
  }
  db.write();
};
