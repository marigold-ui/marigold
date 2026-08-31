import { ListLayout } from 'react-aria-components/Virtualizer';
import type { Size } from 'react-aria-components/Virtualizer';
import type { Key } from '@react-types/shared';

export class ListBoxLayout extends ListLayout<unknown> {
  updateItemSize(key: Key, size: Size): boolean {
    const width = this.virtualizer?.size.width;

    if (width == null || !Number.isFinite(width) || width <= 0) {
      const layoutInfo = this.layoutNodes.get(key)?.layoutInfo;
      if (layoutInfo) {
        layoutInfo.estimatedSize = false;
      }

      // `false` means "nothing changed", so the virtualizer skips a relayout it does not need.
      return false;
    }

    return super.updateItemSize(key, size);
  }
}
