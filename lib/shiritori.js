/* しりとり用チャンネルにメッセージが送信されたときの処理 A ~ F */
module.exports = async function shiritori(message) {
  const [judg, reading, previousData] = await judgMessage(message);
  switch (judg) {
    /* OK */
    case 'A':
      addMessage(message, reading);
      sendMessage(message, `:o:｢ **${message.content}** ｣ はOKです\n次は ｢ **${reading.slice(-1)}** ｣ から始まる単語です`);
      break;
    /* NG 文章 */
    case 'B':
      sendMessage(message, `:x:｢ **${message.content}** ｣ は文章のためNGです\n単語で答えてください${toggleFirstMessage(previousData)}`);
      break;
    /* NG 名詞以外 */
    case 'C':
      sendMessage(message, `:x:｢ **${message.content}** ｣ は名詞以外のためNGです\n名詞を答えてください${toggleFirstMessage(previousData)}`);
      break;
    /* NG 'ン'で終わる */
    case 'D':
      sendMessage(message, `:x:｢ **${message.content}** ｣ は'ン'で終っているためNGです\n'ン'以外で終わる単語を答えてください${toggleFirstMessage(previousData)}`);
      break;
    /* NG 直前の単語とつながっていない */
    case 'E':
      sendMessage(message, `:x:｢ **${message.content}** ｣ は直前の単語とつながっていないためNGです\n ｢ **${previousData.message}** ｣ の ｢ **${previousData.reading.slice(-1)}** ｣ から始まる単語を答えてください${toggleFirstMessage(previousData)}`);
      break;
    /* NG 既出 */
    case 'F':
      sendMessage(message, `:x:｢ **${message.content}** ｣ は既に答えられているためNGです\nまだ答えられていない単語を答えてください${toggleFirstMessage(previousData)}`);
      break;
  }
}