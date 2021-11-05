const Discord = require("discord.js"); //import discord.js

module.exports = {
    name: 'reminder',
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
        }
    ],
    execute(interaction, options) {
        let today = new Date();
        let date;
        let numbers = [
            options.getNumber('hour'),
            options.getNumber('minute'),
            options.getNumber('day'),
            options.getNumber('month'),
            options.getNumber('year')
        ];
        
        console.log(numbers);

        if(numbers[4] == null || numbers[3] == null) {
            date = new Date();
            date.setHours(numbers[0]);
            if (numbers[1] != null) {
                date.setMinutes(numbers[1]);
            }
            else { date.setMinutes(0)}
            if (numbers[2] != null) {
                date.setDate(numbers[2]);
            }

            global.reminders.push({
                name: options.getString('description'),
                owner: interaction.user.id,
                date: date
            });

            interaction.reply({
                content: `Your reminder was successfuly set for ${date.getDay() + "." + date.getMonth() + " " + date.getHours() + ":" + date.getMinutes()}`,
                ephemeral: true,
            })
            console.log(global.reminders);
            console.log(date.getHours());
            console.log(date.getDay());
        }
        else {
            interaction.reply({
                content: 'Something went wrong',
                ephemeral: true,
            })
        }
    },
}