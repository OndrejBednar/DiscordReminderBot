module.exports = {
    name: 'sub',
    description: 'sub to channel',
    execute(msg, args) {
        msg.reply('channel subscribed!');
        global.subscribedChannels.push(args[0].split(/#|>/)[1]);
        console.log(global.subscribedChannels);
    },
};
