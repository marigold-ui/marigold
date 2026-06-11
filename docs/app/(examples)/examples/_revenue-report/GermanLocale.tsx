'use client';

import type { PropsWithChildren } from 'react';
import { I18nProvider } from '@marigold/components';

/**
 * The Umsatzreport prototype mirrors a German product, so dates, numbers and
 * currencies format with the German locale (DateFormat, NumericFormat and the
 * DatePicker calendar read the locale from react-aria's I18nProvider).
 */
export const GermanLocale = ({ children }: PropsWithChildren) => (
  <I18nProvider locale="de-DE">{children}</I18nProvider>
);
