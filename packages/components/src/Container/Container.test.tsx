import { screen } from '@testing-library/react';
import React from 'react';
import { Theme, cva } from '@marigold/system';
import { Headline } from '../Headline';
import { Text } from '../Text';
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

  expect(headline).toHaveClass('max-w-[--maxHeadlineWidth]');
  expect(text).toHaveClass('max-w-[--maxTextWidth]');
});

// test('supports default contentType content', () => {
//   render(
//     <Container data-testid="container">
//       <p>Coding makes fun</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);
//   expect(container).toMatchInlineSnapshot(`
// <div
//   class="grid grid-cols-[minmax(0,_var(--maxWidth))_1fr_1fr] [&>*]:col-[1] gap-0"
//   data-testid="container"
//   style="--maxWidth: 45ch;"
// >
//   <p>
//     Coding makes fun
//   </p>
// </div>
// `);
// });

// test('supports contentType header', () => {
//   render(
//     <Container data-testid="container">
//       <p>sdf</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);
//   expect(container).toMatchInlineSnapshot(`
// <div
//   class="grid grid-cols-[minmax(0,_var(--maxWidth))_1fr_1fr] [&>*]:col-[1] gap-0"
//   data-testid="container"
//   style="--maxWidth: 25ch;"
// >
//   <p>
//     sdf
//   </p>
// </div>
// `);
// });

// test('supports short text length', () => {
//   render(
//     <Container contentLength="short" data-testid="container">
//       <p>sdf</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);

//   expect(container).toMatchInlineSnapshot(`
// <div
//   class="grid grid-cols-[minmax(0,_var(--maxWidth))_1fr_1fr] [&>*]:col-[1] gap-0"
//   data-testid="container"
//   style="--maxWidth: 20ch;"
// >
//   <p>
//     sdf
//   </p>
// </div>
// `);
// });

// test('supports long text length', () => {
//   render(
//     <Container contentLength="long" data-testid="container">
//       <p>sdf</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);
//   expect(container).toMatchInlineSnapshot(`
// <div
//   class="grid grid-cols-[minmax(0,_var(--maxWidth))_1fr_1fr] [&>*]:col-[1] gap-0"
//   data-testid="container"
//   style="--maxWidth: 60ch;"
// >
//   <p>
//     sdf
//   </p>
// </div>
// `);
// });

// test('supports default align container left', () => {
//   render(
//     <Container data-testid="container">
//       <p>sdf</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);
//   expect(container).toHaveClass(`[&>*]:col-[1]`);
// });

// test('supports align container center', () => {
//   render(
//     <Container align="center" data-testid="container">
//       <p>sdf</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);
//   expect(container).toHaveClass(`[&>*]:col-[2]`);
// });

// test('supports align container right', () => {
//   render(
//     <Container align="right" data-testid="container">
//       <p>sdf</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);
//   expect(container).toHaveClass(`[&>*]:col-[3]`);
// });

// test('supports default align items none', () => {
//   render(
//     <Container data-testid="container">
//       <p>sdf</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);
//   expect(container).not.toHaveClass(`place-items`);
// });

// test('supports align items center', () => {
//   render(
//     <Container alignItems="center" data-testid="container">
//       <p>sdf</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);
//   expect(container).toHaveClass(`place-items-center`);
// });

// test('supports align items right', () => {
//   render(
//     <Container alignItems="right" data-testid="container">
//       <p>sdf</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);
//   expect(container).toHaveClass(`place-items-end`);
// });

// test('accepts and uses spacing from theme', () => {
//   render(
//     <Container space={2} data-testid="container">
//       <p>one</p>
//       <p>two</p>
//     </Container>
//   );
//   const container = screen.getByTestId(/container/);
//   expect(container).toHaveClass(`gap-2`);
// });
