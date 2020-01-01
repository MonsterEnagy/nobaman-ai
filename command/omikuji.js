const Discord = require("discord.js")
module.exports.run = (client , message, db , args) => {
      var dbarray = db
      .get("omikuji")
      .find({ id: message.author.id })
      .value();
    if (!args[0]) {
      const date = new Date();
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      if (dbarray) {
        console.log(dbarray);
        console.log(dbarray.time);
        if (dbarray.time === `${y}/${m}/${d}`)
          return message.channel.send(
            `あなたはすでにおみくじを引きました。結果は${dbarray.omikujinaiyou}です。\nのばまん吉獲得数は${dbarray.nobaman}\nまたあした。`
          );
      } else {
        db.get("omikuji")
          .push({ id: message.author.id, time: `${y}/${m}/${d}`, nobaman: 0 , omikujinaiyou:"デフォルト"})
          .write();
         db.set(`${message.guild.id}.omikuji` , [])
          .push({ id: message.author.id, time: `${y}/${m}/${d}`, nobaman: 0 , omikujinaiyou:"デフォルト"})
          .write();
      }
      var dbarray = db
        .get("omikuji")
        .find({ id: message.author.id })
        .value();

      /*
大吉・・・約22％
中吉・・・約7％
小吉・・・約12％
吉・・・約25％
末吉・・・約14％
凶・・・約11％
*/

      const dice = Math.floor(Math.random() * 100) + 1;
      if (dice < 22) {
        var omikujikekka = "のばまん吉";
      } else if (dice > 22 && dice < 30) {
        var omikujikekka = "中吉";
      } else if (dice > 30 && dice < 43) {
        var omikujikekka = "小吉";
      } else if (dice > 43 && dice < 69) {
        var omikujikekka = "末吉";
      } else if (dice > 69 && dice < 89) {
        var omikujikekka = "のばまん吉";
      } else {
        var omikujikekka = "凶";
      } //.assign({

      if (omikujikekka === "のばまん吉") {
        message.channel.send(
          `あなたはなんと！！！！！！${omikujikekka}です。！！！！！\n${message.author.username}が100分の41の確率ののばまん吉を獲得しました！！`
        );
        db.get("omikuji").find({
          id: message.author.id
        })
          .assign({ omikujinaiyou: omikujikekka , nobaman: dbarray.nobaman + 1 })
          .write();
                db.get(message.guild.id).get("omikuji").find({
          id: message.author.id
        })
          .assign({ omikujinaiyou: omikujikekka , nobaman: dbarray.nobaman + 1 })
          .write();
        return;
      }
      message.channel.send(`あなたは${omikujikekka}です。`);
      db.get("omikuji").find({
        id: message.author.id
      })
        .assign({ omikujinaiyou: omikujikekka })
        .write();

            db.get(message.guild.id).get("omikuji").find({
        id: message.author.id
      })
        .assign({ omikujinaiyou: omikujikekka })
        .write();
    } else if (args[0] === "ranking") {
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
    } else if(args[0] === "sabaran") {
      const json = require("../database/db.json");
      const array = [];
      function compareFunc(a, b) {
          return b[0] - a[0];
      }
      const namearray = [];
      for (var i = 0; i < json.omikuji.length; i++) {
        array.push([json[message.guild.id].omikuji[i].nobaman , client.users.get(json[message.guild.id].omikuji[i].id).username])
      }
      
      array.sort(compareFunc);
      
      var name = [];
      let embed = new Discord.RichEmbed()
      .setTitle(`**${message.guild.name}**ののばまん吉獲得数ランキング`)
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
}