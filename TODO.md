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

## Not Doing: Virtualization

As long as we keep at 50 lines and use pagination we should be fine

## Breaking

- dynamic tables work slightly differently (dynamic Rows get have the whole column in their callback function, not only their id)
- emptyState is no on the body not longer on the table itself
