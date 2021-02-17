const discord = require('discord.js')
require('dotenv').config()
const server = new discord.Client();

server.once('ready', () => {
   console.log('ready');
})

server.login(process.env.TOKEN)

server.on('message', (message) => {
   let split = message.split(' ')
   console.log(split)
   if (message.content === 'goo goo') {
      message.channel.send('gaa gaa')
   }
});


const data = [1, 2, 3]

const updatedData = data.filter((item) => {
 return item === 3
})

const newData = [2]

console.log(updatedData)