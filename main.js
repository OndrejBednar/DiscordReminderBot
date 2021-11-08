require('dotenv').config({ path: "./token.env" }); //initialize dotenv
const Discord = require("discord.js"); //import discord.js


global.subscribedChannels = [];
global.reminderChannel;
global.reminders = [];
const client = new Discord.Client({
    intents:
        [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        ]
});


client.ChatCommands = new Discord.Collection();
client.SlashCommands = new Discord.Collection();
const botChatCommands = require('./_ChatCommands');
const botSlashCommands = require('./_SlashCommands')
let commands;

Object.keys(botChatCommands).map(key => {
    client.ChatCommands.set(botChatCommands[key].name, botChatCommands[key]);
});

Object.keys(botSlashCommands).map(key => {
    client.SlashCommands.set(botSlashCommands[key].name, botSlashCommands[key]);
});



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Servers: ")
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name + " #" + guild.id)
        commands = guild.commands;

        Object.keys(botSlashCommands).map(key => {
            commands.create({
                name: botSlashCommands[key].name,
                description: botSlashCommands[key].description,
                options: botSlashCommands[key].options
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
    let promise1 = new Promise((resolve) => {
        setInterval(() => checkDates(), 1000);
    });
})

client.on('messageCreate', msg => {
    //to check if we talk with the bot in specified channel
    if (global.subscribedChannels.indexOf(msg.channelId) == -1) return;
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    
    
    if (!client.ChatCommands.has(command)) return;
    console.info(`Called command: ${command}`);
    console.log(args);
    console.log(msg);


    try {
        client.ChatCommands.get(command).execute(msg, args);
    }
    catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }

});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;
    try {
        client.SlashCommands.get(commandName).execute(interaction, options);
        console.log(interaction.user);
    }
    catch (error) {
        console.error(error);
        interaction.reply('there was an error trying to execute that command!');
    }
    console.log(`interaction: ${interaction}`);
    console.log(`commandName: ${commandName}`);
})

async function checkDates() {
    let today = new Date();
    global.reminders.forEach(reminder => {
        if (today.getMonth() == reminder.date.getMonth() &&
            today.getDate() == reminder.date.getDate() &&
            today.getHours() == reminder.date.getHours() &&
            today.getMinutes() == reminder.date.getMinutes()) 
        {
            console.log(reminder);
            if (reminder.group != null) {
                client.guilds.cache.find(g => g.id == '667343859197411340').channels.cache.find(channel => channel.id == reminderChannel).send(`<@!${reminder.owner}> has set reminder for <@&${reminder.group}> group, its time for **${reminder.name}**`);
            }
            else{
                client.guilds.cache.find(g => g.id == '667343859197411340').channels.cache.find(channel => channel.id == reminderChannel).send(`<@!${reminder.owner}> its time for **${reminder.name}**`);
            }
            let index = global.reminders.indexOf(reminder);
            global.reminders.splice(index, 1);
        }
    })
}


//make sure this line is the last line
client.login(process.env.TOKEN); //login bot using token