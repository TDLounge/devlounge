export const number = (x) => (isNaN(x) ? 0 : x);
export const array = (x) => (Array.isArray(x) ? x : []);
