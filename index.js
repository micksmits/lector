const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const config = require('./config.json');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const hasPerm = (msg, perm) => {
    switch (perm) {
        case 'admin':
            return msg.member.roles.some(role => role.name === config.roleAdmin);
    }
}

client.on('message', msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).split(/ +/);
    const command = client.commands.get(args.shift().toLowerCase());

    if (!command) return;

    if (!hasPerm(msg, command.perms)) return;

    try {
		command.execute(msg, args);
	} catch (error) {
        console.error(command);
        if (command.name === 'eval') {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(error)}\n\`\`\``);
        }
	}
});

client.login(config.token);