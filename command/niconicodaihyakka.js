const rp = require('request-promise');
const cheerio = require('cheerio');
module.exports.run = async (client,message,kekka)=> {
const url = "www.wikihouse.com/taiko/index.php?cmd=read&page=%C6%F1%B0%D7%C5%D9%C9%BD%2F%A4%AA%A4%CB%2F%A5%BF%A5%A4%A5%B3%A5%ED%A1%BC%A5%EB&word=%A5%BF%A5%A4%A5%B3%A5%ED%A1%BC%A5%EB"
(async () => {
    // httpリクエストを投げる
    const response = await requestPromise(
      uri: url,
      gzip: true
    });
    let $ = cheerio.load(response);

    // 取得したいデータのタグを指定する
    let title = $('.a-section .a-size-medium.a-color-base.a-text-normal').text();
    console.log(title);

    return title;
  };
})();


}