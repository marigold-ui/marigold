import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from 'react-aria-components';
import { describe, expect, it } from 'vitest';
import * as stories from './Collapsible.stories';

const { Basic, ShowMore } = composeStories(stories);
const user = userEvent.setup();

describe('Collapsible', () => {
  it('always renders children even when collapsed', () => {
    render(<Basic>Test Content</Basic>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('can render without breaking layout', async () => {
    render(<Basic unstyled>Test Content</Basic>);

    await user.click(screen.getByText('Click me'));

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Test Content').parentElement).toHaveClass(
      'expanded:contents expanded:[&_[role=group]]:contents'
    );
  });
});

describe('More', () => {
  it('renders a localized "more" text as trigger label', () => {
    render(
      <>
        <I18nProvider locale="en-US">
          <ShowMore />
        </I18nProvider>
        <I18nProvider locale="de-DE">
          <ShowMore />
        </I18nProvider>
      </>
    );
    expect(screen.getByText('Show more')).toBeInTheDocument();
    expect(screen.getByText('Mehr anzeigen')).toBeInTheDocument();
  });

  it('is unstyled by default', () => {
    render(<ShowMore>Test Content</ShowMore>);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Test Content').parentElement).toHaveClass(
      'expanded:contents expanded:[&_[role=group]]:contents'
    );
  });

  it('can render styled', () => {
    render(<ShowMore unstyled={false}>Test Content</ShowMore>);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Test Content').parentElement).not.toHaveClass(
      'expanded:contents expanded:[&_[role=group]]:contents'
    );
  });
});
