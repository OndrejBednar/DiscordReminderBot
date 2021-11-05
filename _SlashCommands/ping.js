module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(interaction, options) {
        interaction.reply({
            content: 'pong',
            ephemeral: true,
        })
    },
};
