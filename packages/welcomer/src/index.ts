import 'dotenv/config';
import { JellyCommands } from 'jellycommands';
import { Intents } from 'discord.js';

const client = new JellyCommands({
    commands: 'src/commands',

    clientOptions: {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
    },
});

// Auto reads the DISCORD_TOKEN environment variable
client.login();
