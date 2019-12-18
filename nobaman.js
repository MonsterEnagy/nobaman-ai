const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const tisiki = require("./nobaman.json");

var unknow = []; //知らないフラグ
var know = []; //知ってるフラグ

function divideArrIntoPieces(arr, n) {
  var arrList = [];
  var idx = 0;
  while (idx < arr.length) {
    arrList.push(arr.splice(idx, idx + n));
  }
  return arrList;
}

function tisikilength(message) {
  if (Object.keys(tisiki).length % 2 == 0) {
    message.channel.send(
      "のばまんくんの知識が" + Object.keys(tisiki).length + "を超えたよ！"
    );
  }
}

client.on("ready", () => {
  console.log("I'm ready!");
});

client.on("message", async message => {
  if (message.author.bot || !message.guild) return;
  console.log(`${know}\n${unknow}`);
  console.log(
    `${message.guild.name}:${message.channel.name}:${message.author.username}:${message.content}`
  );
  if (know.length != 0 || unknow.length != 0) {
    console.log("通ってる" + `${know},${unknow}`);
    if (unknow[0] === message.channel.id) {
      console.log("知らない分岐点" + `${know},${unknow}`);
      message.channel.send(`
			へぇ~！\n\`\`\`${message.content}\`\`\`\nって意味なんだ！のばまん覚えるよ！\n\
			\`チュートリアル:のばまんは${unknow[1]}を覚えました。\`
			`);

      tisiki[unknow[1]] = {
        imi: message.content,
        hito: message.author.tag,
        server: message.guild.name
      };
      tisikilength(message);
      unknow = []; //知らないフラグ
      know = []; //知ってるフラグ
    } else if (know[0] === message.channel.id && know[2] === "flag") {
      console.log("知ってる分岐点2" + `${know},${unknow}`);
      message.channel.send(`
			へぇ~！\n\`\`\`${
        message.content
      }\`\`\`\nって意味なんだ！のばまんまた覚えるよ！\n\
			\`チュートリアル:のばまんは${know[1]}を覚えました。\`
			`);

      tisiki[know[1]] = {
        imi: message.content,
        hito: message.author.tag,
        server: message.guild.name
      };
      tisikilength(message);
      unknow = []; //知らないフラグ
      know = []; //知ってるフラグ
    } else if (know[0] === message.channel.id && message.content === "違うよ") {
      console.log("知ってる分岐点" + `${know},${unknow}`);
      message.channel.send(
        "ええええ、違ったの！？じゃあ、間違ってない知識を教えてくれませんか・・・(懇願)\n `チュートリアル:この後に意味を書くとのばまんが覚えてくれます。`"
      );
      unknow = []; //知らないフラグ
      know = [message.channel.id, know[1], "flag"]; //知ってるフラグ
    } else if (know[0] === message.channel.id && message.content !== "違うよ") {
      message.channel.send("なんだ、よかった");
      unknow = []; //知らないフラグ
      know = []; //知ってるフラグ
    }
  }

  if (
    message.content.indexOf("って知ってる？") != "-1" &&
    message.content.indexOf("のばまん、") != "-1"
  ) {
    var tango = message.content.slice(5, -7);

    console.log(tango);
    if (!tisiki[tango]) {
      message.channel.send(
        `\`${tango}\`ってなんですか？教えてくれえぇぇぇ！(魂の解放)\n\`チュートリアル:この後に意味を書くとのばまんが覚えてくれます。\``
      );

      unknow = [message.channel.id, tango, message.author.tag];
    } else {
      message.channel.send(
        `それなら知ってるよ!\`${tisiki[tango].server}\`の\`${tisiki[tango].hito}\`さんが教えてくれたんだ！\n\`\`\`${tisiki[tango].imi}\`\`\`\nだよね!\n違ったら\`違うよ\`って言ってな`
      );
      know = [message.channel.id, tango];
    }
  }

  fs.writeFile("./nobaman.json", JSON.stringify(tisiki), err => {
    if (err) console.log(err);
  });
  const prefix = "!n"
  if(message.content.indexOf(prefix.trim()) !== 0 ) return;
 
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
  const command = args.shift().toLowerCase();
  
  const kekka = message.content.replace(/\s+/ , "").slice(prefix.length + command.length)
  if(command === "help") {
    let embed = new Discord.RichEmbed()
    .setTitle("nobaman aiにできること")
    .addField("知識の蓄え" , "のばまん、〇〇って知ってる？と聞くと、〇〇の部分に当たるところの情報をnobaman aiに保存させることができます")
    .addField("やることリスト(todo)" , "かみぃんぐぅすぅぅぅう⤴⤴⤴んんんんん⤵ｗｗｗｗｗ")
    .setColor("#b9c42f")
    message.channel.send(embed)
  } if(command === "todo") {
    /*json構造
    id : {
    todo : []
    }   
    */
    const todo = require("./database/todo.json");
    if(!args[0]) {
      
    if(!todo[message.author.id]) {
      const m = await message.channel.send("todoがありません。作成しています...");
      todo[message.author.id] = {
        todo : []
      }
      m.edit("todoを作成しました。")
    } else if(todo[message.author.id].todo.length == 0) {
      message.channel.send("todoがありません。todoを追加してね。");
    } else {
      let embed = new Discord.RichEmbed()
      .setTitle("やることリスト")
      .setDescription(`${todo[message.author.id].todo.join("\n")}`)
      message.channel.send(embed)
    }
    } else if(args[0] === "create") {
     const m = await message.channel.send(`${kekka.slice(7).trim()}をtodoに追加します・・・・`)
      todo[message.author.id].todo.push(kekka.slice(7).trim());
      m.edit(`${kekka.slice(7).trim()}をtodoに追加しました。`);
    } else if(args[0] === "delete") {
      const m = await message.channel.send("todoを初期化しています・・・");
      delete todo[message.author.id]
      m.edit("todoを初期化しました。")
    }
    
  fs.writeFile("./database/todo.json", JSON.stringify(todo), err => {
    if (err) console.log(err);
  });
  }
});

client.login(process.env.token);

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000);
