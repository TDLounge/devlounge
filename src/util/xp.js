export const getLevel = (xp) => Math.floor(xp / 100);

export const getXP = async (db, id) => {
    const { xp } = (await db.get(id)) || {};
    return isNaN(xp) ? 0 : xp;
};

export const parseXP = async (data) => (isNaN(data) ? 0 : data);
