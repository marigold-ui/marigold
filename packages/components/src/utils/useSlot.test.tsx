import { act, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { useSlot } from './useSlot';

const SlotChild = ({ slotRef }: { slotRef: React.RefCallback<Element> }) => (
  <div ref={slotRef} data-testid="slot-child">
    Slot content
  </div>
);

const TestHarness = ({
  showSlot = true,
  initialState,
}: {
  showSlot?: boolean;
  initialState?: boolean;
}) => {
  const [slotRef, hasSlot] = useSlot(initialState);

  return (
    <div>
      <span data-testid="has-slot">{String(hasSlot)}</span>
      {showSlot && <SlotChild slotRef={slotRef} />}
    </div>
  );
};

const ToggleHarness = ({ initialState }: { initialState?: boolean }) => {
  const [show, setShow] = useState(true);
  const [slotRef, hasSlot] = useSlot(initialState);

  return (
    <div>
      <span data-testid="has-slot">{String(hasSlot)}</span>
      <button data-testid="toggle" onClick={() => setShow(prev => !prev)}>
        Toggle
      </button>
      {show && <SlotChild slotRef={slotRef} />}
    </div>
  );
};

describe('useSlot', () => {
  test('detects slot child is present', () => {
    render(<TestHarness showSlot />);

    expect(screen.getByTestId('has-slot').textContent).toBe('true');
    expect(screen.getByTestId('slot-child')).toBeInTheDocument();
  });

  test('detects slot child is absent', () => {
    render(<TestHarness showSlot={false} initialState={false} />);

    expect(screen.getByTestId('has-slot').textContent).toBe('false');
    expect(screen.queryByTestId('slot-child')).not.toBeInTheDocument();
  });

  test('corrects initial state when slot is absent but expected', () => {
    render(<TestHarness showSlot={false} initialState={true} />);

    expect(screen.getByTestId('has-slot').textContent).toBe('false');
  });

  test('corrects initial state when slot is present but not expected', () => {
    render(<TestHarness showSlot={true} initialState={false} />);

    expect(screen.getByTestId('has-slot').textContent).toBe('true');
  });

  test('defaults initialState to true', () => {
    render(<TestHarness showSlot />);

    expect(screen.getByTestId('has-slot').textContent).toBe('true');
  });

  test('updates when slot child is removed', async () => {
    render(<ToggleHarness />);

    expect(screen.getByTestId('has-slot').textContent).toBe('true');

    await act(async () => {
      screen.getByTestId('toggle').click();
    });

    expect(screen.getByTestId('has-slot').textContent).toBe('false');
    expect(screen.queryByTestId('slot-child')).not.toBeInTheDocument();
  });

  test('updates when slot child is added back', async () => {
    render(<ToggleHarness />);

    await act(async () => {
      screen.getByTestId('toggle').click();
    });
    expect(screen.getByTestId('has-slot').textContent).toBe('false');

    await act(async () => {
      screen.getByTestId('toggle').click();
    });
    expect(screen.getByTestId('has-slot').textContent).toBe('true');
    expect(screen.getByTestId('slot-child')).toBeInTheDocument();
  });
});
