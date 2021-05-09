import { getXP } from '../util/xp.js';

export const meta = {
    id: 'xp',
    commands: ['xp'],
    description: 'View your xp amount',
};

export const run = async ({ message, getDatabase }) => {
    const db = getDatabase('xp');

    const xp = await getXP(db, message.author.id);

    return {
        description: `<@${message.author.id}> You have ${xp} xp`,
    };
};
