import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { AccordionProvider, useAccordionContext } from './AccordionContext';

describe('useAccordionContext', () => {
  it('throws when used outside of the Accordion component', () => {
    expect(() => renderHook(() => useAccordionContext())).toThrow(
      'You can only use "useAccordionContext" within the <Accordion> component.'
    );
  });

  it('returns the context when used inside the Accordion component', () => {
    const mockContextValue = {
      classNames: { container: 'container' } as any,
      stickyHeader: true,
      iconPosition: 'right' as const,
    };
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AccordionProvider value={mockContextValue}>{children}</AccordionProvider>
    );

    const { result } = renderHook(() => useAccordionContext(), { wrapper });
    expect(result.current).toBe(mockContextValue);
  });
});
