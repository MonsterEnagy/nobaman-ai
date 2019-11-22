const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const kuromoji = require("kuromoji");

const tisiki = require('./nobaman.json');

var unknow = []; //知らないフラグ
var know = []; //知ってるフラグ

var builder = kuromoji.builder({
  	// ここで辞書があるパスを指定します。今回は kuromoji.js 標準の辞書があるディレクトリを指定
  	dicPath: '../node_modules/kuromoji/dict'
});


client.on('ready', () => {
  console.log('I\'m ready!');
});

client.on('message', async message => {
	if(message.author.bot || !message.guild) return;
	console.log(`${know}\n${unknow}`)


	if(know.length != 0 || unknow.length != 0){
		console.log("通ってる" + `${know},${unknow}`)
		if(unknow[0] === message.channel.id) {
			console.log("知らない分岐点" + `${know},${unknow}`)
			message.channel.send(`
			へぇ~！\n\`\`\`${message.content}\`\`\`\nって意味なんだ！のばまん覚えるよ！\n\
			\`チュートリアル:のばまんは${unknow[1]}を覚えました。\`
			`)

			tisiki[unknow[1]] = {
				imi   :message.content,
				hito  :message.author.tag,
				server:message.guild.name
			}

		unknow = []; //知らないフラグ
		know = []; //知ってるフラグ

		} else if(know[0] === message.channel.id  && know[2] === "flag") {
			console.log("知ってる分岐点2" + `${know},${unknow}`)
			message.channel.send(`
			へぇ~！\n\`\`\`${message.content}\`\`\`\nって意味なんだ！のばまん覚えるよ！\n\
			\`チュートリアル:のばまんは${unknow[1]}を覚えました。\`
			`)

			tisiki[unknow[1]] = {
				imi   :message.content,
				hito  :message.author.tag,
				server:message.guild.name
			}

		unknow = []; //知らないフラグ
		know = []; //知ってるフラグ

		} else if(know[0] === message.channel.id) {
			console.log("知ってる分岐点" + `${know},${unknow}`)
			message.channel.send("ええええ、違ったの！？じゃあ、間違ってない知識を教えてくれませんか・・・(懇願)\n `チュートリアル:この後に意味を書くとのばまんが覚えてくれます。`");
			unknow = []; //知らないフラグ
			know = [message.channel.id , know[1]　, "flag"]; //知ってるフラグ
		}
	}

	if (message.content.indexOf("知ってる？")　!= "-1" && message.content.indexOf("のばまん") != "-1") {

	// 形態素解析機を作るメソッド
	builder.build(function(err, tokenizer) {
  		// 辞書がなかったりするとここでエラーになります(´・ω・｀)
 	 	if(err) { throw err; }

 	 // tokenizer.tokenize に文字列を渡すと、その文を形態素解析してくれます。
 		var tokens = tokenizer.tokenize(message.content.slice(3,-5));
		
		var tango = [];
		for(var i = 0; tokens.length > i; i++) {
			if(tokens[i].pos === "名詞") {
				tango.push(tokens[i].surface_form)
				break;
			}
		}
    	//第一段階 形態素解析をして１番目の名詞を見つける
    	if(tango.length === 0) return message.channel.send("`チュートリアル:文章の中の名詞が見つかりませんでした。`");
    	console.log(tango)
    	if(!tisiki[tango]) {
	    	message.channel.send(`\`${tango}\`ってなんですか？教えてくれえぇぇぇ！(魂の解放)\n\`チュートリアル:この後に意味を書くとのばまんが覚えてくれます。\``)
    		
    		unknow = [message.channel.id , tango , message.author.tag]

    	} else {
    		message.channel.send(`それなら知ってるよ!\`${tisiki[tango].server}\`の\`${tisiki[tango].hito}\`さんが教えてくれたんだ！\n\`\`\`${tisiki[tango].imi}\`\`\`\nだよね!\n違ったら\`違うよ\`って言ってな`)
    		know = [message.channel.id , tango];

    	}
    	});
	}

    fs.writeFile("./nobaman.json", JSON.stringify(tisiki), (err) => {
    	if(err) console.log(err)
  	});

});


client.login(process.env.token); 