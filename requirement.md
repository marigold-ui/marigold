# Current Situation

- in order to achieve a common surface / panel styling we created a `.surface` class (found in `themes/theme-rui/src/utils.css`)
- the style can be desctribed as (1) gradient border, where top border is lighter and bottom border is a bit darker (2) added tight small shadow
- current implementation needs two elements, the `.surface` and `.surface-input` class because we are using pseudo elements (::before) that do not work on elements like `<input>`
- because we need multiple elements, this makes some components more complex as they need to be

# Target / Goal

- only require one element with the `.surface` CSS class to achieve the same/similiar styling
- we want to make use of `background-clip` and `background-origin` combined with `padding-box` and `border-box` values to achieve the same style as before (gradient border) and a regular box shadow
- the inner part (padding-box) is white, whilte the border gradients uses `--color-stone-200` (top) and a darker stone color as bottom color
- for the shadow we can still use `--shadow-surface` token
- the surface's shadow can be overriden by `.elevation-raised` or `.elevation-overlay` classes (found in `themes/theme-rui/src/utils.css`)
- note that `.surface-error` and `surface-has-error` need to still work with the new surface
- note that `.state-disabled`, `state-readonly`, `state-focus` and `state-focucs-borderless` need to still work with the new surface

# Task

- refactor the surface class to use `background-clip` and `background-origin` to achieve a similiar styling than before
- find all components (`packages/components/src`) that use the `.surface` class and adjust them to work with with the refactored result
- important note about the `<Input>` component: this component supports a prefix/suffix placement of icons and actions. so the `<div>` around the `react-aria-components` `<input>` is the visible input (styles using `classNames.container`)
- do not add additional css tokens if not necessary. e.g. for the button gradient, darken the currently used border token via `oklch` (for example `oklch(from var(--primary) calc(l - 0.2) c h)`)
