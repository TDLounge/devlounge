import 'dotenv/config';
import { JellyCommands } from 'jellycommands';
import { Intents } from 'discord.js';

const jelly = new JellyCommands({
    clientOptions: {
        intents: [Intents.FLAGS.GUILDS],
    },

    commands: ['dist/commands'],
    events: 'dist/events',

    messages: {
        unknownCommand: {
            embeds: [{ description: 'Unknown Command', color: '#cf4a4a' }],
        },
    },

    dev: {
        guilds: ['663140687591768074'],
    },

    debug: true,
});

jelly.login(process.env.TOKEN);
