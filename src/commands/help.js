export const meta = {
    id: 'help',
    commands: ['help', 'commands'],
    description: 'Get this menu',
};

export const run = async ({ client }) => ({
    title: 'Command Help Menu',
    description: client.commandHelp,
});
