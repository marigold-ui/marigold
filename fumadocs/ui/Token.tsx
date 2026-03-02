'use client';

import { Inline, Stack, alignment, cn, paddingSpace } from '@/ui';
import { Card } from 'fumadocs-ui/components/card';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { Rectangle } from './Rectangle';

export const AlignmentsX = () => {
  return (
    <Card title="Alignments X">
      <Stack space={3}>
        {Object.entries(alignment.horizontal.alignmentX).map(([key]) => (
          <div className="h-full bg-slate-200 p-2" key={key}>
            <Stack
              alignX={key as ComponentProps<typeof Stack>['alignX']}
              space={2}
            >
              <code className="before:content-none after:content-none">
                {key}
              </code>
              <Rectangle width="3.5rem" height="3.5rem" />
            </Stack>
          </div>
        ))}
      </Stack>
    </Card>
  );
};

export const AlignmentsY = () => {
  return (
    <Card title="Alignments Y">
      <Stack space={3}>
        {Object.entries(alignment.vertical.alignmentY).map(([key]) => (
          <div className="h-44 bg-slate-200 p-2" key={key}>
            <Stack
              stretch
              alignY={key as keyof typeof alignment.vertical.alignmentY}
              space={2}
            >
              <code className="before:content-none after:content-none">
                {key}
              </code>
              <Rectangle width="3.5rem" height="3.5rem" />
            </Stack>
          </div>
        ))}
      </Stack>
    </Card>
  );
};

export const BorderRadius = () => (
  <Card title="Border Radius">
    <Inline space={8}>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-sm 2px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-xs border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded 4px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-xs border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-md 6px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-md border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-lg 8px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-lg border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-xl 12px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-xl border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-2xl 16px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-2xl border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-full 9999px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-full border-2 border-dashed px-3 py-2"></div>
      </Stack>
    </Inline>
  </Card>
);

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

export const Spacing = () => {
  return (
    <table aria-label="spaces" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(paddingSpace)
          .sort((a, b) => parseFloat(a) - parseFloat(b))
          .map(key => (
            <tr key={key}>
              <td>
                <code className="before:content-none after:content-none">
                  {key}
                </code>
              </td>
              <td>{Number(key) * 4}px</td>
              <td>
                <div className={cn(`pl-${key}`, 'bg-slate-300')}>
                  <div className="h-3 bg-white"></div>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export const SpacingTokensTable = () => {
  return (
    <table aria-label="spacing tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
          <th>Description</th>
          <th>Relevant components</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code className="before:content-none after:content-none">
              container
            </code>
          </td>
          <td>50rem (800px)</td>
          <td>Used width or max-width for the form container.</td>
          <td>
            {'<div>'}, {'<Form>'}
          </td>
        </tr>
        <tr>
          <td>
            <code className="before:content-none after:content-none">
              section
            </code>
          </td>
          <td>3.5rem (56px)</td>
          <td>Used for creating space between different form sections.</td>
          <td>{'<Stack>'}</td>
        </tr>
        <tr>
          <td>
            <code className="before:content-none after:content-none">
              fieldY
            </code>
          </td>
          <td>2rem (32px)</td>
          <td>
            Used for creating vertical space between individual form fields in a
            section.
          </td>
          <td>{'<Stack>'}</td>
        </tr>
        <tr>
          <td>
            <code className="before:content-none after:content-none">
              fieldX
            </code>
          </td>
          <td>1.25rem (20px)</td>
          <td>
            Used for creating horizontal space between individual form fields in
            a section.
          </td>
          <td>{'<Inline>'}</td>
        </tr>
        <tr>
          <td>
            <code className="before:content-none after:content-none">
              group
            </code>
          </td>
          <td>1rem (16px)</td>
          <td>
            Used for grouping related fields (address components, date/time
            fields) or multiple accordion sections together.
          </td>
          <td>
            {'<Stack>'}, {'<Inset>'}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
