module.exports.run = (client,message,args) => {
  const option = {
    "url" : `https://api.mojang.com/users/profiles/minecraft/${args[0]}`,
    "method" : "get",
    json:true
  }
  const request = require("request")
  request(option , (error , response , body) => {
    if(response)
      if()
    console.log(body)
  })
}