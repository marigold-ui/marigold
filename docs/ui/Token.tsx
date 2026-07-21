'use client';

import { useEffect, useState } from 'react';

export const Breakpoints = () => {
  const [breakpoints, setBreakpoints] = useState<Record<string, string>>({});

  useEffect(() => {
    const breakpointKeys = ['sm', 'md', 'lg', 'xl', '2xl'];
    const breakpointValues: Record<string, string> = {};

    breakpointKeys.forEach(key => {
      breakpointValues[key] = getComputedStyle(
        document.querySelector('[data-theme="rui"]')!
      ).getPropertyValue(`--breakpoint-${key}`);
    });

    queueMicrotask(() => setBreakpoints(breakpointValues));
  }, []);

  return (
    <div data-theme="rui">
      <table aria-label="breakpoints" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Breaks at</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(breakpoints).map(([key, value]) => (
            <tr key={key}>
              <td>
                <code className="before:content-none after:content-none">
                  {key}
                </code>
              </td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
