import {
  LayoutInfo,
  ListLayout,
  Rect,
  Size,
} from 'react-aria-components/Virtualizer';
import type { Key } from '@react-types/shared';
import { ListBoxLayout } from './ListBoxLayout';

/**
 * `layoutNodes` is `protected`, and mounting a real `Virtualizer` cannot produce
 * a collapsed width on demand — `ScrollView` reports `Infinity` in every
 * browser-mode run (`NODE_ENV === 'test'`, no `VIRT_ON`), so the story tests can
 * only ever reach the skip branch. Seeding the layout directly is what lets both
 * branches be asserted.
 */
class TestLayout extends ListBoxLayout {
  seed(key: Key) {
    const layoutInfo = new LayoutInfo('item', key, new Rect(0, 0, 0, 32));
    layoutInfo.estimatedSize = true;
    this.layoutNodes.set(key, { layoutInfo, validRect: new Rect() });
    return layoutInfo;
  }

  peek(key: Key) {
    return this.layoutNodes.get(key)?.layoutInfo;
  }
}

const setup = (width: number) => {
  const layout = new TestLayout({ estimatedRowHeight: 32 });

  // Only `size.width` is read, so a full Virtualizer is not needed.
  layout.virtualizer = {
    size: new Size(width, 400),
  } as unknown as typeof layout.virtualizer;

  return { layout, layoutInfo: layout.seed('item-1') };
};

test.each([
  ['zero (first layout pass, before ScrollView learns its width)', 0],
  ['non-finite (browser-mode runs, where VIRT_ON is unset)', Infinity],
  ['negative', -1],
])('ignores a measurement taken while the width is %s', (_, width) => {
  const { layout, layoutInfo } = setup(width);
  const superUpdate = vi.spyOn(ListLayout.prototype, 'updateItemSize');

  // A row measured at `0px` wraps character by character since `wrap-anywhere`
  // removed the `min-width: auto` floor, so it reports a height like this one.
  const changed = layout.updateItemSize('item-1', new Size(0, 480));

  expect(changed).toBe(false);
  expect(superUpdate).not.toHaveBeenCalled();

  // The row keeps the height the layout gave it, not the collapsed measurement.
  expect(layout.peek('item-1')?.rect.height).toBe(32);

  // Left set, `useVirtualizerItem` would re-measure — and reflow — every render.
  expect(layoutInfo.estimatedSize).toBe(false);
});

test('measures normally once the list has a usable width', () => {
  const { layout, layoutInfo } = setup(305);
  const superUpdate = vi.spyOn(ListLayout.prototype, 'updateItemSize');

  const changed = layout.updateItemSize('item-1', new Size(305, 26));

  expect(superUpdate).toHaveBeenCalledWith('item-1', new Size(305, 26));
  expect(changed).toBe(true);
  expect(layout.peek('item-1')?.rect.height).toBe(26);
  expect(layoutInfo.estimatedSize).toBe(false);
});
