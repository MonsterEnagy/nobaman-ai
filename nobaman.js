const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
console.log("起動");
const tisiki = require("./database/nobaman.json");
const chat = require("./database/chat.json");
const vc = require("./database/vc.json");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database/db.json");
const cooltime = [];
const coolDownList = new Set();
const db = low(adapter);
db.defaults({
  omikuji: [],
  mmo : [],
  help : [],
  point : []
}).write();
const cooldown = new Set();
var unknow = []; //知らないフラグ
var know = []; //知ってるフラグ
 
function tisikilength(message) {
  if (Object.keys(tisiki).length % 2 == 0) {
    message.channel.send(
      "のばまんくんの知識が" + Object.keys(tisiki).length + "を超えたよ！"
    );
  }
}
function koukoku(message) {
  client.channels.forEach(async c => {
    if (!chat[c.id]) return;
    c.send(
      "----------------広告----------------\nのばまんAIの開発者`MonsterEnergy`のサーバーができました！\n気ままに会話できるサーバーを目指すのでぜひ入ってください！\nhttps://discord.gg/v3rHCGx"
    );
  });
}
setInterval(koukoku, 3600000 * 24);

function formatDate(date) {
  date.setTime(date.getTime() + 1000*60*60*9);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const day = "日月火水木金土".charAt(date.getDay());
  return `${y}年${m}月${d}日${h}時${min}分${sec}秒 (${day})`;
}
function AIrequest(content, message) {
  const request = require("request");
  const ransuu = Math.floor(Math.random() * 100) + 1;
  const filter = 　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　["ちんちん","うんこ" ,"うんち" , "う/ん/ち" , "う　んち" , "う　ん　ち" , "う　んち", "う/んち" , "うん/ち" , "セックス" , "エロ" , "AV" , "av","工口" , "せっくす" , "せっく　す", "しね" , "死ね" , "氏ね" , "パンツ" , "ぱんつ" , "パンティー" , "まんこ" , "まんまん" , "精子" , "せいし" , "ちんこ" , "人でなし" , "クズ" , "くず" , "ばか" , "ばーか" , "ばか" , "らんし" , "卵子" , "おっぱい", "胸" , "夜の営み" , "きも" ,  "雑魚", "ざこ" , "えっち" , "エッチ"]
  
  for(var i = 0; filter.length > i; i++) {
    if(message.content.includes(filter[i])) {
      return message.channel.send("禁止ワードを言わないでください");
      break;
    }
  }
  request(
    {
      url: `https://app.cotogoto.ai/webapi/noby.json?appkey=${
        process.env.nobyapi
      }&text=${encodeURIComponent(content)}&study=1&persona=${Math.floor(
        Math.random() * 4
      )}`,
      method: "GET",
      json: true
    },
    (err, response, body) => {
      if (response.statusCode !== 200 || err) return console.error(err)
      else {
        if (body.errors) {
          const comment = content;

          /*---------------------------------------*/
          /* レクエストデータ */
          /*---------------------------------------*/
          var FormData = require("form-data");
          let formdata = new FormData();
          //- apikeyパラメーター
          formdata.append("apikey", process.env.talkAPI);
          //- コメント
          formdata.append("query", comment);

          /*---------------------------------------*/
          /* リクエスト */
          /*---------------------------------------*/
          const fetch = require("node-fetch");
          fetch("https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk", {
            method: "post",
            body: formdata
          }).then(response => {
            //- レスポンス取得
            response.json().then(data => {
              //- 返答取得
              const reply = data.results[0].reply;
              if (!data.results[0])
                return message.channel.send("よくわからない");
              //- 出力
              message.channel.send(reply + "(A3RTのばまん)");
            });
          });
        }  else {
            for(var i = 0; filter.length > i; i++) {
    if(message.content.includes(filter[i])) {
      return message.channel.send("禁止ワードが入っていたので規制しました")
      break;
    }
  }
          message.channel.send(body.text);
        }
      }
    }
  );
}
client.on("message", async message => {
  if (message.author.bot || !message.guild) return;
  if (message.content.indexOf("!nn") !== 0) {
    if (message.channel.name !== "のばまんとお話しよう") return;
  }
  if (message.channel.name !== "のばまんとお話しよう") {
    AIrequest(message.content.replace(/\s+/, "").slice(3), message);
    return;
  } else {
    AIrequest(message.content, message);
  }
});
client.on("ready", () => {
  console.log("I am ready!");
  client.user.setActivity(`!n help|${client.guilds.size}サーバー`, {
    type: "WATCHING"
  });
});
client.on("guildCreate", guild => {
  client.user
    .setActivity(`!n help|${client.guilds.size}サーバー`, { type: "WATCHING" })
  guild.fetchInvites()
  .then(invite => {
      client.users
        .get("551421671332904960")
        .send(`${guild.name}に入ったよ！ ${guild.members.size}人\${invite.first().url}`)
  })

    
    .catch(console.error);
});

