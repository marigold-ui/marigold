/**
 * @jest-environment jsdom
 */
import { cleanup, render, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import {
  OverlayContainerProvider,
  usePortalContainer,
} from './OverlayContainerProvider';

const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia([
  'screen and (min-width: 40em)',
  'screen and (min-width: 52em)',
  'screen and (min-width: 64em)',
]);

afterEach(cleanup);

jest.mock('@react-aria/ssr', () => ({
  useIsSSR: jest.fn(),
}));

describe('OverlayContainerProvider', () => {
  test('it should return null if SSR', () => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <>
        <div id="testid"></div>
        <OverlayContainerProvider value="testid">
          {children}
        </OverlayContainerProvider>
      </>
    );
    render(
      <Wrapper>
        <div />
      </Wrapper>
    );
    const { useIsSSR } = require('@react-aria/ssr');
    useIsSSR.mockReturnValue(true);

    const { result } = renderHook(() => usePortalContainer(), {
      wrapper: Wrapper,
    });

    expect(result.current).toBe(null);
  });

  test('render portal container by id', () => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <>
        <div id="testid"></div>
        <OverlayContainerProvider value="testid">
          {children}
        </OverlayContainerProvider>
      </>
    );
    render(
      <Wrapper>
        <div />
      </Wrapper>
    );
    const { useIsSSR } = require('@react-aria/ssr');
    useIsSSR.mockReturnValue(false);

    const { result } = renderHook(() => usePortalContainer(), {
      wrapper: Wrapper,
    });

    expect(result.current).toBe(document.getElementById('testid'));
  });

  test('it should fallback to document.body if no container is provided', () => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <OverlayContainerProvider value={undefined}>
        {children}
      </OverlayContainerProvider>
    );
    render(
      <Wrapper>
        <div />
      </Wrapper>
    );
    const { useIsSSR } = require('@react-aria/ssr');
    useIsSSR.mockReturnValue(false);

    const { result } = renderHook(() => usePortalContainer(), {
      wrapper: Wrapper,
    });

    expect(result.current).toBe(document.body);
  });

  test('render portal container by passing an html element', () => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <>
        <div id="testid"></div>
        <OverlayContainerProvider
          value={document.getElementById('testid') as HTMLElement}
        >
          {children}
        </OverlayContainerProvider>
      </>
    );
    render(
      <Wrapper>
        <div />
      </Wrapper>
    );
    const { useIsSSR } = require('@react-aria/ssr');
    useIsSSR.mockReturnValue(false);

    const { result } = renderHook(() => usePortalContainer(), {
      wrapper: Wrapper,
    });

    expect(result.current).toBe(document.getElementById('testid'));
  });
});
