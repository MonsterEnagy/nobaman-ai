const Discord = require("Discord.js")
module.exports.run = (client, message, args) => {
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