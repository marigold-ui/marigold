interface NestedStringObject {
  [key: string]: NestedStringObject | string;
}

// used to iterate through the colors and combine it in the right way e.g. 'bg-surface-sunken'
export const iterateTokens = (colors: NestedStringObject, prefix = '') => {
  let list: [token: string, color: string][] = [];

  for (const key in colors) {
    let value = colors[key];
    if (typeof value === 'object') {
      list.push(...iterateTokens(value, `${prefix}${key}-`));
    } else {
      list.push([`${prefix}${key}`, value]);
    }
  }
  return list;
};
