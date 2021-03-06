const Discord = require('discord.js');
const client = new Discord.Client();
const { version, prefix } = require('./config.json');
const {token} = require('./token.json');
const os = require('os');

client.login(token);
client.once('ready', () => {
  console.log(`Vilken v${version} has logged in successfully.`);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const arguments = message.content.slice(prefix.length).split(/ +/);
  const command = arguments.shift().toLowerCase();

  switch (command) {
    case 'ping':
      message.reply(`:ping_pong: Ping! That took ${Math.round(client.ping)} ms.)`);
      break;

    case 'about':
      var aboutEmbed = new Discord.RichEmbed()
        .setDescription(`Information about Vilken`)
        .addField('Thanks','Thanks to Alkaline Thunder for being my inspiration when all hope seems lost. You\'re great! <3')
        .addField('Version:', version)
        .addField('Free Memory:', `${Math.round((os.freemem) / 1024 / 1024 / 1024, 2)} GB`)
        .addField('Total Memory:', `${Math.round((os.totalmem) / 1024 / 1024 / 1024, 2)} GB`)
        .addField('OS:', `${os.platform} ${os.release}`,)
      message.channel.send(aboutEmbed);
      break;
    
    default:
      message.reply("That's not a command!")
      break;
  }
})
