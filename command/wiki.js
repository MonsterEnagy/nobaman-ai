  module.exports.run = (client, message,kekka) => {
const wiki = require('wikijs').default({
    apiUrl : 'http://ja.wikipedia.org/w/api.php'
  });
  (async() => {
    const page = await wiki.page(kekka);
    const content = await page.summary();
    message.channel.send("\`\`\`" +content + "\`\`\`")
  })()
  .catch(error => message.channel.send('私は知らない'))
  }