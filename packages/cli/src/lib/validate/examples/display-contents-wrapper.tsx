// Regression fixture for the responsive "disappeared component" false
// positive: a `display: contents` element generates no box by design (a
// pass-through/slot wrapper), so it measures 0x0 like a genuinely collapsed
// element — but it must never be flagged as one.
const DisplayContentsWrapper = () => (
  <div data-component="Slot" style={{ display: 'contents' }}>
    <span>visible content</span>
  </div>
);

export default DisplayContentsWrapper;
