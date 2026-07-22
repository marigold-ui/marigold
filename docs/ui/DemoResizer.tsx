'use client';

import {
  type KeyboardEvent,
  type PointerEvent,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface DemoResizerProps {
  /**
   * Initial width of the resizable area in pixels.
   * @default 480
   */
  defaultWidth?: number;
  /**
   * Smallest width the area can be resized to in pixels.
   * @default 200
   */
  minWidth?: number;
}

const KEYBOARD_STEP = 24;

/**
 * Lets the reader resize a demo's width to see container-based behavior
 * (e.g. `OverflowRegion`) react live. Drag the handle or focus it and use
 * the arrow keys.
 */
export const DemoResizer = ({
  children,
  defaultWidth = 480,
  minWidth = 200,
}: PropsWithChildren<DemoResizerProps>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(defaultWidth);
  const [maxWidth, setMaxWidth] = useState(Infinity);
  const dragStartRef = useRef<{ x: number; width: number } | null>(null);

  const clamp = (value: number) =>
    Math.round(Math.min(Math.max(value, minWidth), maxWidth));

  // The upper bound is the available space: full container width minus
  // the handle and the gap next to it.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const handle = container.lastElementChild as HTMLElement;
      const max = container.clientWidth - handle.offsetWidth - 8;
      setMaxWidth(max);
      setWidth(current => Math.min(current, max));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = { x: event.clientX, width };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    setWidth(
      clamp(dragStartRef.current.width + event.clientX - dragStartRef.current.x)
    );
  };

  const onPointerUp = () => {
    dragStartRef.current = null;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const direction =
      event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
    if (!direction) return;
    event.preventDefault();
    setWidth(current => clamp(current + direction * KEYBOARD_STEP));
  };

  return (
    <div ref={containerRef} className="flex w-full items-stretch gap-2">
      <div className="min-w-0" style={{ width }}>
        <div className="rounded-lg border border-dashed border-gray-300 p-3">
          {children}
        </div>
        <div className="mt-1 text-right font-mono text-xs text-gray-400 select-none">
          {width}px
        </div>
      </div>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize demo area"
        aria-valuenow={width}
        aria-valuemin={minWidth}
        aria-valuemax={Number.isFinite(maxWidth) ? maxWidth : undefined}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        className="w-1.5 shrink-0 cursor-col-resize touch-none rounded-full bg-gray-300 outline-offset-2 hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-blue-600"
      />
    </div>
  );
};
