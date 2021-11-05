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
    execute(interaction, options) {
        let channel = options.getChannel('channel');
        if (global.subscribedChannels.indexOf(options.getChannel('channel').id) != -1) {
            interaction.reply({
                content: `channel ${channel.name} is already subscribed !`
            })
            return;
        }
        global.subscribedChannels.push(options.getChannel('channel').id);
        interaction.reply({
            content: `succesfully subscribed to channel ${options.getChannel('channel').name} !`
        });
        console.log(global.subscribedChannels);
    },
};
