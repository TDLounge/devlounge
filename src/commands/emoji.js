export const meta = {
    id: 'emoji',
    commands: ['emoji', 'emojis'],
    description: 'Get the servers custom emoji',
};

export const run = async ({ message }) =>
    message.guild.emojis.cache.map((e) => `<:${e.name}:${e.id}>`).join(' ');
