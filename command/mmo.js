const Discord = require("discord.js");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const fs = require("fs");
const adapter = new FileSync("database/teki.json");

  var tekijson = require("../database/teki.json");
const tekidb = low(adapter);

function teki(message , json){
       const teki = tekijson.teki[Math.floor(Math.random() * tekijson.teki.length)];
        json
        .assign({
          teki: teki.name,
          tekihp: 1,
          url: teki.url,
        }).write()
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`${teki.name}がやってきた！`)
          .addField("HP",1 * json.value().level)
          .addField("攻撃力", 1 * json.value().level)
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
    //console.log("通ってる");
    if (!json.value()) {
      // console.log("通ってる");
      const tekidice = Math.floor(Math.random() * tekijson.teki.length);
      const teki = tekijson.teki[tekidice];
      // console.log(tekidice);
      db.get("mmo")
        .push({
          id: message.author.id,
          teki: teki.name,
          tekihp: 5 - 4,
          url: teki.url,
          strong: 10,
          level: 1,
          hp: 1 + 5
        })
        .write();
      var json = db.get("mmo").find({ id: message.author.id });
      var strong = 15;
      var tekistrong = 10;
      //  console.log(json.value());
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`${teki.name}がやってきた！`)
          .addField("HP", json.value().tekihp)
          .addField("攻撃力", json.value().strong)
          .setImage(teki.url)
      );
      json.assign({ tekihp: json.value().tekihp - strong }).write(); //tekihp - json.strong

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
          `攻撃しました！敵ののこりHPは${
            json.value().tekihp
          }です。\n倒しました！Lvが${json.value().level}にあがります！`
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
            tekihp: json.value().tekihp
          })
          .write();
        return message.channel.send(
          `攻撃されました！あなたの残りHPは${
            json.value().hp
          }です。\n倒されてしまいました！！Lvが${
            json.value().level
          }に下がります！`
        );
      }
      message.channel.send(
        `攻撃しました！敵ののこりHPは${
          json.value().tekihp
        }です。\n攻撃されました！あなたの残りHPは${json.value().hp}です。`
      );
    } else if (json.value().death === true || json.value().tekideath === true) {
      //------------------------------------------------------------------------------------------------------------------------------------
      // console.log("!json.tekiでーす");
        var strong = json.value().hp + json.value().level
  var tekistrong = Math.floor(json.value().hp / json.value().level) + 3;
      const tekidice = Math.floor(Math.random() * tekijson.teki.length);
      const teki = tekijson.teki[tekidice];
      var json = db.get("mmo").find({ id: message.author.id });
      json
        .assign({
          teki: teki.name,
          url: teki.url,
          tekihp:
            Math.floor(json.value().hp / 1.001) +
            Math.floor(json.value().strong / 1.001),
          tekideath: false,
          death: false
        })
        .write();
      // console.log(json.value());
      await message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`${teki.name}がやってきた！`)
          .addField("HP", json.value().tekihp)
          .addField("攻撃力", json.value().strong - 4)
          .setImage(teki.url)
      );
      /*     if(json.value().level < 300) {
       var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 15);
      var tekistrong =
        json.value().level +
        json.value().strong -40 -
        Math.floor(Math.random() * 100);
      } else if(json.value().level < 470){
       var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 250);
      var tekistrong =
        json.value().level +
        json.value().strong -200 -
        Math.floor(Math.random() * 500);
      } else if(json.value().level > 650) {
             var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 320);
      var tekistrong =
        json.value().level +
        json.value().strong -25 -
        Math.floor(Math.random() * 650);
                } else {
       var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 200);
      var tekistrong =
        json.value().level +
        json.value().strong -50 -
        Math.floor(Math.random() * 500);
      } */

       if (json.value().level < 100) {
        message.channel.send(`${message.author.username}はメラを放った！`);
        var strong = Math.floor(strong * 12);
      } else if (json.value().level < 200) {
        message.channel.send(`${message.author.username}はメラミを放った！`);
        var strong = (await strong) * 2;
      } else if (json.value().level < 300) {
        message.channel.send(
          `${message.author.username}はメラゾーマを放った！`
        );
        var strong = (await strong) * 3;
      } else if (json.value().level < 400) {
        message.channel.send(`${message.author.username}はギラを放った！`);
        var strong = (await strong) * 4;
      } else if (json.value().level < 500) {
        message.channel.send(`${message.author.username}はベギラマを放った！`);
        var strong = (await strong) * 5;
      } else if (json.value().level < 600) {
        message.channel.send(`${message.author.username}はイオを放った！`);
        var strong = (await strong) * 6;
      } else if (json.value().level < 700) {
        message.channel.send(`${message.author.username}はイオラを放った！`);
        var strong = (await strong) * 7;
      } else if (json.value().level < 800) {
        message.channel.send(
          `${message.author.username}はイオナズンを放った！`
        );
        var strong = (await strong) * 8;
      } else if (json.value().level < 900) {
        message.channel.send(
          `${message.author.username}はヒャダルコを放った！`
        );
        var strong = (await strong) * 9;
      } else if (json.value().level < 1000) {
        message.channel.send(
          `${message.author.username}はヒャダインを放った！`
        );
        var strong = (await strong) * 10;
      } else if (json.value().level < 2000) {
        message.channel.send(
          `${message.author.username}はマヒャダインを放った！`
        );
        var strong = (await strong) * 11;
      } else {
        message.channel.send(`${message.author.username}は最後の歌を歌った！`);
        var strong = (await strong) * 12;
      }

      if (Math.floor(Math.random() * 50) === 1) {
        var strong = strong * 83412874121;
        message.channel.send("会心の一撃！");
      }
      json.assign({ tekihp: json.value().tekihp - strong }).write(); //tekihp - json.strong

      if(json.value().tekihp < 0) {
      json
        .assign({
          strong: json.value().strong * 2,
          level: json.value().level + 10,
          hp: json.value().hp * 2,
          tekideath: true
        })

        .remove({ teki: teki.name, url: teki.url })
        .write();
      return message.channel.send(
        `攻撃しました！ダメージ${strong}敵ののこりHPは${
          json.value().tekihp
        }です。\n倒しました！Lvが${json.value().level}にあがります！`
      );
    }

      json.assign({ hp: json.value().hp - tekistrong }).write();

      if (json.value().hp < 0) {
        json
          .assign({
            strong: json.value().strong,
            level: json.value().level - 1,
            hp: json.value().hp * 2,
            death: true
          })
          .remove({
            teki: teki.name,
            url: teki.url,
            tekihp: json.value().tekihp
          })
          .write();
        return message.channel.send(
          `攻撃されました！${tekistrong}あなたの残りHPは${
            json.value().hp
          }です。\n倒されてしまいました！！Lvが${
            json.value().level
          }に下がります！`
        );
      }
      message.channel.send(
        `攻撃しました！ダメージ${strong}敵ののこりHPは${
          json.value().tekihp
        }です。\n攻撃されました！${tekistrong}あなたの残りHPは${
          json.value().hp
        }です。`
      );
    } else {
      //------------------------------------------------------------------------------------------------------------------------------------
      // console.log("else通りでーす！");
      /*   if(json.value().level < 300) {
       var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 15);
      var tekistrong =
        json.value().level +
        json.value().strong -40 -
        Math.floor(Math.random() * 100);
      } else if(json.value().level < 470){
       var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 250);
      var tekistrong =
        json.value().level +
        json.value().strong -2 -
        Math.floor(Math.random() * 30);
      } else if(json.value().level > 650) {
             var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 320);
      var tekistrong =
        json.value().level +
        json.value().strong -205 -
        Math.floor(Math.random() * 950);
                } else {
       var strong =
        json.value().level +
        json.value().strong -
        Math.floor(Math.random() * 200);
      var tekistrong =
        json.value().level +
        json.value().strong -50 -
        Math.floor(Math.random() * 500);
      }
          if(args[1]) {*/
  var strong = json.value().hp + json.value().level
  var tekistrong = Math.floor(json.value().hp / json.value().level) + 9;
      if (json.value().level < 100) {
        message.channel.send(`${message.author.username}はメラを放った！`);
        var strong = Math.floor(strong * 12);
      } else if (json.value().level < 200) {
        message.channel.send(`${message.author.username}はメラミを放った！`);
        var strong = (await strong) * 2;
      } else if (json.value().level < 300) {
        message.channel.send(
          `${message.author.username}はメラゾーマを放った！`
        );
        var strong = (await strong) * 323;
      } else if (json.value().level < 400) {
        message.channel.send(`${message.author.username}はギラを放った！`);
        var strong = (await strong) * 34234;
      } else if (json.value().level < 500) {
        message.channel.send(`${message.author.username}はベギラマを放った！`);
        var strong = (await strong) * 52344234;
      } else if (json.value().level < 600) {
        message.channel.send(`${message.author.username}はイオを放った！`);
        var strong = (await strong) * 61442342432;
      } else if (json.value().level < 700) {
        message.channel.send(`${message.author.username}はイオラを放った！`);
        var strong = (await strong) * 411323424427;
      } else if (json.value().level < 800) {
        message.channel.send(
          `${message.author.username}はイオナズンを放った！`
        );
        var strong = (await strong) * 3221123133418;
      } else if (json.value().level < 900) {
        message.channel.send(
          `${message.author.username}はヒャダルコを放った！`
        );
        var strong = (await strong) * 121231313421339;
      } else if (json.value().level < 1000) {
        message.channel.send(
          `${message.author.username}はヒャダインを放った！`
        );
        var strong = (await strong) * 1121321313134320;
      } else if (json.value().level < 2000) {
        message.channel.send(
          `${message.author.username}はマヒャダインを放った！`
        );
        var strong = (await strong) * 11132;
      } else {
        message.channel.send(`${message.author.username}は最後の歌を歌った！`);
        var strong = (await strong) * 1221787873;
      }

      if (Math.floor(Math.random() * 50) === 1) {
        var strong = strong * 2;
        message.channel.send("会心の一撃！");
      }
      json.assign({ tekihp: json.value().tekihp - strong }).write(); //tekihp - json.strong
      // console.log(json.value());
      if(json.value().tekihp < 0) {
      json
        .assign({
          strong: json.value().strong * 2,
          level: json.value().level + 1,
          hp: json.value().hp * 2,
          tekideath: true
        })
        .remove({
          teki: json.value().teki,
          url: json.value().url,
          tekihp: json.value().tekihp
        })
        .write();
      return message.channel.send(
        `攻撃しました！ダメージ${strong}　敵ののこりHPは${
          json.value().tekihp
        }です。\n倒しました！Lvが${json.value().level}にあがります！`
      );
      }

      json.assign({ hp: json.value().hp - tekistrong }).write();

      if (json.value().hp < 0) {
        json
          .assign({
            strong: json.value().strong * 2,
            level: json.value().level - 1,
            hp: json.value().hp * 2,
            death: true
          })
          .remove({
            teki: json.value().teki,
            url: json.value().url,
            tekihp: json.value().tekihp
          })
          .write();
        return message.channel.send(
          `攻撃されました！ダメージ${tekistrong}　あなたの残りHPは${
            json.value().hp
          }です。\n倒されてしまいました！！Lvが${
            json.value().level
          }に下がります！`
        );
      }

      message.channel.send(
        `攻撃しました！ダメージ${strong}　敵ののこりHPは${
          json.value().tekihp
        }です。\n攻撃されました！ダメージ${tekistrong}　あなたの残りHPは${
          json.value().hp
        }です。`
      );
    }
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
