const Discord = require("discord.js"); //import discord.js

module.exports = {
    name: 'sub',
    description: 'sub to channel',
    options: [{
        name: 'channel',
        description: 'which channel u want to subscribe to',
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL
    }],
    execute(msg, args) {
        msg.reply('channel subscribed!');
        global.subscribedChannels.push(args[0].split(/#|>/)[1]);
        console.log(global.subscribedChannels);
    },
};
