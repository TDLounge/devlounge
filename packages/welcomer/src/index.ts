import 'dotenv/config';
import { JellyCommands } from 'jellycommands';
import { Intents } from 'discord.js';

const client = new JellyCommands({
    events: 'src/events',

    clientOptions: {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],

        partials: ['GUILD_MEMBER'],
    },
});

// Auto reads the DISCORD_TOKEN environment variable
client.login();
