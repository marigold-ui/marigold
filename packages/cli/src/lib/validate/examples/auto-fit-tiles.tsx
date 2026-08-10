import { Tiles } from '@marigold/components';

// Regression fixture for the auto-fit/auto-fill grid overflow false positive:
// Tiles renders `grid-cols-[repeat(auto-fit,var(--column))]`, an intentionally
// responsive grid that reflows to multiple rows in a narrow viewport. It must
// never be flagged as an overflow/wrapping defect.
const AutoFitTiles = () => (
  <Tiles tilesWidth="150px" stretch>
    {Array.from({ length: 8 }, (_, i) => (
      <div key={i} style={{ background: '#eee', padding: 8 }}>
        Tile {i + 1}
      </div>
    ))}
  </Tiles>
);

export default AutoFitTiles;
