'use client';

import type { AppearanceComponentName } from '@/lib/utils';
import { getAppearance } from '@/lib/utils';

export interface AppearanceTableProps {
  component: AppearanceComponentName;
}

export const AppearanceTable = ({ component }: AppearanceTableProps) => {
  const appearances = getAppearance(component);

  return (
    <table aria-labelledby="appearance table" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code className="before:content-none after:content-none">
              variant
            </code>
          </td>
          <td>
            <code className="before:content-none after:content-none">
              {appearances.variant.length
                ? appearances.variant.join(' | ')
                : '-'}
            </code>
          </td>
          <td>The available variants of this component.</td>
        </tr>
        <tr>
          <td>
            <code className="before:content-none after:content-none">size</code>
          </td>
          <td>
            <code className="before:content-none after:content-none">
              {appearances.size.length ? appearances.size.join(' | ') : '-'}
            </code>
          </td>
          <td>The available sizes of this component.</td>
        </tr>
      </tbody>
    </table>
  );
};
