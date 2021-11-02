require('dotenv').config({ path: "./token.env" }); //initialize dotenv
const Discord = require("discord.js"); //import discord.js


global.subscribedChannels = []
const client = new Discord.Client({
    intents:
        [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        ]
});


client.commands = new Discord.Collection();
const botCommands = require('./Commands');


Object.keys(botCommands).map(key => {
    client.commands.set(botCommands[key].name, botCommands[key]);
    console.log(key);
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Servers: ")
    console.log(client.guilds);
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name + " #" + guild.id)

        
        subscribedChannels.push(guild.channels.cache.find(channel => channel.isText()).id);
        subscribedChannels.push("669087656705261578");
        console.log(global.subscribedChannels);
        // List all channels
        guild.channels.cache.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
})

client.on('messageCreate', msg => {
    //to check if we talk with the bot in specified channel
    if (global.subscribedChannels.indexOf(msg.channelId) == -1) return;

    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);
    console.log(msg);
    console.log(args);

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }

});




//make sure this line is the last line
client.login(process.env.TOKEN); //login bot using token