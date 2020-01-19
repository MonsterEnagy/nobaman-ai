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
const db = low(adapter);
db.defaults({
  omikuji: [],
  mmo : []
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
  const filter = 　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　["ちんちん","うんこ" ,"うんち" , "う/ん/ち" , "う　んち" , "う　ん　ち" , "う　んち", "う/んち" , "うん/ち" , "セックス" , "エロ" , "AV" , "av","工口" , "せっくす" , "せっく　す"]
  
  for(var i = 0; filter.length > i; i++) {
    if(message.content.includes(filter[i])) {
      return message.channel.send("禁止ワードを言わないでください")
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
      if (response.statusCode !== 200 || err) throw new Error();
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
        }  else message.channel.send(body.text);
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
    .then(
      client.users
        .get("551421671332904960")
        .send(`${guild.name}に入ったよ！ ${guild.members.size}人`)
    )
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
  console.log(
    `${message.guild.name}:${message.channel.name}:${message.author.username}:${message.content}`
  );
  if (know.length != 0 || unknow.length != 0) {
    // console.log("通ってる" + `${know},${unknow}`);
    if (unknow[0] === message.channel.id) {
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
    } else if (know[0] === message.channel.id && know[2] === "flag") {
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
    } else if (know[0] === message.channel.id && message.content === "違うよ") {
      //console.log("知ってる分岐点" + `${know},${unknow}`);
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
    if (!args[0]) {
      let embed = new Discord.RichEmbed()
        .setTitle("nobaman aiにできること")
        .addField(
          "知識の蓄え",
          "`のばまん、〇〇って知ってる？`と聞くと、〇〇の部分に当たるところの情報をnobaman aiに保存させることができます"
        )
        .addField("やることリスト(todo)", "``!n help todo`って言ってみ？")
        .addField("メモ", "`!n help memo` って言ってみ？")
        .addField(
          "知識の引き出し",
          "``〇〇って何？`と言うと博識のばまんが教えてくれます"
        )
        .addField("ユーザー情報", "!n yと書くと自分の情報が見られます。")
        .addField("Fortnite", "`!n help fortnite`って言ってみ？")
        .addField(
          "のばまんチャット",
          "`!n chat`と言うとのばまんチャットに登録/解除できて、違うチャンネルの間で会話ができるようになるよ"
        )
        .addField("クイズ", "!n quiz`と言うとクイズができます。")
        .addField("天気", "`!n weather (場所)`で天気を確認できます。")
        .addField("ニュース", "`!n news`ニュースが見れます")
        .addField("画像検索", "`!n img (キーワード)`で画像を検索できます。")
        .addField(
          "シンメトリー",
          "`!n sin (画像のurlまたは画像ファイルの添付)`でシンメトリーにできます "
        )
        .addField(
          "色反転",
          "`!n color (画像のurlまたは画像ファイルの添付)`で色を反転させることが出来ます"
        )
      .addField("おみくじ" , "`!n omikuji`でおみくじを一日一回のみ引くことが出来ます\nまた、`!n omikuji ranking`でランキングを見ることが出来ます")
      .addField("ゲーム" , "`!n game`でゲームのhelpが見れます")
      .addField("誤爆用コマンド" , "imgなどで誤爆してしまった時は`!n delete (メッセージID)`でメッセージを消せます。このBOTのメッセージ限定です。")
        .setColor("#b9c42f");
      message.channel.send(embed);
    } else if (args[0] === "fortnite") {
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
    }
  }
  if (command === "todo") {
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
  if (command === "y") {
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
  }
});

client.login(process.env.token);

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000);
