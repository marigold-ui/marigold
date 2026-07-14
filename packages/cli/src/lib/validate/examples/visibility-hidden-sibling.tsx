// Regression fixture for the overlap false positive: a component toggled
// invisible via `visibility: hidden` (show/hide without unmounting — a common
// React pattern) still preserves its layout box, so it must be excluded from
// bounding-box extraction just like `display:none`/`[hidden]`, or it gets
// measured as overlapping the visible sibling occupying the same space.
const VisibilityHiddenSibling = () => (
  <div style={{ position: 'relative' }}>
    <div
      data-component="Visible"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      Visible content
    </div>
    <div
      data-component="Invisible"
      style={{ visibility: 'hidden', position: 'absolute', top: 0, left: 0 }}
    >
      Hidden content occupying the same space
    </div>
  </div>
);

export default VisibilityHiddenSibling;
