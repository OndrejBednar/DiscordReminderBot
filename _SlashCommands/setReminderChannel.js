const Discord = require("discord.js");

module.exports = {
    name: "reminder_channel",
    description: 'sets the channel where the reminders will be sent',
    options: [
        {
            name: 'channel',
            description: 'where the reminders will be sent',
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL
        }
    ],
    execute(interaction, options) {
        try 
        {
            global.reminderChannel = options.getChannel('channel').id;
        } 
        catch (error) 
        {
            interaction.reply({
                content: 'There was an error while setting reminder channel',
                ephemeral: true,
            })
        }
        interaction.reply({
            content: `channel ${options.getChannel('channel').name} was succesfuly set as reminder channel`,
            ephemeral: true,
        })
    },
}