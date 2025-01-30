const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ matchVariant, e }) => {
  matchVariant(
    'group',
    (value, { modifier }) =>
      modifier
        ? `:merge(.group\\/${e(modifier)})[data-${value}] &`
        : `:merge(.group)[data-${value}] &`,
    {
      values: {
        focus: 'focus',
        hover: 'hover',
        error: 'error',
        readonly: 'read-only',
        required: 'required',
        selected: 'selected',
        checked: 'checked',
        indeterminate: 'indeterminate',
        disabled: 'disabled',
        placementL: 'placement="left"',
        placementR: 'placement="right"',
        placementT: 'placement="top"',
        placementB: 'placement="bottom"',
      },
    }
  );
  matchVariant(
    'placement',
    value => {
      return `&[data-placement=${value}]`;
    },
    {
      values: {
        t: 'top',
        r: 'right',
        b: 'bottom',
        l: 'left',
      },
    }
  );
});
