export const flattenObject = (obj: any, prefix = '') => {
  return Object.keys(obj).reduce((acc, key) => {
    let newKey = '';
    if (key !== 'DEFAULT') {
      newKey = prefix ? `${prefix}-${key}` : key;
    } else {
      newKey = prefix;
    }

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      // @ts-ignore
      acc[newKey] = obj[key];
    }

    return acc;
  }, {});
};
