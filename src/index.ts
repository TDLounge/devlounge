import 'dotenv/config';
import { Client, Intents } from 'discord.js';
import { JellyCommands } from 'jellycommands';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const jelly = new JellyCommands(client, {
    prefix: '.',

    messages: {
        unknownCommand: {
            embeds: [{ description: 'Unknown Command', color: '#cf4a4a' }],
        },
    },
});

jelly.slashCommands.load('dist/src/slashCommands');

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log('Online');
    jelly.slashCommands.register();
});
