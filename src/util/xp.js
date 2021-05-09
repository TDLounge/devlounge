export const getLevel = (xp) => Math.floor(xp / 100);

export const parseXP = async (data) => (isNaN(data) ? 0 : data);
