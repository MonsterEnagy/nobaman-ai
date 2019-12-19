const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const tisiki = require("./nobaman.json");

var unknow = []; //知らないフラグ
var know = []; //知ってるフラグ


function tisikilength(message) {
  if (Object.keys(tisiki).length % 2 == 0) {
    message.channel.send(
      "のばまんくんの知識が" + Object.keys(tisiki).length + "を超えたよ！"
    );
  }
}

  function formatDate(date) {
   const y = date.getFullYear()
   const m = date.getMonth() + 1
   const d = date.getDate();
   const h = date.getHours()
   const min = date.getMinutes();
   const sec = date.getSeconds();
   const day = '日月火水木金土'.charAt(date.getDay());
   return `${y}年${m}月${d}日${h}時${min}分${sec}秒 (${day})`;
  }

client.on("ready", () => {
  client.user.setActivity('!n help', { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
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
    if(!args[0]) {
    let embed = new Discord.RichEmbed()
    .setTitle("nobaman aiにできること")
    .addField("知識の蓄え" , "`のばまん、〇〇って知ってる？`と聞くと、〇〇の部分に当たるところの情報をnobaman aiに保存させることができます")
    .addField("やることリスト(todo)" , "``!n help todo`って言ってみ？")
    .addField("メモ" , "`!n help memo` って言ってみ？")
    .addField("wiki" , "!n wiki (調べたいもの)`と打つと、のばまんが直接wikiまで言って内容を教えてくれます")
    .addField("ユーザー情報" , "!n yと書くと自分の情報が見られます。")
    .setColor("#b9c42f")
    message.channel.send(embed)
    } else if(args[0] === "todo") {
    let embed = new Discord.RichEmbed()
    .setTitle("Todo(やることリスト)機能説明！")
    .addField("!n todo" , "Todoの作成/Todoの表示ができるコマンド")
    .addField("!n todo create", "Todoの追加ができるコマンド")
    .addField("!n todo delete" , "Todoの初期化ができるコマンド。")
    .addField("!n todo clear (消したいTodoの番号)" , "Todoをクリアできるコマンド")
    message.channel.send(embed)
    } else if(args[0] === "memo") {
    let embed = new Discord.RichEmbed()
    .setTitle("New! メモ機能説明！")
    .addField("!n memo" , "メモ一覧の表示ができるコマンド")
    .addField("!n memo create (名前) (内容)", "メモの作成ができるコマンド")
    .addField("!n memo delete (消したいメモの名前)" , "メモの削除ができるコマンド。")
    .addField("!n memo (見たいメモの名前)" , "メモの閲覧ができるコマンド")
    message.channel.send(embed)
    }
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
      const todoList = [];
      for(var i = 0; i < todo[message.author.id].todo.length; i++){
        todoList.push((i + 1) + "." +todo[message.author.id].todo[i]);
      }
      let embed = new Discord.RichEmbed()
      .setTitle("やることリスト")
      .setDescription(`${todoList.join("\n")}`)
      message.channel.send(embed)
    }
    } else if(!todo[message.author.id]) {
      const m = await message.channel.send("todoがありません。作成しています...");
      todo[message.author.id] = {
        todo : []
      }
      m.edit("todoを作成しました。")
    } else if(args[0] === "create") {
     const m = await message.channel.send(`${kekka.slice(7).trim()}をtodoに追加します・・・・`);
      todo[message.author.id].todo.push(kekka.slice(7).trim());
      m.edit(`${kekka.slice(7).trim()}をtodoに追加しました。`);
    } else if(args[0] === "delete") {
      const m = await message.channel.send("todoを初期化しています・・・");
      delete todo[message.author.id]
      m.edit("todoを初期化しました。");
    } else if(args[0] === "clear") {
      if(!args[1]) return message.channel.send("消すTodoの番号がわかりません\n例(1番を消す場合) ``!n todo clear 1`")
      const m = await message.channel.send(`${args[1]}をクリアします。`)
      todo[message.author.id].todo.splice((args[1] - 1) , 1);
      m.edit(`${args[1]}をクリアしました。`)
    }
    
  fs.writeFile("./database/todo.json", JSON.stringify(todo), err => {
    if (err) console.log(err);
  });
  } if(command === "memo") {
      /*json構造
    id : {
    memo名前 : "memo内容"
    }   
    */
    const todo = require("./database/memo.json");
    console.log(todo[message.author.id])
    if(!args[0]) {
      const array = [];
      for (var item in todo[message.author.id]) {
      array.push(item)
      }
      if(array.length === 0) return message.channel.send("メモが一つもありません")
      message.channel.send("メモ一覧" + `\n\`\`\`${array}\`\`\``)
    } else if(args[0] === "create") {
      if(!todo[message.author.id]) {
        todo[message.author.id] = {
          
        }
      }
      if(!args[2]) return message.channel.send("情報が足りません。 \n`明日やること`という名前のメモに`明日は何もしない`と書く場合の例\n!n memo create 明日やること 明日は何もしない")
     const m = await message.channel.send(`\`${kekka.slice(7 + args[1].length + 1).trim()}\`を\`${args[1]}\`にメモしました`);
      todo[message.author.id][args[1]] = kekka.slice(7 + args[1].length + 1).trim()
      m.edit(`${args[1]}を作りました。`);
    } else if(args[0] === "delete") {
      const m = await message.channel.send("memoを消しています・・・");
      delete todo[message.author.id][args[1]]
      m.edit(`${args[1]}を消しました`);
    } else {
      message.channel.send(`\`\`\`${todo[message.author.id][args[0]]}\`\`\``)
    }
  fs.writeFile("./database/memo.json", JSON.stringify(todo), err => {
    if (err) console.log(err);
  });
  } if (command === "wiki") {
    require("./command/wiki.js").run(client,message,kekka)
  } if (command === "y") {
        const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  let bot;
  if (member.user.bot === true) {
    bot = "はい";
  } else {
    bot = "いいえ";
  }
  const avatar = message.mentions.users.first() || message.author;
  const embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setAuthor(`${member.user.tag} (${member.id})`)
    .setThumbnail(avatar.avatarURL)
    .addField("ニックネーム:", `${member.nickname !== null ? `${member.nickname}` : "ニックネームなし"}`, true)
    .addField("Botですか？", `${bot}`, true)
    .addField("プレイング", `${member.user.presence.game ? `${member.user.presence.game.name}` : "プレイしていない"}`, true)
    .addField("役職", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "無職"}`, true)
    .addField("この鯖に入った時の時間",formatDate(member.user.createdAt), true)
    .addField("アカウント作った時の時間",formatDate(member.joinedAt), true)
    .addField("ステータス",member.presence.status, true)
    .addField("最後のメッセージ" , member.lastMessage || member.user.lastMessage)
      message.channel.send(embed);
      return;
  } if (command === "test") {
    const request = require("request");
   const key = "9697ac23-063a-47ba-8c79-d327222116f9";
    const options = {
      url:"https://api.fortnitetracker.com/v1/store" ,
      method:"get",
      json:true,
      headers : {'TRN-Api-Key' : key}
    }
    request(options, (error, response, body)  => { 
      for(var i = 0; i < body.length; i++) {
        let embed = new Discord.RichEmbed()
        .setImage(body[i].imageUrl)
        .setTitle(body[i].name)
        .setDescription(`値段:${body[i].vBucks}VBucks`)
        message.channel.send(embed)
        }
    })
  }
});

client.login(process.env.token);

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000);
