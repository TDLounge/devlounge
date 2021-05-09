import { getLevel } from '../util/xp.js';

export const meta = {
    id: 'level',
    commands: ['xp', 'level'],
    description: 'View your level and xp',
};

export const run = async ({ message, getDatabase }) => {
    const db = getDatabase('member');

    const { xp } = (await getXP(db, message.author.id)) || { xp: 0 };
    const level = getLevel(xp);

    return {
        description: `<@${message.author.id}> You are level ${level}, with ${xp} xp!`,
    };
};