client.on("guildDelete", guild => {
  client.user
    .setActivity(`!n help|${client.guilds.size}サーバー`, { type: "WATCHING" })
    .then(presence => {
      client.users
        .get("551421671332904960")
        .send(`${guild.name}からkickされたよ・・・`);
    })
    .catch(console.error);
});

client.on("message", async message => {

  if (message.author.bot || !message.guild) return;
  if(message.guild.id === "302627651036774401") {
    if(!db.get("point").find({ id: message.author.id }).value()) {
      db.get("point").push({id : message.author.id,point:0}).write()
    }
  }
  console.log(
    `${message.guild.name}:${message.channel.name}:${message.author.username}:${message.content}`
  );
  if (know.length != 0 || unknow.length != 0) {
    // console.log("通ってる" + `${know},${unknow}`);
    if (unknow[0] === message.author.id) {
      //console.log("知らない分岐点" + `${know},${unknow}`);
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
    } else if (know[0] === message.author.id && know[2] === "flag") {
      //console.log("知ってる分岐点2" + `${know},${unknow}`);
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
    } else if (know[0] === message.author.id && message.content === "違うよ") {
      //console.log("知ってる分岐点" + `${know},${unknow}`);
      message.channel.send(
        "ええええ、違ったの！？じゃあ、間違ってない知識を教えてくれませんか・・・(懇願)\n `チュートリアル:この後に意味を書くとのばまんが覚えてくれます。`"
      );
      unknow = []; //知らないフラグ
      know = [message.author.id, know[1], "flag"]; //知ってるフラグ
    } else if (know[0] === message.author.id && message.content !== "違うよ") {
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

    if (!tisiki[tango]) {
      message.channel.send(
        `\`${tango}\`ってなんですか？教えてくれえぇぇぇ！(魂の解放)\n\`チュートリアル:この後に意味を書くとのばまんが覚えてくれます。\``
      );

      unknow = [message.author.id, tango, message.author.tag];
    } else {
      message.channel.send(
        `それなら知ってるよ!\`${tisiki[tango].server}\`の\`${tisiki[tango].hito}\`さんが教えてくれたんだ！\n\`\`\`${tisiki[tango].imi}\`\`\`\nだよね!\n違ったら\`違うよ\`って言ってな`
      );
      know = [message.author.id, tango];
    }
  }

  fs.writeFile("./database/nobaman.json", JSON.stringify(tisiki), err => {
    if (err) console.log(err);
  });
  if (
    message.content.indexOf("って何？") != "-1" &&
    message.content.indexOf("のばまん、") != "-1"
  ) {
    require("./command/wiki.js").run(
      client,
      message,
      message.content.slice(5, -4)
    );
  }
  if (
    message.content.indexOf("何時？") != "-1" &&
    message.content.indexOf("のばまん、") != "-1"
  ) {
   message.channel.send(formatDate(new Date())) 
  }
  const prefix = "!n";

  if (chat[message.channel.id]) {
    require("./command/nobamanchat.js").run(client, message);
  }

  if (
    vc[message.channel.id] ||
    (message.content.startsWith("!vn") && !message.content.startsWith("!n"))
  ) {
    if (message.content.startsWith("!vn")) {
      var yomiage = message.content.slice(3);
    } else {
      var yomiage = message.content;
    }
    require("./command/vc.js").run(client, message, cooldown, yomiage);
  }
  if (message.content.indexOf(prefix.trim()) !== 0) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const command = args.shift().toLowerCase();

  const kekka = message.content
    .replace(/\s+/, "")
    .slice(prefix.length + command.length);

  if (command === "help") {
 require("./command/help.js").run(client , message, args , db)
  } if (command === "todo") {
    
    /*json構造
    id : {
    todo : []
    }   
    */
    const todo = require("./database/todo.json");
    if (!args[0]) {
      if (!todo[message.author.id]) {
        const m = await message.channel.send(
          "todoがありません。作成しています..."
        );
        todo[message.author.id] = {
          todo: []
        };
        m.edit("todoを作成しました。");
      } else if (todo[message.author.id].todo.length == 0) {
        message.channel.send("todoがありません。todoを追加してね。");
      } else {
        const todoList = [];
        for (var i = 0; i < todo[message.author.id].todo.length; i++) {
          todoList.push(i + 1 + "." + todo[message.author.id].todo[i]);
        }
        let embed = new Discord.RichEmbed()
          .setTitle("やることリスト")
          .setDescription(`${todoList.join("\n")}`);
        message.channel.send(embed);
      }
    } else if (!todo[message.author.id]) {
      const m = await message.channel.send(
        "todoがありません。作成しています..."
      );
      todo[message.author.id] = {
        todo: []
      };
      m.edit("todoを作成しました。");
    } else if (args[0] === "create") {
      const m = await message.channel.send(
        `${kekka.slice(7).trim()}をtodoに追加します・・・・`
      );
      todo[message.author.id].todo.push(kekka.slice(7).trim());
      m.edit(`${kekka.slice(7).trim()}をtodoに追加しました。`);
    } else if (args[0] === "delete") {
      const m = await message.channel.send("todoを初期化しています・・・");
      delete todo[message.author.id];
      m.edit("todoを初期化しました。");
    } else if (args[0] === "clear") {
      if (!args[1])
        return message.channel.send(
          "消すTodoの番号がわかりません\n例(1番を消す場合) ``!n todo clear 1`"
        );
      const m = await message.channel.send(`${args[1]}をクリアします。`);
      todo[message.author.id].todo.splice(args[1] - 1, 1);
      m.edit(`${args[1]}をクリアしました。`);
    }

    fs.writeFile("./database/todo.json", JSON.stringify(todo), err => {
      if (err) console.log(err);
    });
  }
  if (command === "memo") {
    /*json構造
    id : {
    memo名前 : "memo内容"
    }   
    */
    const todo = require("./database/memo.json");
    //   console.log(todo[message.author.id]);
    if (!args[0]) {
      const array = [];
      for (var item in todo[message.author.id]) {
        array.push(item);
      }
      if (array.length === 0)
        return message.channel.send("メモが一つもありません");
      message.channel.send("メモ一覧" + `\n\`\`\`${array}\`\`\``);
    } else if (args[0] === "create") {
      if (!todo[message.author.id]) {
        todo[message.author.id] = {};
      }
      if (!args[2])
        return message.channel.send(
          "情報が足りません。 \n`明日やること`という名前のメモに`明日は何もしない`と書く場合の例\n!n memo create 明日やること 明日は何もしない"
        );
      const m = await message.channel.send(
        `\`${kekka.slice(7 + args[1].length + 1).trim()}\`を\`${
          args[1]
        }\`にメモしました`
      );
      todo[message.author.id][args[1]] = kekka
        .slice(7 + args[1].length + 1)
        .trim();
      m.edit(`${args[1]}を作りました。`);
    } else if (args[0] === "delete") {
      const m = await message.channel.send("memoを消しています・・・");
      delete todo[message.author.id][args[1]];
      m.edit(`${args[1]}を消しました`);
    } else {
      message.channel.send(`\`\`\`${todo[message.author.id][args[0]]}\`\`\``);
    }
    fs.writeFile("./database/memo.json", JSON.stringify(todo), err => {
      if (err) console.log(err);
    });
  }
  if (command === "user") {
    const member =
      message.mentions.members.first() ||
      message.guild.members.get(args[0]) ||
      message.member;
    let bot;
    if (member.user.bot === true) {
      bot = "はい";
    } else {
      bot = "いいえ";
    }
    const avatar = message.mentions.users.first() || message.author;
    const embed = new Discord.RichEmbed()
      .setColor("#b9c42f")
      .setAuthor(`${member.user.tag} (${member.id})`)
      .setThumbnail(avatar.avatarURL)
      .addField(
        "ニックネーム:",
        `${
          member.nickname !== null ? `${member.nickname}` : "ニックネームなし"
        }`,
        true
      )
      .addField("Bot", `${bot}`, true)
      .addField(
        "プレイング",
        `${
          member.user.presence.game
            ? `${member.user.presence.game.name}`
            : "プレイしていない"
        }`,
        true
      )
      .addField(
        "役職",
        `${member.roles
          .filter(r => r.id !== message.guild.id)
          .map(roles => `\`${roles.name}\``)
          .join(" **|** ") || "無職"}`,
        true
      )
      .addField("アカウント作成時", formatDate(member.user.createdAt), true)
      .addField("入室時", formatDate(member.joinedAt), true)
      .addField("状態", member.presence.status, true)
      .addField(
        "ラストメッセージ",
        member.lastMessage || member.user.lastMessage
      );
    message.channel.send(embed);
    return;
  }
  if (command === "fortnite") {
    const request = require("request");
    const key = "9697ac23-063a-47ba-8c79-d327222116f9";
    if (!args[0])
      return message.channel.send(
        "情報が足りません\n`!n help`で使い方を確認してね"
      );
    else if (args[0] === "shop") {
      const options = {
        url: "https://api.fortnitetracker.com/v1/store",
        method: "get",
        json: true,
        headers: { "TRN-Api-Key": key }
      };
      request(options, (error, response, body) => {
        for (var i = 0; i < body.length; i++) {
          let embed = new Discord.RichEmbed()
            .setImage(body[i].imageUrl)
            .setTitle(body[i].name)
            .setDescription(`値段:${body[i].vBucks}VBucks`);
          message.channel.send(embed);
        }
      });
    } else if (args[0] === "stats") {
      const options = {
        url: `https://api.fortnitetracker.com/v1/profile/pc/${args[1]}`,
        method: "get",
        json: true,
        headers: { "TRN-Api-Key": key }
      };
      request(options, (error, response, body) => {
        let embed = new Discord.RichEmbed()
          .setTitle(args[1])
          .setDescription(`id:${body.accountId}`)
          .addField("ビクロイ数", body.lifeTimeStats[8].value)
          .addField("勝率", body.lifeTimeStats[9].value)
          .addField("キル数", body.lifeTimeStats[10].value)
          .addField("K/D", body.lifeTimeStats[11].value)
          .addField("マッチ回数", body.lifeTimeStats[7].value);
        message.channel.send(embed);
      });
    }
  }
  if (command === "server") {
    message.channel.send(
      client.guilds
        .find(m => m.name === "𝑌𝐸𝑁𝐵𝑈𝑂𝑈/𝗰𝗵𝗮𝘁")
        .members.map(m => m.user.username)
    );
  }
  if (command === "chat") {
    if (!args[0]) {
      if (!message.member.hasPermission("MANAGE_CHANNELS"))
        return message.channel.send(
          "チャンネル管理の権限を持っていない人はこのコマンドを使用できません"
        );
      if (!chat[message.channel.id]) {
        chat[message.channel.id] = {};
        message.channel.createWebhook("のばまんchat用webhook");
        message.channel.send("登録しました");
      } else {
        delete chat[message.channel.id];
        message.channel.send("登録を解除しました");
        message.channel
          .fetchWebhooks()
          .then(hook =>
            hook.find(hooks => hooks.name === "のばまんchat用webhook").delete()
          );
      }
    } else if (args[0] === "list") {
      /* const array = [];
      for (var item in chat) {
        if (item !== "id" || client.channels.get(item).guild) {
          try {
        await array.push(client.channels.get(item).guild.name);
          } catch (e) {}
      } 
      }
      console.log(array)
      message.channel.send(array.join("\n")); */
      message.channel.send("開発中");
    } else if (args[0] === "id") {
      /* 
         "サーバーの名前" : message.guild.name,
    "サーバーのID" : message.guild.id,
    "チャンネル" : message.channel.id,
    "名前" : message.author.tag,
    "ID" : message.author.id,
    "内容"
    */
      if (!chat["id"][args[1]])
        return message.channel.send("IDを確認できませんでした");
      else {
        message.channel.send(
          `
サーバーの名前 : ${chat["id"][args[1]]["サーバーの名前"]}
サーバーのID : ${chat["id"][args[1]]["サーバーのID"]}
名前 : ${chat["id"][args[1]]["名前"]}
ID : ${chat["id"][args[1]]["ID"]} 
内容 : ${chat["id"][args[1]]["内容"]}
          `
        );
      }
    }
    fs.writeFile("./database/chat.json", JSON.stringify(chat), err => {
      if (err) console.log(err);
    });
  }
  if (command === "eval") {
    if (message.author.id !== "551421671332904960") return;
    try {
      message.channel.send(eval(kekka));
    } catch (e) {
      message.react("❌");
      message.reply(e.message);
      return;
    }
    message.react("✅");
    return;
  }
  if (command === "weather") {
    require("./command/weather.js").run(client, message, kekka);
  }
  if (command === "quiz") {
    require("./command/quiz.js").run(client, message , db);
  }
  if (command === "icon") {
    require("./command/icon.js").run(client, message, args);
  }
  if (command === "news") {
    require("./command/news.js").run(client, message, args);
  }
  if (command === "img") {
    require("./command/img.js").run(client, message, kekka);
  }
  if (command === "sin") {
    if (!args[0] && !message.attachments.size === 0)
      return message.channel.send("画像を指定してください");
    require("./command/sinmetori.js").run(client, message, args ,cooltime);
  }
  if (command === "color") {
    if (!args[0] && !message.attachments.size === 0)
      return message.channel.send("画像を指定してください");
    require("./command/hanntenn.js").run(client, message, args);
  }
  if (command === "emoji") {
    if (!kekka) return message.channel.send("文字を指定してください");
    require("./command/emojicreate.js").run(client, message, kekka);
  }
  if (command === "moji") {
    const text = ":regional_indicator_";
    const hairetu = kekka.trim().split("");
    const array = [];
    for (var i = 0; hairetu.length > i; i++) {
      array.push(`${text}${hairetu[i]}:`);
    }
    message.channel.send(array.join(" "));
  }
  if (command === "vc") {
    if (!args[0]) {
      const chat = require("./database/vc.json");
      if (!message.member.hasPermission("MANAGE_CHANNELS"))
        return message.channel.send(
          "チャンネル管理の権限を持っていない人はこのコマンドを使用できません"
        );
      if (!chat[message.channel.id]) {
        chat[message.channel.id] = {};
        message.channel.send("登録しました");
      } else {
        delete chat[message.channel.id];
        message.channel.send("登録を解除しました");
      }
      fs.writeFile("./database/vc.json", JSON.stringify(chat), err => {
        if (err) console.log(err);
      });
    } else if (args[0] === "left") {
      const vc = message.guild.me.voiceChannel;
      if (!vc) return message.channel.send("VCに入っていません");
      vc.leave();
      message.channel.send("vcから降りました");
    }
  }
  if (command === "omikuji") {
require("./command/omikuji.js").run(client , message, db , args)
  } if(command === "game") {
require("./command/mmo.js").run(client , message , db , args)
  
  } if(command === "totuzenn") {
    require("./command/totuzenn.js").run(client , message , kekka)
  } if(command === "sikaku") {
    require("./command/sikaku.js").run(client , message, kekka)
  } if(command === "delete") {
    if(!args[0] || !message.channel.messages.get(args[0])) return message.channel.send("メッセージIDがわかりませんでした");
    if(message.channel.messages.get(args[0]).author.id !== client.user.id) return message.channel.send(`\`${client.user.username}\`のメッセージだけを削除できます。`)
      message.channel.messages.get(args[0]).delete()
    message.channel.send("削除しました。")
    .then(msg => msg.delete(2500))
  }if(command === "poll") {
    require("./command/poll.js").run(client , message , args)
  } if(command === "imgsin"){
require("./command/imgsin.js").run(client , message , kekka,cooltime)
  } if(command === "bun") {
    const db = require("./database/db.json")
    if(!args[0]) {
    const syugo = db.kotoba.syugo[Math.floor(Math.random() * db.kotoba.syugo.length)]
    const jyutugo = db.kotoba.jyutugo[Math.floor(Math.random() * db.kotoba.jyutugo.length)]
    const syuusyokugo = db.kotoba.syuusyokugo[Math.floor(Math.random() * db.kotoba.syuusyokugo.length)]
    const syuusyokugo2 = db.kotoba.syuusyokugo[Math.floor(Math.random() * db.kotoba.syuusyokugo.length)]
    
    const str = syuusyokugo + syugo + syuusyokugo2 + jyutugo
    message.channel.send(`${str}。`)
  } else if(args[0] === "create") {
    const bun = require("./command/buncreate.js").run(client,message,db)
    } else if(args[0] === "list") {
    const syugo = db.kotoba.syugo
    const jyutugo = db.kotoba.jyutugo
    const syuusyokugo = db.kotoba.syuusyokugo
    const syuusyokugo2 = db.kotoba.syuusyokugo
    
    const str = [ syugo , jyutugo , syuusyokugo]
    message.channel.send(`${str.join("|")}`)
    }
 } else if(command === "youtube") {
   require("./command/youtube.js").run(client , message , kekka)
 } else if(command === "wadai") {
   var wadai = `・出身地
・好きな食べ物
・嫌いな食べ物
・自分の行った最も遠いところ
・面白いトラブルに遭遇した話
・芸人で好きな人の話
・最近読んだ本
・ペットの話
・休みの日の使い方
・学生時代の話
・将来の夢（もし○○だったら、といった話）
・よく見るテレビ番組やよく聴くラジオ番組
・最近起きた（世の中や身近な）出来事の話
・誕生日の話（誕生日にまつわる話など）
・その他好きな○○（食べ物や芸能人など）の話 `.split("・")
   message.channel.send(wadai[Math.floor(Math.random() * wadai.length)])
 }else if(command === "point") {
  if(!message.channel.id === "338667165744103424")  return;
   /*
   db: {
   point : [{
{
id : "monnenamonnena",
point : "-999"
}
   }]
   }
   */
if(!args[0]) {
        const json = require("./database/db.json");
      const array = [];
      function compareFunc(a, b) {
          return b[0] - a[0];
      }
const namearray = [];
      for (var i = 0; i < json.point.length; i++) {
        array.push([json.point[i].point , client.users.get(json.point[i].id).username])
      }
      
      array.sort(compareFunc);
      
      var name = [];
      let embed = new Discord.RichEmbed()
      .setTitle("ポイントランキング")
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
} if(args[0] === "op") {
  if(!args[1] || !message.guild.members.get(args[1])) return message.channel.send("人物のIDを指定してください")
  if(!args[2].startsWith("+") && !args[2].startsWith("-")) return message.channel.send("+か-から始めてください")
  if(args[2].startsWith("+")) {
  db.get("point").find({id : args[1]}).assign({id : args[1] , point : db.get("point").find({id : args[1]}).value().point+ Number(args[2].slice(1))}).write()
  } else {
  db.get("point").find({id : args[1]}).assign({id : args[1] , point : db.get("point").find({id : args[1]}).value().point - Number(args[2].slice(1))}).write()
  }
message.channel.send(`${message.guild.members.get(args[1]).user.username}のポイントは現在${db.get("point").find({id : args[1]}).value().point}です。`)
}　if(args[0] === "user") {
message.channel.send(`${message.guild.members.get(args[1]).user.username}のポイントは現在${db.get("point").find({id : args[1]}).value().point}です。`)
} if(args[0] === "warui") {
        const json = require("./database/db.json");
      const array = [];
      function compareFunc(a, b) {
          return a[0] - b[0];
      }
const namearray = [];
      for (var i = 0; i < json.point.length; i++) {
        array.push([json.point[i].point , client.users.get(json.point[i].id).username])
      }
      
      array.sort(compareFunc);
      
      var name = [];
      let embed = new Discord.RichEmbed()
      .setTitle("ポイントランキング")
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
  } else if(command === "eval") {
    if(message.author.id == "551421671332904960") {
      console.log(kekka)
      try {
        message.channel.send(eval(message.content.slice(6).trim()))
        message.react("✅ ")
      } catch(e) { 
        message.react("❌")
        message.channel.send(e)
      }
    }
  } else if(command === "taiko") {
    require("./command/donder.js").run(client,message , kekka)
  } else if (command === "mc") {
    if(!args[0]) return message.channel.send("情報が足りません");
    require("./command/minecraft.js").run(client,message,args)
  } else if(command === "mcserver") {
    if(!args[0]) return message.channel.send("情報が足りません");
    require("./command/minecraft.js").server(client,message,args)
  } else if(command === "hosii") {
    client.users.get(process.env.ownerID).send(kekka)
    message.channel.send("送りました")
  } else if (command === "today") {
   const rp = require('request-promise');
const cheerio = require('cheerio');
    const response = await rp({
      "uri":"https://ja.wikipedia.org/wiki/Wikipedia:%E4%BB%8A%E6%97%A5%E3%81%AF%E4%BD%95%E3%81%AE%E6%97%A5",
      gzip: true,
      encoding:null
    });
    let $ = cheerio.load(response);
    console.log("yeah")
    // 取得したいデータのタグを指定する
    let title = $('ul' , '.mw-parser-output').text();
  
    console.log(title)
    let embed = new Discord.RichEmbed()
    .setTitle(`今日は何の日？`)
    .setDescription(title.split("\n").slice(1 , -1).join("\n・"))
message.channel.send(embed)
  } else if(command === "haikei") {
    const request = require('request');
      if(!args[0] || message.attachments.first()) {
    var imageUrl = message.attachments.first().url;
  } else if(args[0]){
    var imageUrl = args[0]
  } else {
    return message.channel.send("画像を確認できませんでした")
  }
    message.delete()
request.post({
  url: 'https://api.remove.bg/v1.0/removebg',
  formData: {
    image_url: imageUrl,
    size: 'auto',
  },
  headers: {
    'X-Api-Key': process.env.removeapikey
  },
  encoding: null
}, (error, response, body)=> {
  if(error) return message.channel.send('Request failed:', error);
  if(response.statusCode != 200) return message.channel.send('Error:' + response.statusCode + body.toString('utf8'));
  message.channel.send(new Discord.Attachment(body))
});
  } else if(command === "aki") {
    const {
    startAki,
    endGame,
    checkTime,
    oldCollects,
    text
} = require("./command/function.js")
const msg = message
            if (args[0] == 'start') {
const msg = message
            if (coolDownList.has(msg.author.id)) return;
            else {
                coolDownList.add(msg.author.id);
                if (oldCollects[msg.author.id]) {
                    msg.reply(text.openGame);
                    return coolDownList.delete(msg.author.id);
                } 

                if (!msg.channel.memberPermissions(msg.guild.me).has(['ADD_REACTIONS', 'SEND_MESSAGES' , 'MANAGE_MESSAGES'])) {
                    coolDownList.delete(msg.author.id);
                    try {
                        msg.channel.send(text.noPerm);
                        msg.author.send(text.noPerm)
                    } catch (err) {
                        //lol
                    };
                    return;
                }


                var akiMsg = await msg.channel.send(text.wait)
                startAki(msg, akiMsg);

                setTimeout(() => {
                    coolDownList.delete(msg.author.id);
                }, 5000);
            }

        } else if (args[0] == 'stop') {
            if (!oldCollects[msg.author.id]) return msg.reply(text.noGame);
            endGame(msg.author.id, oldCollects[msg.author.id].akiMsg)
        }

  }
});

client.login(process.env.token);

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000);
