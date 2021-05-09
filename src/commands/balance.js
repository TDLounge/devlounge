export const meta = {
    id: 'balance',
    commands: ['bal', 'balance', 'coins'],
    description: 'View your (or someone elses) balance',
};

export const run = async ({ message, getDatabase }) => {
    const db = getDatabase('member');

    const user = message.mentions.users.first() || message.author;
    const { coins } = (await db.get(user.id)) || { coins: 0 };

    return {
        description: `<@${user.id}> ${
            user.id == message.author.id ? 'you have' : 'has'
        } ${coins} coins!`,
    };
};
