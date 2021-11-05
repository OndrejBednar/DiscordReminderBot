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


client.ChatCommands = new Discord.Collection();
client.SlashCommands;
const botChatCommands = require('./_ChatCommands');
const botSlashCommands = require('./_SlashCommands')
let commands;

Object.keys(botChatCommands).map(key => {
    client.ChatCommands.set(botChatCommands[key].name, botChatCommands[key]);
    console.log(key);
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Servers: ")
    console.log(client.guilds);
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name + " #" + guild.id)
        commands = guild.commands;


        Object.keys(botChatCommands).map(key => {
            commands.create({
                name: botChatCommands[key].name,
                description: botChatCommands[key].description,
                options: botChatCommands[key].options
            });
        });
        
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
    if (!client.ChatCommands.has(command)) return;

    
    console.info(`Called command: ${command}`);
    console.log(msg);
    console.log(args);


    try {
        client.ChatCommands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }

});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) {
        return;
    }

    const {commandName, options} = interaction;

    if(commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true,
        })
    } else if (commandName === 'sub') {
        global.subscribedChannels.push(options.getChannel('channel').id);
        console.log(global.subscribedChannels);
        interaction.reply({
            content: `succesfully subscribed to channel ${options.getChannel('channel').name}`
        })
    }
    
    console.log(`interaction: ${interaction}`);
    console.log(`commandName: ${commandName}`);
})




//make sure this line is the last line
client.login(process.env.TOKEN); //login bot using token