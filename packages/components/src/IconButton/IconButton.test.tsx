import { screen } from '@testing-library/react';
import { ChevronDown } from '@marigold/icons';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { IconButton } from './IconButton';

const theme: Theme = {
  name: 'test',
  components: {},
};

const { render } = setup({ theme });

test('has base styles', () => {
  render(
    <IconButton>
      <ChevronDown />
    </IconButton>
  );
  const button = screen.getByRole('button');
  expect(button).toHaveClass('shrink-0 cursor-pointer outline-0');
});

test('supports classname style', () => {
  render(
    <IconButton className="text-muted-foreground">
      <ChevronDown />
    </IconButton>
  );
  const button = screen.getByRole('button');
  expect(button).toHaveClass(
    'shrink-0 cursor-pointer outline-0 text-muted-foreground'
  );
});
