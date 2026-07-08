import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { Basic } from './Collapsible.stories';
import { CollapsibleProvider, useCollapsibleContext } from './Context';

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

describe('Context', () => {
  it('throws when useCollapsibleContext is used outside provider', () => {
    expect(() => renderHook(() => useCollapsibleContext())).toThrow(
      'useCollapsibleContext must be used within a CollapsibleProvider'
    );
  });

  it('returns context value when used within provider', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CollapsibleProvider value={{ variant: 'test', size: 'small' }}>
        {children}
      </CollapsibleProvider>
    );

    const { result } = renderHook(() => useCollapsibleContext(), { wrapper });

    expect(result.current).toEqual({ variant: 'test', size: 'small' });
  });
});

describe('Styling', () => {
  it('is styled by default', () => {
    render(<Basic.Component>Test Content</Basic.Component>);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Test Content').parentElement).not.toHaveClass(
      'expanded:contents expanded:[&_[role=group]]:contents'
    );
  });

  it('can render unstyled', () => {
    render(<Basic.Component unstyled>Test Content</Basic.Component>);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Test Content').parentElement).toHaveClass(
      'expanded:contents expanded:[&_[role=group]]:contents'
    );
  });
});
