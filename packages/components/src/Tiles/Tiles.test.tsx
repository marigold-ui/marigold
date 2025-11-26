import { render, screen } from '@testing-library/react';
import { Tiles } from './Tiles';

test('set tiles width via prop', () => {
  render(
    <Tiles tilesWidth="200px" data-testid="tiles">
      <div>tiles</div>
    </Tiles>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toMatchInlineSnapshot(`
    <div
      class="grid w-full gap-0 grid-cols-[repeat(auto-fit,var(--column))]"
      data-testid="tiles"
      style="--column: min(200px, 100%); --tilesWidth: 200px;"
    >
      <div>
        tiles
      </div>
    </div>
  `);
});

test('supports setting tiles width with design tokens', () => {
  render(
    <Tiles tilesWidth="large" data-testid="tiles">
      <div>tiles</div>
    </Tiles>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toMatchInlineSnapshot(`
    <div
      class="grid w-full gap-0 grid-cols-[repeat(auto-fit,var(--column))]"
      data-testid="tiles"
      style="--column: min(large, 100%); --tilesWidth: large;"
    >
      <div>
        tiles
      </div>
    </div>
  `);
});

test('supports space prop', () => {
  render(
    <Tiles tilesWidth="200px" space={7} data-testid="tiles">
      <div>tiles</div>
    </Tiles>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveClass(`gap-7`);
});

test('supports responsive grid via stretch prop', () => {
  render(
    <Tiles tilesWidth="300px" stretch data-testid="tiles">
      <div>tiles</div>
    </Tiles>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toMatchInlineSnapshot(`
    <div
      class="grid w-full gap-0 grid-cols-[repeat(auto-fit,var(--column))]"
      data-testid="tiles"
      style="--column: minmax(min(300px, 100%), 1fr); --tilesWidth: 300px;"
    >
      <div>
        tiles
      </div>
    </div>
  `);
});

test('supports gridAutoRows prop', () => {
  render(
    <Tiles tilesWidth="400px" equalHeight data-testid="tiles">
      <div>tiles</div>
      <div>tiles</div>
      <div>tiles</div>
      <div>tiles</div>
    </Tiles>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveClass(`auto-rows-[1fr]`);
});
