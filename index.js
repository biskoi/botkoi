const discord = require('discord.js')
require('dotenv').config()
const server = new discord.Client();

server.once('ready', () => {
   console.log('ready');
})

server.login(process.env.TOKEN)

server.on('message', (message) => {
   // let split = message.split(' ')
   console.log('STARTSTARTSTARTSTARTSTARTSTARTSTARTSTARTSTARTSTARTSTART', message)
   
   switch (message.content) {
      case '!bonk':
         message.channel.send('https://media1.tenor.com/images/6493bee2be7ae168a5ef7a68cf751868/tenor.gif?itemid=17298755')
         break
      
      case '!jail':
         message.channel.send('https://i.imgur.com/D33g4eu.png')
         break

      case '!jailbreak':
         message.channel.send('https://i.imgur.com/KTO0vh4.png')
         break
   
      case 'goo goo':
         message.channel.send('gaa gaa')
         break

      case 'pee pee':
         message.channel.send('poo poo')
         break

      case '!googas':
         message.channel.send('https://www.youtube.com/watch?v=ohNlHTJl03o')
         break

      default:
         break;
   }
});


const data = [1, 2, 3]

const updatedData = data.filter((item) => {
 return item === 3
})

const newData = [2]

console.log(updatedData)