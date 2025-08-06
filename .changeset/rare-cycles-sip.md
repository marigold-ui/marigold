---
"@marigold/docs": major
"@marigold/components": major
"@marigold/system": major
---

refa([DST-919]): Remove `<Image>` component

## Breaking Change

The `<Image>` component has been removed from Marigold.  
Please replace it with the native `<img>` element.

If you previously used the `fit` or `position` props, you can replicate the same behavior using the corresponding Tailwind CSS utility classes.

### Replacement table

| Prop type   | Prop value   | Tailwind class         |
|-------------|--------------|------------------------|
| **fit**     | `contain`    | `object-contain`       |
|             | `cover`      | `object-cover`         |
|             | `fill`       | `object-fill`          |
|             | `none`       | `unset`                |
|             | `scaleDown`  | `object-scale-down`    |
| **position**| `none`       | — (no class)           |
|             | `bottom`     | `object-bottom`        |
|             | `center`     | `object-center`        |
|             | `left`       | `object-left`          |
|             | `leftBottom` | `object-left-bottom`   |
|             | `leftTop`    | `object-left-top`      |
|             | `right`      | `object-right`         |
|             | `rightBottom`| `object-right-bottom`  |
|             | `rightTop`   | `object-right-top`     |
|             | `top`        | `object-top`           |
