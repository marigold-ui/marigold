## Allow text selection

´´´jsx
<span
style={{userSelect: 'text', cursor: 'text'}}
onMouseDown={e => e.stopPropagation()}
onPointerDown={e => e.stopPropagation()}
onTouchStart={e => e.stopPropagation()}
tabIndex={-1}>
{children}
</span>
´´´

-> test how this behaves with keyboard navigation or hinders a11y stuff

## Focus

What to do about focus stuff?

## disabled

Test styling

## variants

- master and admin mark in row

## Not Doing

- Virtualization: As long as we keep at 50 lines and use pagination we should be fine
- Resizing: do we really currently need this?

## Width and resizing

- width of the selection (checkbox column) need to be hardcoded
- Column `defaultWidth`, `minWidth`, `maxWidth`, and `width` mirror React Aria behavior: values can be pixels (number), percentages ("50%"), or fractional units ("1fr"). `defaultWidth` sets initial width, `minWidth`/`maxWidth` bound resizing, and `width` locks to an exact value. Truncation works best when columns have explicit width/minWidth values.

## Breaking

- dynamic tables work slightly differently (dynamic Rows get have the whole column in their callback function, not only their id)
- emptyState is no on the body not longer on the table itself
- to have a sticky header add `sticky` to the `TableView.Header` not the root component anymore
