module.exports.run = (client , message, db , args) => {
  message.delete();
  const option = {
    username: `${message.member.displayName} `,
    avatarURL: message.author.avatarURL
  };
  const json = db.get("sho").find({id : message.author.id})
  if(!json.value()[args[0]]){
    message.channel.send("存在しません")
    .then(msg => msg.delete(5000))
  } else {
    
  }
}