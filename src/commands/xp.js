export const meta = {
    id: 'xp',
    commands: ['xp'],
    description: 'View your xp amount',
};

export const run = async ({ message, getDatabase }) => {
    const db = getDatabase('xp');

    const data = await db.get(message.author.id);
    const current = isNaN(data) ? 0 : data;

    return {
        description: `<@${message.author.id}> You have ${current} xp`,
    };
};
