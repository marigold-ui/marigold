import { render } from '@testing-library/react';
import type { PanelContext as PanelContextShape } from './Context';
import { usePanelContext } from './Context';
import { Panel } from './Panel';
import { renderPanel } from './test-utils';

const Probe = ({
  onContext,
}: {
  onContext: (ctx: PanelContextShape) => void;
}) => {
  onContext(usePanelContext());
  return null;
};

describe('PanelContext', () => {
  test('usePanelContext throws when consumed outside <Panel>', () => {
    const renderOutside = () => render(<Probe onContext={() => undefined} />);

    expect(renderOutside).toThrow(/must be used within a <Panel>/);
  });

  test('provides classNames, titleId, headingLevel, hasTitle, titleSlotRef to descendants', () => {
    let received: PanelContextShape | null = null;

    renderPanel(
      <Panel headingLevel={3}>
        <Panel.Header>
          <Panel.Title>With title</Panel.Title>
        </Panel.Header>
        <Probe
          onContext={ctx => {
            received = ctx;
          }}
        />
      </Panel>
    );

    expect(received).not.toBeNull();
    expect(received!.headingLevel).toBe(3);
    expect(received!.hasTitle).toBe(true);
    expect(typeof received!.titleId).toBe('string');
    expect(received!.titleId.length).toBeGreaterThan(0);
    expect(typeof received!.titleSlotRef).toBe('function');
    expect(received!.classNames).toEqual(expect.any(Object));
  });

  test('reports hasTitle=false when no Panel.Title is rendered', () => {
    let received: PanelContextShape | null = null;

    renderPanel(
      <Panel aria-label="No title">
        <Probe
          onContext={ctx => {
            received = ctx;
          }}
        />
      </Panel>
    );

    expect(received).not.toBeNull();
    expect(received!.hasTitle).toBe(false);
  });
});
