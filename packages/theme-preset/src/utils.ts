export const flattenObject = (obj: any, prefix: string = '') => {
  return Object.keys(obj).reduce((acc: {}, key: string) => {
    const newKey: string =
      key !== 'DEFAULT' ? (prefix ? `${prefix}-${key}` : key) : prefix;

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      // @ts-ignore
      acc[newKey] = obj[key];
    }

    return acc;
  }, {});
};
