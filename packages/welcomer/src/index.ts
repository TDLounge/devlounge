import 'dotenv/config';
import { JellyCommands } from 'jellycommands';
import { Intents } from 'discord.js';
import { join } from 'desm';

const client = new JellyCommands({
    events: join(import.meta.url, './events'),

    clientOptions: {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],

        partials: ['GUILD_MEMBER'],
    },
});

// Auto reads the DISCORD_TOKEN environment variable
client.login();
