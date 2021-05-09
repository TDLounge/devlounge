import { getCoins } from '../util/coins.js';

export const meta = {
    id: 'balance',
    commands: ['bal', 'balance', 'coins'],
    description: 'View your balance',
};

export const run = async ({ message, getDatabase }) => {
    const db = getDatabase('member');

    const user = message.mentions.users.first() || message.author;
    const coins = await getCoins(db, user.id);

    return {
        description: `<@${user.id}> ${
            user.id == message.author.id ? 'you have' : 'has'
        } ${coins} coins!`,
    };
};
