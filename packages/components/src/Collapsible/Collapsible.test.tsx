import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from 'react-aria-components';
import { describe, expect, it } from 'vitest';
import { Basic, ShowMore } from './Collapsible.stories';

const user = userEvent.setup();

describe('Collapsible', () => {
  it('always renders children even when collapsed', () => {
    render(<Basic.Component>Test Content</Basic.Component>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('can render without breaking layout', async () => {
    render(<Basic.Component unstyled>Test Content</Basic.Component>);

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
          <ShowMore.Component />
        </I18nProvider>
        <I18nProvider locale="de-DE">
          <ShowMore.Component />
        </I18nProvider>
      </>
    );
    expect(screen.getByText('Show more')).toBeInTheDocument();
    expect(screen.getByText('Mehr anzeigen')).toBeInTheDocument();
  });

  it('renders a localized "less" text as trigger label', async () => {
    render(
      <>
        <I18nProvider locale="en-US">
          <ShowMore.Component />
        </I18nProvider>
        <I18nProvider locale="de-DE">
          <ShowMore.Component />
        </I18nProvider>
      </>
    );

    await user.click(screen.getByRole('button', { name: 'Show more' }));
    await user.click(screen.getByRole('button', { name: 'Mehr anzeigen' }));

    expect(screen.getByText('Show less')).toBeInTheDocument();
    expect(screen.getByText('Weniger anzeigen')).toBeInTheDocument();
  });

  it('renders a localized "more" text with a counter as trigger label', () => {
    render(
      <>
        <I18nProvider locale="en-US">
          <ShowMore.Component showCount>
            <p>1</p>
            <p>2</p>
          </ShowMore.Component>
        </I18nProvider>
        <I18nProvider locale="de-DE">
          <ShowMore.Component showCount>
            <p>1</p>
            <p>2</p>
          </ShowMore.Component>
        </I18nProvider>
      </>
    );
    expect(screen.getByText('Show 2 more')).toBeInTheDocument();
    expect(screen.getByText('2 weitere anzeigen')).toBeInTheDocument();
  });

  it('is unstyled by default', () => {
    render(<ShowMore.Component>Test Content</ShowMore.Component>);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Test Content').parentElement).toHaveClass(
      'expanded:contents expanded:[&_[role=group]]:contents'
    );
  });

  it('can render styled', () => {
    render(
      <ShowMore.Component unstyled={false}>Test Content</ShowMore.Component>
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Test Content').parentElement).not.toHaveClass(
      'expanded:contents expanded:[&_[role=group]]:contents'
    );
  });
});
