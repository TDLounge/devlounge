import { getLevel } from '../util/xp.js';

export const meta = {
    id: 'level',
    commands: ['xp', 'level'],
    description: 'View your (or someone elses) level and xp',
};

export const run = async ({ message, getDatabase }) => {
    const db = getDatabase('member');

    const user = message.mentions.users.first() || message.author;
    const { xp } = (await db.get(user.id)) || { xp: 0 };
    const level = getLevel(xp);

    return {
        description: `<@${user.id}> You are level ${level}, with ${xp} xp!`,
    };
};
