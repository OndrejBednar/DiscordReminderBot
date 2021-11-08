const Discord = require("discord.js"); //import discord.js

module.exports = {
    name: "reminder",
    description: 'sets a reminder',
    options: [
        {
            name: "description",
            description: "what is this reminder for",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: "hour",
            description: "sets the hour",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "minute",
            description: "sets minutes",
            type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "day",
            description: "sets the day",
            type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "month",
            description: "sets the month",
            type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "year",
            description: "sets the year",
            type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "role",
            description: "role which u want to tag",
            type: Discord.Constants.ApplicationCommandOptionTypes.ROLE
        }
    ],
    execute(interaction, options) {
        let date;
        let data = [
            options.getNumber('hour'),
            options.getNumber('minute'),
            options.getNumber('day'),
            options.getNumber('month'),
            options.getNumber('year'),
            options.getRole('role')
        ];

        try {
            date = new Date();
            if (data[4] != null) {
                date.setUTCFullYear(data[4])
            }
            if (data[3] != null) {
                date.setUTCMonth(data[3] - 1)
            }
            date.setHours(data[0]);
            if (data[1] != null) {
                date.setMinutes(data[1]);
            }
            else { date.setMinutes(0) }
            if (data[2] != null) {
                date.setDate(data[2]);
            }

            if (date <= new Date()) {
                interaction.reply({
                    content: `You can't set a reminder for the past`,
                    ephemeral: true,
                })
                return;
            }

            if (data[5] != null) {
                global.reminders.push({
                    name: options.getString('description'),
                    owner: interaction.user.id,
                    date: date,
                    group: data[5].id
                });    
            }
            else {
                global.reminders.push({
                    name: options.getString('description'),
                    owner: interaction.user.id,
                    date: date
                });
            }

            console.log(global.reminders);
            console.log(`${interaction.user.username} has set a new reminder for ${new Intl.DateTimeFormat('cs', { dateStyle: 'full', timeStyle: 'short' }).format(date)}`);
            interaction.reply({
                content: `Your reminder was successfuly set for ${new Intl.DateTimeFormat('cs', { dateStyle: 'full', timeStyle: 'short' }).format(date)}`,
                ephemeral: true,
            })


        } catch (error) {
            interaction.reply({
                content: 'Something went wrong with setting your reminder' +
                `error: ${error}`,
                ephemeral: true,

            })
        }
    },
}