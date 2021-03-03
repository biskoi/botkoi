const discord = require('discord.js')
require('dotenv').config()
const ytdl = require("ytdl-core");
const server = new discord.Client();

server.once('ready', () => {
   console.log('ready');
})

server.login(process.env.TOKEN)

let queue = new Map()

server.on('message', async (message) => {
   // let split = message.split(' ')
   if (message.author.bot || !message.content.startsWith('!')) {
      console.log('not for bot')
      return
   }

   // console.log('STARTSTARTSTARTSTARTSTARTSTARTSTARTSTARTSTARTSTARTSTART', message)
   console.log
   
   switch (message.content.split(' ')[0]) {
      case '!skip':
         skip(message, queue.get(message.guild.id))
         break;

      case '!pause':
         stop(message, queue.get(message.guild.id))
         break;

      case '!play':
         joinVoip(message, queue.get(message.guild.id))
         break;

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

async function joinVoip(message, serverQueue) {
   const args = message.content.split(" ");
   if (message.member.voice.channel) {
      const songInfo = await ytdl.getInfo(args[1]);
      const song = {
         title: songInfo.videoDetails.title,
         url: songInfo.videoDetails.video_url,
      };
      const voiceChannel = message.member.voice.channel;

      if (!serverQueue) {
         const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 4,
            playing: true
         };
      
         queue.set(message.guild.id, queueContruct);
         queueContruct.songs.push(song);

         
         try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
         } 
         catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
         }
      } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} added`);
      };

   };
};

function skip(message, serverQueue) {
   if (!message.member.voice.channel)
     return message.channel.send(
       "NO"
     );
   if (!serverQueue)
     return message.channel.send("no");
   serverQueue.connection.dispatcher.end();
 }
 
 function stop(message, serverQueue) {
   if (!message.member.voice.channel)
     return message.channel.send(
       "NO"
     );
     
   if (!serverQueue)
     return message.channel.send("NOOO");
     
   serverQueue.songs = [];
   serverQueue.connection.dispatcher.end();
 }
 
 function play(guild, song) {
   const serverQueue = queue.get(guild.id);
   if (!song) {
     serverQueue.voiceChannel.leave();
     queue.delete(guild.id);
     return;
   }
 
   const dispatcher = serverQueue.connection
     .play(ytdl(song.url))
     .on("finish", () => {
       serverQueue.songs.shift();
       play(guild, serverQueue.songs[0]);
     })
     .on("error", error => console.error(error));
   dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
   // serverQueue.textChannel.send(`Start playing: **${song.title}**`);
 }