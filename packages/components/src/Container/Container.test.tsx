import { screen } from '@testing-library/react';
import { Theme, cva } from '@marigold/system';
import { Headline } from '../Headline/Headline';
import { Text } from '../Text/Text';
import { setup } from '../test.utils';
import { Container } from './Container';

const theme: Theme = {
  name: 'test',
  colors: {
    emerald: 'rgb(5 150 105);',
  },
  components: {
    Headline: cva(''),
    Text: cva(''),
  },
};
const { render } = setup({ theme });

test('defines a content length for text and headlines', () => {
  render(
    <>
      <Container data-testid="container" />
    </>
  );

  const container = screen.getByTestId(/container/);
  expect(container.style.getPropertyValue('--maxTextWidth')).toBeDefined();
  expect(container.style.getPropertyValue('--maxHeadlineWidth')).toBeDefined();
});

test('limits with of <Text> and <Headline> children (via CSS var)', () => {
  render(
    <Container data-testid="container">
      <Headline>Yay</Headline>
      <Text>Coding makes fun</Text>
    </Container>
  );

  const container = screen.getByTestId(/container/);
  const headline = screen.getByText('Yay');
  const text = screen.getByText('Coding makes fun');

  expect(Array.from(container.style)).toContain('--maxHeadlineWidth');
  expect(Array.from(container.style)).toContain('--maxTextWidth');

  expect(headline).toHaveClass('max-w-(--maxHeadlineWidth)');
  expect(text).toHaveClass('max-w-(--maxTextWidth)');
});

test('supports different lengths for content', () => {
  render(
    <>
      <Container data-testid="container-default" />
      <Container data-testid="container-long" contentLength="long" />
    </>
  );

  const defaultContainer = screen.getByTestId(/container-default/);
  const longContainer = screen.getByTestId(/container-long/);

  expect(defaultContainer.style.getPropertyValue('--maxTextWidth')).not.toEqual(
    longContainer.style.getPropertyValue('--maxTextWidth')
  );
  expect(
    defaultContainer.style.getPropertyValue('--maxHeadlineWidth')
  ).not.toEqual(longContainer.style.getPropertyValue('--maxHeadlineWidth'));
});

test('aligns children on left by default', () => {
  render(
    <Container data-testid="container">
      <Text>some text</Text>
    </Container>
  );

  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`*:col-[1]`);
});

test('allows to align children to the center', () => {
  render(
    <Container data-testid="container" align="center">
      <Text>some text</Text>
    </Container>
  );

  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`*:col-[2]`);
});

test('allows to align children to the right', () => {
  render(
    <Container data-testid="container" align="right">
      <Text>some text</Text>
    </Container>
  );

  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`*:col-[3]`);
});

test('supports default align items none', () => {
  render(
    <Container data-testid="container">
      <Text>some text</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).not.toHaveClass(`place-items`);
});

test('supports align items center', () => {
  render(
    <Container alignItems="center" data-testid="container">
      <Text>some text</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`place-items-center`);
});

test('supports align items right', () => {
  render(
    <Container alignItems="right" data-testid="container">
      <Text>some text</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`place-items-end`);
});

test('accepts and uses spacing from theme', () => {
  render(
    <Container space={2} data-testid="container">
      <Text>one</Text>
      <Text>two</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveClass(`gap-2`);
});
