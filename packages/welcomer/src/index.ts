import 'dotenv/config';
import { JellyCommands } from 'jellycommands';
import { IntentsBitField, Partials } from 'discord.js';
import { join } from 'desm';

const client = new JellyCommands({
    events: join(import.meta.url, './events'),

    clientOptions: {
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
        ],

        partials: [Partials.GuildMember],
    },
});

// Auto reads the DISCORD_TOKEN environment variable
client.login();
