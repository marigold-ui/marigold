import type { DateValue } from 'react-aria-components/Calendar';
import { useLocale, useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';
import {
  type DatePreset,
  type DateRange,
  type DateRangePreset,
  builtInDatePresets,
  builtInDateRangePresets,
} from './presets';

export interface ResolvedPreset<T> {
  id: string;
  label: string;
  /**
   * Resolves the preset to a concrete value. Called at selection time so
   * relative presets ("today") stay correct in long-lived views.
   */
  resolve: () => T;
}

interface BuiltInPreset<T> {
  messageKey: string;
  resolve: (locale?: string) => T;
}

const useResolvedPresets = <
  Key extends string,
  Custom extends { id?: string; label: string; value: T | (() => T) },
  T,
>(
  presets: (Key | Custom)[],
  builtIns: Record<Key, BuiltInPreset<T>>
): ResolvedPreset<T>[] => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const { locale } = useLocale();

  return presets.map(preset => {
    if (typeof preset === 'string') {
      const builtIn = builtIns[preset];
      return {
        id: preset,
        label: stringFormatter.format(builtIn.messageKey),
        resolve: () => builtIn.resolve(locale),
      };
    }
    const { id, label, value } = preset;
    return {
      id: id ?? label,
      label,
      resolve: typeof value === 'function' ? (value as () => T) : () => value,
    };
  });
};

/**
 * Resolves single-date presets (built-in keys and custom presets) to
 * localized labels and value resolvers. Useful to build custom preset UIs
 * (e.g. a Select of quick filters) that stay in sync with Marigold's
 * built-in preset labels and date math.
 */
export const useDatePresets = (
  presets: DatePreset[]
): ResolvedPreset<DateValue>[] =>
  useResolvedPresets(presets, builtInDatePresets);

/**
 * Resolves date-range presets (built-in keys and custom presets) to
 * localized labels and value resolvers. Useful to build custom preset UIs
 * (e.g. a Select of quick filters) that stay in sync with Marigold's
 * built-in preset labels and date math.
 */
export const useDateRangePresets = (
  presets: DateRangePreset[]
): ResolvedPreset<DateRange>[] =>
  useResolvedPresets(presets, builtInDateRangePresets);
